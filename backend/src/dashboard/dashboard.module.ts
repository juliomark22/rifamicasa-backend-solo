import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DashboardController } from "./dashboard.controller";
import { DashboardService } from "./dashboard.service";
import { Boleto } from "../boletos/boleto.entity";
import { Distribuidor } from "../distribuidores/distribuidor.entity";
import { User } from "../users/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Boleto, Distribuidor, User])],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [DashboardService],
})
export class DashboardModule {}
