import { Controller, Get, Post, Body } from '@nestjs/common';
import { IncidentService } from './incident.service';
import { Incident } from './incident.entity';

@Controller('notif')
export class IncidentController {
  constructor(private readonly incidentService: IncidentService) {}

  @Get('all')
  async getAll(): Promise<Incident[]> {
    return this.incidentService.getAll();
  }

  @Post('see')
  async updateSeen(@Body() body: { id: number; seen: number }): Promise<boolean> {
    return this.incidentService.update(body.id, body.seen); // Correction du service appelé
  }

  @Post('reclamation')
  async reclamer(
    @Body() body: { token: string; title: string; body: string },
  ): Promise<void> {
    return this.incidentService.reclamer(body.token, body.title, body.body); // Correction de `aysnc` en `async`
  }
  

}
