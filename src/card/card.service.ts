import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './card.entity';
import { Board } from 'src/boards/board.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardsRepository: Repository<Card>,
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  getAllCards(): Promise<Card[]> {
    return this.cardsRepository.find({ relations: ['board'] });
  }

  async getCardById(id: string): Promise<Card> {
    const card = await this.cardsRepository.findOne({ where: { id } });
    if (!card) {
      throw new NotFoundException(`Card with id ${id} not found`);
    }
    return card;
  }

  async createCard(cardData: Partial<Card>): Promise<Card> {
    const board = await this.boardRepository.findOne({where:{name:"ToDo"}});
    const newCard = new Card()
    newCard.board = board;
    newCard.description = cardData.description;
    newCard.title = cardData.title;

    return this.cardsRepository.save(newCard);
  }

  async updateCard(id: string, cardData: Partial<Card>): Promise<Card> {
    await this.cardsRepository.update(id, cardData);
    const updatedCard = await this.getCardById(id);
    return updatedCard;
  }

  async deleteCard(id: string): Promise<void> {
    const result = await this.cardsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
  }

  async moveCard(id: string, column: string): Promise<Card> {
    const card = await this.cardsRepository.findOne({ where: { id } });
    if (!card) {
      throw new NotFoundException(`Card with id ${id} not found`);
    }
  
    const board = await this.boardRepository.findOne({ where: { name: column } });
    if (!board) {
      throw new NotFoundException(`Column with name ${column} not found`);
    }

    card.column = column;
    card.board = board;

    const savedCard = await this.cardsRepository.save(card);
 
    return savedCard;
  }
  
}
