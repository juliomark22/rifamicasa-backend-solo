import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { Boleto } from "../boletos/boleto.entity";

@Entity("distribuidores")
export class Distribuidor {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: true })
  activo: boolean;

  @OneToMany(() => Boleto, boleto => boleto.distribuidor)
  boletos: Boleto[];

  @CreateDateColumn()
  createdAt: Date;
}
