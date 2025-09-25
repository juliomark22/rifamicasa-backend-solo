import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Distribuidor } from "./distribuidor.entity";
import { DistribuidoresService } from "./distribuidores.service";
import { DistribuidoresController } from "./distribuidores.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Distribuidor])],
  providers: [DistribuidoresService],
  controllers: [DistribuidoresController],
  exports: [DistribuidoresService],
})
export class DistribuidoresModule {}
