import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boleto } from './domain/boleto.entity';
import { BoletoService } from './application/boleto.service';
import { BoletoController } from './presentation/boleto.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Boleto])],
  controllers: [BoletoController],
  providers: [BoletoService],
  exports: [BoletoService],
})
export class BoletoModule {}
