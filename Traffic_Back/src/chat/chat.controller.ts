import {Param, Body, Controller, Get, Post } from '@nestjs/common';
import {ChatService}from "./chat.service"
import { Chat } from './chat.entity';

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Get('/all/:sender/:receiver')
  async getMessages(
    @Param('sender') sender: string,
    @Param('receiver') receiver: string
  ): Promise<Chat[]> {
    return this.chatService.getMessages(sender, receiver);
  }
    @Post("/create")
    async createMessage(@Body() body:{sender:string,receiver:string,content:string}):Promise<void>
    {
        return this.chatService.createMessage(body.sender,body.receiver,body.content);
    }
}
