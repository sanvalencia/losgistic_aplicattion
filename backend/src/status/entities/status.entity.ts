import { Entity, Column, PrimaryGeneratedColumn,  OneToMany } from 'typeorm';
import { DeliveryDetail } from '../../delivery_details/entities/delivery_detail.entity';

@Entity()
export class Status {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status_name: string;

  @Column()
  alias: string;

  @Column()
  description: string;

  @OneToMany(() => DeliveryDetail, deliverydetail => deliverydetail.status)
  deliverydetail: DeliveryDetail[];
}