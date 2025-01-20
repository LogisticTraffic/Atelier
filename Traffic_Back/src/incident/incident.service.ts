import { Injectable } from '@nestjs/common';
import { Incident } from './incident.entity';
import { Repository } from 'typeorm'; // Assuming you're using TypeORM
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class IncidentService {
  constructor(
    @InjectRepository(Incident)
    private incidentRepository: Repository<Incident>
  ) {}

  // Méthode pour récupérer tous les incidents
  async getAll(): Promise<Incident[]> {
    return this.incidentRepository.find(); // Récupère tous les incidents dans la base
  }

  // Méthode pour envoyer une réclamation
  async reclamer(token: string, title: string, body: string): Promise<void> {
    // Crée un nouvel incident dans la base
    const incident = this.incidentRepository.create({
      token,
      title,
      body,
      seen: 0, // Définit par défaut `seen` à false
    });
    await this.incidentRepository.save(incident); // Sauvegarde l'incident

  }

  // Méthode pour mettre à jour un incident (notifié comme vu)
async update(id: number, seen: number): Promise<boolean> {
    const result = await this.incidentRepository.update(id, { seen: seen ? 1 : 0 }); // Convertir true/false en 1/0
    return result.affected > 0; // Vérifie si une ligne a été mise à jour
  
  }
}
