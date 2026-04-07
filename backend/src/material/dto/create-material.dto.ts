import { IsString, IsNumber, IsEnum, Min } from 'class-validator'

export class CreateMaterialDto {
  @IsString()
  numero: string

  @IsString()
  designation: string

  @IsEnum(['Bon', 'Abîmé', 'Mauvais'])
  etat: 'Bon' | 'Abîmé' | 'Mauvais'

  @IsNumber()
  @Min(1)
  quantite: number
}
