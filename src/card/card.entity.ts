import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import { ColumnEntity } from '../boards/board.entity';

@Entity()
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => ColumnEntity, (column) => column.cards)
  column: ColumnEntity;
}



