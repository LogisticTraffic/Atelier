import { Entity, PrimaryGeneratedColumn ,Column} from "typeorm";

@Entity()
export  class Chat {
    @PrimaryGeneratedColumn()
    id:number
    @Column({nullable:false})
     sender:string
     @Column({nullable:false})  
     receiver:string  
     @Column({nullable:false})
     content:string
}