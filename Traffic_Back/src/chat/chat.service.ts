import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import { Chat } from './chat.entity';
import { IsEmpty } from 'class-validator';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
  ) {}

  // Create message
  async createMessage(sender: string, receiver: string, content: string): Promise<void> {
    const sen = await this.userRepository.findOne({ where: { username: sender } });
    const rec = await this.userRepository.findOne({ where: { username: receiver } });

    if (sen && rec && content!== '') {
      const chat = new Chat();
      chat.sender = sender;
      chat.receiver = receiver;
      chat.content = content;
      await this.chatRepository.save(chat);
    }
  }

  // Get messages between sender and receiver
  async getMessages(sender: string, receiver: string): Promise<Chat[]> {
    const sen = await this.userRepository.findOne({ where: { username: sender } });
    const rec = await this.userRepository.findOne({ where: { username: receiver } });

    if (sen && rec) {
      return this.chatRepository.find({
        where: [
          { sender, receiver }, // Messages envoyés par le sender au receiver
          { sender: receiver, receiver: sender }, // Messages envoyés par le receiver au sender
        ],
      });

    }
    return [];
  }
}
