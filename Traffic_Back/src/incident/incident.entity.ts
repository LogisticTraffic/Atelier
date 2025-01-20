import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Incident {
  @PrimaryGeneratedColumn()
  id: number; // Clé primaire auto-générée.

  @Column()
  token:String;

  @Column()
  title:string;

  @Column()
  body:string;  //ajoute de date de signamement et location 

  @Column()
  seen:number;

}
