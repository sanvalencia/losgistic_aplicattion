import { Entity, Column, PrimaryGeneratedColumn,  OneToOne, JoinColumn } from 'typeorm';
import { Delivery } from '../../deliveries/entities/delivery.entity';

@Entity()
export class Billing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  billing_date: Date;

  @Column()
  customer: string;

  @Column({nullable: true})
  details: string;

  @Column()
  price: number;

  @OneToOne(() => Delivery, delivery => delivery.billing)
  @JoinColumn({ name: 'deliveryId' }) 
  delivery: Delivery;
}