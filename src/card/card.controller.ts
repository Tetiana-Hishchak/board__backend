import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CardsService } from './card.service';
import { Card } from './card.entity';

@Controller('cards')

export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get()
  getAllCards(): Promise<Card[]> {
    return this.cardsService.getAllCards();
  }

 
  @Get(':id')
  getCardById(@Param('id') id: string): Promise<Card> {   
    return this.cardsService.getCardById(id);
  }
  @Post()
  createCard(@Body() cardData: Partial<Card>): Promise<Card> { 
    return this.cardsService.createCard(cardData);
  }

  @Put(':id')
  updateCard(@Param('id') id: string, @Body() cardData: Partial<Card>): Promise<Card> {
    return this.cardsService.updateCard(id, cardData);
  }

  @Put(':id/column')
  async moveCard(@Param('id') id: string, @Body('column') column: string): Promise<Card> {
    return this.cardsService.moveCard(id, column);
  }
  
  @Delete(':id')
  deleteCard(@Param('id') id: string): Promise<void> {
    return this.cardsService.deleteCard(id);
  }
}