import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Delivery } from '../../deliveries/entities/delivery.entity';

@Entity()
export class Conveyor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bussines_name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @OneToMany(() => Delivery, (delivery) => delivery.conveyor)
  deliveries: Delivery[];
}