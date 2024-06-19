import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsController } from './card.controller';
import { CardsService } from './card.service';
import { Card } from './card.entity';
import { ColumnEntity } from '../card/columnEntity';

@Module({
  imports: [TypeOrmModule.forFeature([Card])],
  controllers: [CardsController],
  providers: [CardsService],
})

export class CardsModule {}