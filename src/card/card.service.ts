import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './card.entity';
import { ColumnEntity } from '../boards/board.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardsRepository: Repository<Card>,
    @InjectRepository(ColumnEntity)
    private columnRepository: Repository<ColumnEntity>,
  ) {}

  getAllCards(): Promise<Card[]> {
    return this.cardsRepository.find({ relations: ['column'] });
  }

  async getCardById(id: string): Promise<Card> {
    const card = await this.cardsRepository.findOne({ where: { id } });
    if (!card) {
      throw new NotFoundException(`Card with id ${id} not found`);
    }
    return card;
  }


  async createCard(cardData): Promise<Card> {
    const column = await this.columnRepository.findOne({ where: { id: cardData.columnId }});
    if (!column) {
      throw new NotFoundException('Column not found');
    }

    const newCard = new Card()
    newCard.column = column;
    newCard.description = cardData.description;
    newCard.title = cardData.title;

    return this.cardsRepository.save(newCard);
  }

  async updateCard(cardId: string, title: string, description: string): Promise<Card> {
    const card = await this.cardsRepository.preload({ id: cardId, title, description });
    if (!card) {
      throw new NotFoundException('Card not found');
    }
    return this.cardsRepository.save(card);
  }

  async deleteCard(cardId: string): Promise<void> {
    const result = await this.cardsRepository.delete(cardId);
    if (result.affected === 0) {
      throw new NotFoundException('Card not found');
    }
  }
}

