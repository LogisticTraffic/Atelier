import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { Response } from 'express';
@Injectable()
export class AuthService {
  

  constructor(
    @InjectRepository(User) //Cuser is a light weight of Cuser like a dto of it
    private userRepository: Repository<User>,
    //private cuserRespository: Repository<Cuser>,
    private jwtService: JwtService, 
  ) {}
  async getDriversByHead(head: string): Promise<User[]>{

    const user= await this.userRepository.find({where:{head}})

    
    return user;
    
  }
 

  async signUp(username: string, password: string,role:string): Promise<any> {
    const existingUser = await this.userRepository.findOne({ where: { username } });//different usernames 
    if (existingUser) {
      throw new Error('Username already exists');
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ username, password: hashedPassword,role });
    await this.userRepository.save(user); //i need to rake in consideration reponsible and driver relation
    return { message: 'User registered successfully' };
  }
  
 
  async signIn(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOneBy({ username });//we work with unique username "email"
    
    if (!user) {
      return { message: 'Invalid credentials' };
    }
      const payload = { username: user.username,role:user.role,head:user.head,sub: user.id };
     return this.jwtService.sign(payload);//create the token
      
  }


  async addResDriver(username: string, responsable: string): Promise<void> {
    // Step 1: Find the responsable by email or another criterion
    const res = await this.userRepository.findOne({ where: { username: responsable, role: 'responsable' } });
  
    if (!res) {
      throw new Error('Responsable introuvable.');
    }
  
    // Step 2: Find the driver by username
    const driver = await this.userRepository.findOne({ where: { username: username, role: 'driver' } });
  
    if (!driver) {
      throw new Error('Driver introuvable.');
    }
  
    // Step 3: Update the driver's head attribute with the responsable's head value
    driver.head = res.username;
  
    // Step 4: Save the updated driver to the database
    await this.userRepository.save(driver);
  
    // Optional: You may want to log this action for debugging purposes
    console.log(`Driver ${username} head updated to ${res.head}`);
  }
  
  
  
 

//add user bu super admin
  async create(user: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

 
  //Tous les membres par super admin par role 
  async findAll( role: string): Promise<User[]> {
    // Vérifier que l'utilisateur est un responsable

    const users= await this.userRepository.find({
      where: { role }
    });

    // Si l'utilisateur n'existe pas ou n'est pas un responsable
    if (!users) {
      throw new Error('Erreur de rechaerche');
    }

     
    // Retourner les drivers associés au responsable
    return users;
  }
  
 
 //find by id
  async findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }
  //update user
  async update(id: number, user: Partial<User>): Promise<User> {
    await this.userRepository.update(id, user);
    return this.findOne(id);
  }
//delete user
  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }


  
}
