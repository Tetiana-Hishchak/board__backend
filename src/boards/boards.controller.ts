import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from '../boards/board.entity';
import { Card } from 'src/card/card.entity';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}
  @Get()
  getAllBoards(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }
  @Post()
  async createBoard(@Body('name') name: string): Promise<Board> {
    return this.boardsService.createBoard(name);
  }

  @Get(':id')
  async getBoard(@Param('id') id: string): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Put(':id')
  async updateBoard(@Param('id') id: string, @Body('name') name: string): Promise<Board> {
    return this.boardsService.updateBoard(id, name);
  }

  @Delete(':id')
  async deleteBoard(@Param('id') id: string): Promise<void> {
    return this.boardsService.deleteBoard(id);
  }

  @Post(':id/cards')
  async addCard(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
  ): Promise<Card> {
    return this.boardsService.addCard(id, title, description);
  }

  @Patch(':id/cards/:cardId')
  async updateCard(
    @Param('id') id: string,
    @Param('cardId') cardId: string,
    @Body('title') title: string,
    @Body('description') description: string,
  ): Promise<Card> {
    return this.boardsService.updateCard(id, cardId, title, description);
  }

  @Delete(':id/cards/:cardId')
  async deleteCard(
    @Param('id') id: string,
    @Param('cardId') cardId: string,
  ): Promise<Board> {
    return this.boardsService.deleteCard(id, cardId);
  }

  @Put(':id/cards/:cardId/move')
  async moveCard(
    @Param('id') id: string,
    @Param('cardId') cardId: string,
    @Body('destinationColumnId') destinationColumnId: string,
  ): Promise<Card> {
    return this.boardsService.moveCard(id, cardId, destinationColumnId);
  }
}
