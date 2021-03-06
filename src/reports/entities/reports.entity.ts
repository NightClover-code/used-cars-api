import { User } from '../../users/entities';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  make: string;

  @Column({ default: false })
  approved: boolean;

  @Column()
  model: string;

  @ManyToOne(() => User, user => user.reports)
  user: User;

  @Column()
  year: number;

  @Column()
  lng: number;

  @Column()
  lat: number;

  @Column()
  mileage: number;
}
