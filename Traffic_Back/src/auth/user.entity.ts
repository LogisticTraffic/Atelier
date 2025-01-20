import { Entity, PrimaryGeneratedColumn, Column ,ManyToOne, OneToMany, IsNull} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: ['driver', 'responsable', 'super admin'], default: 'driver' })
  role: string;

  @Column({ nullable: true }) 
  head:string;
}
