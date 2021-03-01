import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Place from './Place';

@Entity('images') // Com isso o typeorm vai entender q a classe abaixo está associada com a tabela citada aqui
export default class Image {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column() // Column indicando que cada um destes representa uma coluna no BD
  path: string;

  @ManyToOne(() => Place, place => place.images)
  @JoinColumn({ name: 'place_id' })
  place: Place;
}