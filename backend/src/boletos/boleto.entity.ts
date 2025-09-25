import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Distribuidor } from "../distribuidores/distribuidor.entity";

@Entity("boletos")
export class Boleto {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  codigo: string;

  @Column({ default: false })
  vendido: boolean;

  @Column({ default: false })
  validado: boolean;

  @Column({ nullable: true })
  compradorNombre: string;

  @Column({ nullable: true })
  compradorDocumento: string;

  @Column({ nullable: true })
  compradorEmail: string;

  @Column({ type: "timestamp", nullable: true })
  fechaValidacion: Date;

  @ManyToOne(() => Distribuidor, distribuidor => distribuidor.boletos, { nullable: true })
  @JoinColumn({ name: "distribuidorId" })
  distribuidor: Distribuidor;

  @Column({ nullable: true })
  distribuidorId: string;

  @CreateDateColumn()
  createdAt: Date;
}
