import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Item } from '@prisma/client';

@Injectable()
export class ItemsService {
  constructor( private prisma: PrismaService) {}

async create(createItemDto: CreateItemDto) {
  const itemCreated = await this.prisma.item.create({
    data: createItemDto // Pasa el DTO dentro de la propiedad 'data'
  });
  return itemCreated;
}


  async findAll() {
    return this.prisma.item.findMany();
  }

  async findOne(id: number) {
    return this.prisma.item.findUnique({
      where: { id }
    });
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    return this.prisma.item.update({
      where: { id },
      data: updateItemDto
    });
  }

  async remove(id: number) {
    return this.prisma.item.delete({
      where: { id }
    });
  }
}
