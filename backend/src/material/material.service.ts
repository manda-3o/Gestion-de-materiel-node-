import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Material } from './entities/material.entity'
import { CreateMaterialDto } from './dto/create-material.dto'
import { UpdateMaterialDto } from './dto/update-material.dto'

@Injectable()
export class MaterialService {
  constructor(
    @InjectRepository(Material)
    private materialsRepository: Repository<Material>,
  ) {}

  async create(createMaterialDto: CreateMaterialDto) {
    const material = this.materialsRepository.create(createMaterialDto)
    return await this.materialsRepository.save(material)
  }

  async findAll() {
    return await this.materialsRepository.find({
      order: { date: 'DESC' },
    })
  }

  async findOne(id: number) {
    return await this.materialsRepository.findOne({
      where: { id },
    })
  }

  async update(id: number, updateMaterialDto: UpdateMaterialDto) {
    await this.materialsRepository.update(id, updateMaterialDto)
    return await this.findOne(id)
  }

  async remove(id: number) {
    const result = await this.materialsRepository.delete(id)
    return result.affected > 0
  }

  async getStats() {
    const total = await this.materialsRepository.count()
    const bon = await this.materialsRepository.countBy({ etat: 'Bon' })
    const abime = await this.materialsRepository.countBy({ etat: 'Abîmé' })
    const mauvais = await this.materialsRepository.countBy({ etat: 'Mauvais' })

    return { total, bon, abime, mauvais }
  }
}
