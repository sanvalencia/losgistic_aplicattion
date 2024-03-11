import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, OneToOne, JoinColumn, Timestamp } from 'typeorm';
import { Conveyor } from '../../conveyors/entities/conveyor.entity';
import { DeliveryDetail } from '../../delivery_details/entities/delivery_detail.entity';
import { Billing } from 'src/billing/entities/billing.entity';

@Entity()
export class Delivery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true , unique: true })
  id_guia: string;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  reception_date: Timestamp;

  @Column({ nullable: true })
  delivery_date: Date;

  @Column({ nullable: true })
  dispatch_date: Date;

  @ManyToOne(() => Conveyor, conveyor => conveyor.deliveries, {
    eager: true,
  })
  @JoinColumn({name:'conveyorId'})
  conveyor: Conveyor;


  @OneToMany(() => DeliveryDetail, deliveryDetail => deliveryDetail.delivery)
  deliveryDetail: DeliveryDetail[];




  @OneToOne(() => Billing, (billing) => billing.delivery, { 
    eager: true
   })
  @JoinColumn()
  billing: Billing;
}