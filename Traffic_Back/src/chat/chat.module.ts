import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { Chat } from './chat.entity';
import { User } from '../auth/user.entity'; // assuming you have a User entity
import { ChatController } from './chat.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, User])], // Import the entities needed for the repository
  providers: [ ChatService,ChatGateway], // Make sure ChatService is part of the providers
  controllers:[ChatController]
})
export class ChatModule {}
