import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { CardsController } from '../card/card.controller';
import { CardsService } from '../card/card.service';
import { Board } from './board.entity';
import { Card } from '../card/card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board, Card])],
  controllers: [BoardsController, CardsController],
  providers: [BoardsService, CardsService],
})
export class BoardsModule {}
