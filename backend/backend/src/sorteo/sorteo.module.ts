import { Module } from '@nestjs/common';
import { SorteoController } from './presentation/sorteo.controller';

@Module({
  controllers: [SorteoController],
})
export class SorteoModule {}
