import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  code1C?: string;

  @IsOptional()
  @IsString()
  dealerCode?: string;

  @IsOptional()
  @IsString()
  vendorId?: string;

  @IsOptional()
  @IsString()
  fullTitle?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  unit?: string;

  @IsOptional()
  @IsNumber()
  tax?: number;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  stockCount: number;

  @IsOptional()
  @IsString()
  dealerId?: string;

  @IsNotEmpty()
  @IsNumber()
  updatedBy: number; // Це поле, напевно, повинно бути передано з контексту користувача, який створює товар
}
