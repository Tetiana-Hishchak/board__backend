// board.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Card } from '../card/card.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
 
  id: string;

  @Column({ type: 'enum', enum: ['ToDo', 'In Progress', 'Done'], default: 'ToDo' })
  name: string;

  
  @OneToMany(() => Card, card => card.board, { cascade: true })
  cards: Card[];
}