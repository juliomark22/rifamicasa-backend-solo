import { Module } from '@nestjs/common';
import { AfiliadoController } from './presentation/afiliado.controller';

@Module({
  controllers: [AfiliadoController],
})
export class AfiliadoModule {}
