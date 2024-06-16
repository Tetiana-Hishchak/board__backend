import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
  ) {}

  getAllBoards(): Promise<Board[]> {
    return this.boardsRepository.find({ relations: ['cards'] });
  }

  async getBoardById(id: string): Promise<Board> {
    const board = await this.boardsRepository.findOne({ where: { id }, relations: ['cards'] });
    if (!board) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }
    return board;
  }

  createBoard(boardData: Partial<Board>): Promise<Board> {
    const newBoard = this.boardsRepository.create(boardData);
    return this.boardsRepository.save(newBoard);
  }

  async updateBoard(id: string, boardData: Partial<Board>): Promise<Board> {
    await this.boardsRepository.update(id, boardData);
    const updatedBoard = await this.getBoardById(id);
    return updatedBoard;
  }

  async deleteBoard(id: string): Promise<void> {
    const result = await this.boardsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }
  }
}

