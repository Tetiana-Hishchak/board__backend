import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsService } from './card.service';
import { CardsController } from './card.controller';
import { Card } from './card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Card])],  
  providers: [CardsService],
  controllers: [CardsController]
})
export class CardsModule {}