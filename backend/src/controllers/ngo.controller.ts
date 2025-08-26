import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { NgoService } from '../services/ngo.service';
import { CreateNgoDto, UpdateNgoDto, NgoResponse } from '../models/ngo.model';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('NGOs')
@Controller('api/ngos')
export class NgoController {
  constructor(private readonly ngoService: NgoService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new NGO' })
  @ApiResponse({ 
    status: 201, 
    description: 'NGO created successfully',
    type: NgoResponse 
  })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async createNgo(@Body() createNgoDto: CreateNgoDto): Promise<NgoResponse> {
    return this.ngoService.createNgo(createNgoDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all NGOs' })
  @ApiResponse({ 
    status: 200, 
    description: 'NGOs retrieved successfully',
    type: [NgoResponse] 
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getAllNgos(): Promise<NgoResponse[]> {
    return this.ngoService.getAllNgos();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get NGO by ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'NGO retrieved successfully',
    type: NgoResponse 
  })
  @ApiResponse({ status: 404, description: 'NGO not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getNgoById(@Param('id') id: string): Promise<NgoResponse> {
    return this.ngoService.getNgoById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update NGO' })
  @ApiResponse({ 
    status: 200, 
    description: 'NGO updated successfully',
    type: NgoResponse 
  })
  @ApiResponse({ status: 404, description: 'NGO not found' })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateNgo(
    @Param('id') id: string,
    @Body() updateNgoDto: UpdateNgoDto,
  ): Promise<NgoResponse> {
    return this.ngoService.updateNgo(id, updateNgoDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete NGO' })
  @ApiResponse({ status: 204, description: 'NGO deleted successfully' })
  @ApiResponse({ status: 404, description: 'NGO not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async deleteNgo(@Param('id') id: string): Promise<void> {
    return this.ngoService.deleteNgo(id);
  }
}

