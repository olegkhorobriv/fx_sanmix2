// Створимо DTO (Data Transfer Object) для створення клієнта
export class CreateClientDto {
   firstName: string;
   lastName: string;
   phoneNumber: string;
   email?: string;
 }
 