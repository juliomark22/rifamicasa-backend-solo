import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../users/domain/user.entity';

@Entity('boletos')
export class Boleto {
  @PrimaryGeneratedColumn()
  numero: number;

  @Column({ unique: true })
  codigo: string;

  @Column({ default: 'disponible' })
  estado: 'disponible' | 'vendido' | 'reservado';

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @ManyToOne(() => User, { nullable: true })
  comprador?: User;

  @ManyToOne(() => User, { nullable: true })
  afiliado?: User;

  @Column({ nullable: true })
  comisionAfiliado?: number;

  @CreateDateColumn()
  createdAt: Date;
}
