import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from './boards/boards.module';
import { Board, ColumnEntity } from './boards/board.entity';
import { Card } from './card/card.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CardsModule } from './card/card.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        entities: [Board, Card, ColumnEntity],
        synchronize: false, 
        logging: true,
        migrations: ['./migrations/CreateTables.ts'],
        cli: {
          migrationsDir: 'src/migrations',
        },
      }),
    }),
    BoardsModule,
  ],
})
export class AppModule {}
