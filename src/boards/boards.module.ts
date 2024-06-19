import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { Board, ColumnEntity } from '../boards/board.entity';
import { Card } from '../card/card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board, ColumnEntity, Card])],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
