import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { CreateNgoDto, UpdateNgoDto, NgoResponse, NgoRecord } from '../models/ngo.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class NgoService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async createNgo(createNgoDto: CreateNgoDto): Promise<NgoResponse> {
    try {
      const ngoRecord: NgoRecord = {
        id: uuidv4(),
        name: createNgoDto.name,
        description: createNgoDto.description,
        website: createNgoDto.website,
        logo: createNgoDto.logo,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await this.firebaseService.saveNgo(ngoRecord);

      return {
        id: ngoRecord.id,
        name: ngoRecord.name,
        description: ngoRecord.description,
        website: ngoRecord.website,
        logo: ngoRecord.logo,
        createdAt: ngoRecord.createdAt,
        updatedAt: ngoRecord.updatedAt,
      };
    } catch (error) {
      throw new BadRequestException('Failed to create NGO');
    }
  }

  async getAllNgos(): Promise<NgoResponse[]> {
    try {
      const ngos = await this.firebaseService.getAllNgos();
      return ngos.map(ngo => ({
        id: ngo.id,
        name: ngo.name,
        description: ngo.description,
        website: ngo.website,
        logo: ngo.logo,
        createdAt: ngo.createdAt,
        updatedAt: ngo.updatedAt,
      }));
    } catch (error) {
      throw new BadRequestException('Failed to fetch NGOs');
    }
  }

  async getNgoById(ngoId: string): Promise<NgoResponse> {
    try {
      const ngo = await this.firebaseService.getNgo(ngoId);
      if (!ngo) {
        throw new NotFoundException('NGO not found');
      }

      return {
        id: ngo.id,
        name: ngo.name,
        description: ngo.description,
        website: ngo.website,
        logo: ngo.logo,
        createdAt: ngo.createdAt,
        updatedAt: ngo.updatedAt,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to fetch NGO');
    }
  }

  async updateNgo(ngoId: string, updateNgoDto: UpdateNgoDto): Promise<NgoResponse> {
    try {
      const existingNgo = await this.firebaseService.getNgo(ngoId);
      if (!existingNgo) {
        throw new NotFoundException('NGO not found');
      }

      const updatedNgo: NgoRecord = {
        ...existingNgo,
        ...updateNgoDto,
        updatedAt: new Date(),
      };

      await this.firebaseService.updateNgo(updatedNgo);

      return {
        id: updatedNgo.id,
        name: updatedNgo.name,
        description: updatedNgo.description,
        website: updatedNgo.website,
        logo: updatedNgo.logo,
        createdAt: updatedNgo.createdAt,
        updatedAt: updatedNgo.updatedAt,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to update NGO');
    }
  }

  async deleteNgo(ngoId: string): Promise<void> {
    try {
      const existingNgo = await this.firebaseService.getNgo(ngoId);
      if (!existingNgo) {
        throw new NotFoundException('NGO not found');
      }

      await this.firebaseService.deleteNgo(ngoId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to delete NGO');
    }
  }
}

