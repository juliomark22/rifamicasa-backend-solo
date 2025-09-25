import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Afiliado } from "./domain/afiliado.entity";
import { AfiliadoService } from "./afiliado.service";
import { AfiliadoController } from "./afiliado.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Afiliado])],
  providers: [AfiliadoService],
  controllers: [AfiliadoController],
})
export class AfiliadoModule {}
