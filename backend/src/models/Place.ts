import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import Image from './Image';

@Entity('places') // Com isso o typeorm vai entender q a classe abaixo está associada com a tabela citada aqui
export default class Place {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column() // Column indicando que cada um destes representa uma coluna no BD
  name: number;
  @Column()
  latitude: number;
  @Column()
  longitude: number;
  @Column()
  about: string;
  @Column()
  veg_type: string;
  @Column()
  opening_hours: string;
  @Column()
  open_on_weekends: boolean;

  @OneToMany(() => Image, image => image.place, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'place_id' })
  images: Image[];
}