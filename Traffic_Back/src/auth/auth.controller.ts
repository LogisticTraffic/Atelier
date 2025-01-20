import { Controller,  Res,Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() body: { username: string; password: string ;role:string}) {
    return this.authService.signUp(body.username, body.password,body.role);
  }

  @Post('signin')
  signIn(@Body() body: { username: string; password: string },
) {
    return this.authService.signIn(body.username, body.password);
  }

  @Post()
  async create(@Body() user: Partial<User>): Promise<User> {
    return this.authService.create(user);
  }

  @Get('all/:role')
  async findAll(@Param('role')role:string): Promise<User[]> {
    return this.authService.findAll(role);
  }

  @Post('addRD')
async addDriverRes(@Body() body: { username: string; responsable: string }): Promise<void> {
  const { username, responsable } = body;
  return this.authService.addResDriver(username, responsable);
}

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return this.authService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() user: Partial<User>): Promise<User> {
    return this.authService.update(id, user);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.authService.delete(id);
  }

  @Post('get-drivers')
  async getDriversByHead(@Body('head') head: string): Promise<User[]> {
    try {
      console.log('Received head in request body:', head); // Debugging log
      return await this.authService.getDriversByHead(head);
    } catch (error) {
      console.error('Error in controller:', error);
      throw new Error('Failed to fetch drivers');
    }
  }  
}
