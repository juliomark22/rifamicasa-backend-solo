import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("referrals")
export class Referral {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  referidoEmail: string;

  @Column()
  referidoNombre: string;

  @Column()
  referidoDocumento: string;

  @Column()
  referidoTelefono: string;

  @CreateDateColumn()
  createdAt: Date;
}
