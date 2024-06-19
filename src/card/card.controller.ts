import { Controller, Post, Patch, Delete, Param, Body, Get } from '@nestjs/common';
import { CardsService } from './card.service';
import { Card } from './card.entity';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get()
  getAllCards(): Promise<Card[]> {
    return this.cardsService.getAllCards();
  }
 
  @Get (':id')
  getCardById(@Param('id') id: string): Promise<Card> {   
    return this.cardsService.getCardById(id);
  }
  
  @Post()
  createCard(@Body() cardData: Partial<Card>): Promise<Card> { 
    return this.cardsService.createCard(cardData);
  }

  @Patch(':id')
  async updateCard(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
  ): Promise<Card> {
    return this.cardsService.updateCard(id, title, description);
  }

  @Delete(':id')
  async deleteCard(@Param('id') id: string): Promise<void> {
    return this.cardsService.deleteCard(id);
  }
}
