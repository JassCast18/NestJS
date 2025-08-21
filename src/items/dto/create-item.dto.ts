// src/items/dto/create-item.dto.ts
import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber() @IsNotEmpty()
  price: number;
  
  @IsString()
  @IsNotEmpty()
  description?: string;
}