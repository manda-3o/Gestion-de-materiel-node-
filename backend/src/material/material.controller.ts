import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { MaterialService } from './material.service'
import { CreateMaterialDto } from './dto/create-material.dto'
import { UpdateMaterialDto } from './dto/update-material.dto'

@Controller('api/materials')
@UseGuards(JwtAuthGuard)
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Post()
  async create(@Body() createMaterialDto: CreateMaterialDto) {
    return await this.materialService.create(createMaterialDto)
  }

  @Get()
  async findAll() {
    return await this.materialService.findAll()
  }

  @Get('stats')
  async getStats() {
    return await this.materialService.getStats()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.materialService.findOne(+id)
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMaterialDto: UpdateMaterialDto,
  ) {
    return await this.materialService.update(+id, updateMaterialDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.materialService.remove(+id)
  }
}
