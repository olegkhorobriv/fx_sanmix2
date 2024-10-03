import { IsNotEmpty, IsString, IsDate, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsDate()
  orderDate: Date;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  productNames: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
