import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity('materials')
export class Material {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  numero: string

  @Column()
  designation: string

  @Column({ type: 'varchar', length: 20 })
  etat: 'Bon' | 'Abîmé' | 'Mauvais'

  @Column()
  quantite: number

  @CreateDateColumn()
  date: Date
}
