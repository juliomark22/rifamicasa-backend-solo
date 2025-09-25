import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("afiliados")
export class Afiliado {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  nombre: string;

  @Column({ unique: true })
  email: string;

  @CreateDateColumn()
  createdAt: Date;
}
