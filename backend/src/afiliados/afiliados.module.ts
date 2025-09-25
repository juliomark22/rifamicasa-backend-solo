import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Afiliado } from "./afiliado.entity";
import { AfiliadosService } from "./afiliados.service";
import { AfiliadosController } from "./afiliados.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Afiliado])],
  providers: [AfiliadosService],
  controllers: [AfiliadosController],
})
export class AfiliadosModule {}
