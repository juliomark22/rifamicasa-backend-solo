import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/user.entity";
import { Afiliado } from "../afiliados/afiliado.entity";
import { Boleto } from "../boletos/boleto.entity";
import { Distribuidor } from "../distribuidores/distribuidor.entity";
import { Referral } from "../referrals/referral.entity";
import { AdminController } from "./admin.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Afiliado, Boleto, Distribuidor, Referral]),
  ],
  controllers: [AdminController],
})
export class AdminModule {}
