import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Timestamp,
} from 'typeorm';
import { Delivery } from '../../deliveries/entities/delivery.entity';
import { Status } from '../../status/entities/status.entity';

@Entity()
export class DeliveryDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  remission: string;

  @Column({ nullable: true })
  detail: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Timestamp;

  // @ManyToOne(() => Delivery, delivery => delivery.deliverydetail)
  // @JoinColumn({name:'deliveryId'})
  // delivery: Delivery;
  @ManyToOne(() => Delivery, (delivery) => delivery.deliveryDetail)
  delivery: Delivery;

  @ManyToOne(() => Status, (status) => status.deliverydetail, {
    eager: true,
  })
  @JoinColumn({ name: 'statusId' })
  status: Status;
}
