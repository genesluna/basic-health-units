import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { City } from '../city/city.entity';

@Entity({ name: 'bhus' })
export class Bhu {
  @PrimaryColumn({ type: 'bigint' })
  id: number;

  @Column({ nullable: false, length: '100' })
  name: string;

  @Column({ nullable: false, length: '100' })
  address: string;

  @Column({ nullable: false, length: '50' })
  district: string;

  @Column({ type: 'numeric', nullable: false })
  latitude: number;

  @Column({ type: 'numeric', nullable: false })
  longitude: number;

  @ManyToOne(() => City, (city) => city.bhus)
  city: City;
}
