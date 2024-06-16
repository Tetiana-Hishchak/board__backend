import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Board } from '../boards/board.entity';

@Entity()
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'enum', enum: ['ToDo', 'In Progress', 'Done'], default: 'ToDo' })
  column: string;

  @ManyToOne(() => Board, board => board.cards, { nullable: false, eager: true })
  board: Board; 
}  

