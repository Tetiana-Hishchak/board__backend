import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board, ColumnEntity } from '../boards/board.entity';
import { Card } from '../card/card.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
    @InjectRepository(ColumnEntity)
    private columnRepository: Repository<ColumnEntity>,
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
  ) {}
 
  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find({
      relations: ['columns', 'columns.cards'], 
        order: { 
          createdAt: 'ASC',
          columns: { column_order: 'ASC'}
        }      
     });
  }

  async createBoard(name: string): Promise<Board> {
    const todoColumn = this.columnRepository.create({ name: 'ToDo', cards: [], column_order: 1 });
    const inProgressColumn = this.columnRepository.create({ name: 'In Progress', cards: [], column_order: 2 });
    const doneColumn = this.columnRepository.create({ name: 'Done', cards: [], column_order: 3 });
    
    const board = this.boardRepository.create({
      name,
      columns: [todoColumn, inProgressColumn, doneColumn],
    });
    
    return this.boardRepository.save(board);
  }

  async getBoardById(id: string): Promise<Board> {
    const board = await this.boardRepository.findOne({ where: { id }, relations: ['columns', 'columns.cards'] });
    if (!board) {
      throw new NotFoundException('Board not found');
    }
    return board;
  }

  async updateBoard(id: string, name: string): Promise<Board> {
    const board = await this.boardRepository.findOne({ 
      where: { id },
      relations: ['columns', 'columns.cards']
    });
  
    if (!board) {
      throw new NotFoundException('Board not found');
    }
  
    board.name = name;
  
    await this.boardRepository.save(board);
 
    return this.boardRepository.findOne({ 
      where: { id },
      relations: ['columns', 'columns.cards'],
      order: { 
        columns: { column_order: 'ASC'}
      }      
    });
  }

  async deleteBoard(id: string): Promise<void> {
    const result = await this.boardRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Board not found');
    }
  }

  async addCard(boardId: string, title: string, description: string): Promise<Card> {
    const board = await this.getBoardById(boardId);
    const column = board.columns.find(col => col.name === 'ToDo');
    if (!column) {
      throw new NotFoundException('Column not found');
    }
    const card = this.cardRepository.create({ title, description, column });
    column.cards.push(card);
    const  saveCard = await this.cardRepository.save(card);
    await this.boardRepository.save(board);

    return saveCard;
  }

  async updateCard(boardId: string, cardId: string, title: string, description: string): Promise<Card> {
    const card = await this.cardRepository.preload({ id: cardId, title, description });
    if (!card) {
      throw new NotFoundException('Card not found');
    }

    const updateCard = await this.cardRepository.save(card);
    this.getBoardById(boardId);

    return updateCard;
  }

  async deleteCard(boardId: string, cardId: string): Promise<Board> {
    const result = await this.cardRepository.delete(cardId);
    if (result.affected === 0) {
      throw new NotFoundException('Card not found');
    }
    return this.getBoardById(boardId);
  }

  async moveCard(boardId: string, cardId: string, destinationColumnId: string): Promise<Card> {
    const card = await this.cardRepository.findOne({ where: { id: cardId }, relations: ['column', 'column.board'] });
    if (!card) {
      throw new NotFoundException('Card not found');
    }

    const destinationColumn = await this.columnRepository.findOne({ where: { id: destinationColumnId } });
    if (!destinationColumn) {
        throw new NotFoundException('Destination column not found');
    }

    card.column = destinationColumn;
    const moveCard = await this.cardRepository.save(card);

    return moveCard;
  }
}

