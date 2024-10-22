import { IsString, IsNotEmpty } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  text: string;
}
