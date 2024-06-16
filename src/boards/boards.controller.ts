import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CardsService } from '../card/card.service'; // Зверніть увагу на правильний шлях імпорту
import { Board } from './board.entity';
import { Card } from '../card/card.entity';

@Controller('boards')
export class BoardsController {
  
  constructor(
    private readonly boardsService: BoardsService,
    private readonly cardsService: CardsService, // Додайте CardsService
  ) {}

  @Get()
  getAllBoards(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  } 
  
  @Get(':id')
  getBoardById(@Param('id') id: string): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Post()
  createBoard(@Body() boardData: Partial<Board>): Promise<Board> {
    return this.boardsService.createBoard(boardData);
  }

  @Put(':id')
  updateBoard(@Param('id') id: string, @Body() boardData: Partial<Board>): Promise<Board> {
    return this.boardsService.updateBoard(id, boardData);
  }
  @Delete(':id')
  deleteBoard(@Param('id') id: string): Promise<void> {  
  
    return this.boardsService.deleteBoard(id);
  }

  @Post(':boardId/cards')
  createCard(   @Param('boardId') boardId: string, 
  @Body() cardData: Partial<Card>,): Promise<Card> {
    return this.cardsService.createCard(
    { ...cardData, board: { id: boardId } as Board });
  }

  @Put(':boardId/cards/:id')
  updateCard(
    @Param('id') id: string,
    @Body() cardData: Partial<Card>,
  ): Promise<Card> {
    return this.cardsService.updateCard(id, cardData);
  }

  @Delete(':boardId/cards/:id')
  deleteCard(@Param('id') id: string): Promise<void> {
    return this.cardsService.deleteCard(id);
  }
}

