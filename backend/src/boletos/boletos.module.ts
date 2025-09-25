import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Boleto } from "./boleto.entity";
import { BoletosService } from "./boletos.service";
import { BoletosController } from "./boletos.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Boleto])],
  providers: [BoletosService],
  controllers: [BoletosController],
  exports: [BoletosService],
})
export class BoletosModule {}
