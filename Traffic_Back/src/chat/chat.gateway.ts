import { WebSocketGateway, SubscribeMessage, MessageBody, WsResponse } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Chat } from './chat.entity';
import { Socket } from 'socket.io';

@WebSocketGateway(3001, { transports: ['websocket'] })
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}
  // Handles incoming messages
  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() message: { sender: string; receiver: string; content: string },
    client: Socket
  ): Promise<WsResponse<Chat>> {
    const { sender, receiver, content } = message;

    // Call the service to create a message
    await this.chatService.createMessage(sender, receiver, content);

    // Emit the message to the receiver
    client.to(receiver).emit('receiveMessage', { sender, content });

    // Fetch the latest chat message from the database after creation
    const createdMessage = await this.chatService.getMessages(sender, receiver);

    // Return the last created chat message (assuming the last one is the newly created message)
    const lastMessage = createdMessage[createdMessage.length - 1];

    return { event: 'messageCreated', data: lastMessage };
  }

  // Handles user connections and join events
  handleConnection(client: Socket): void {
    console.log(`Client connected: ${client.id}`);
  }

  // Handles disconnections
  handleDisconnect(client: Socket): void {
    console.log(`Client disconnected: ${client.id}`);
  }

  // Emits all chat messages between sender and receiver
  @SubscribeMessage('getMessages')
  async handleGetMessages(
    @MessageBody() { sender, receiver }: { sender: string; receiver: string },
    client: Socket
  ): Promise<WsResponse<Chat[]>> {
    const messages = await this.chatService.getMessages(sender, receiver);
    return { event: 'messagesFetched', data: messages };
  }
}
