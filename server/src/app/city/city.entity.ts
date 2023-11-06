import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Bhu } from '../bhu/bhu.entity';

@Entity({ name: 'cities' })
export class City {
  @PrimaryColumn({ type: 'bigint' })
  id: number;

  @Column({ name: 'federative_unit', nullable: false, length: '2' })
  federativeUnit: string;

  @Column({ nullable: false, length: '50' })
  name: string;

  @Column({ nullable: false, length: '50' })
  mesoregion: string;

  @OneToMany(() => Bhu, (bhu) => bhu.city)
  bhus: Bhu[];
}
