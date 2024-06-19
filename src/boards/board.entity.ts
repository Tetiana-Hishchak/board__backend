import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Card } from '../card/card.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => ColumnEntity, (column) => column.board, { cascade: true, eager: true })
  columns: ColumnEntity[];

  @CreateDateColumn()
  createdAt: Date;

}

@Entity()
export class ColumnEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  column_order: number;

  @OneToMany(() => Card, (card) => card.column, { cascade: true })
  cards: Card[];

  @ManyToOne(() => Board, (board) => board.columns)
  board: Board;
}





