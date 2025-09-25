import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { BoletoService } from '../application/boleto.service';
import { JwtAuthGuard } from '../../auth/infrastructure/jwt-auth.guard';

@Controller('boletos')
@UseGuards(JwtAuthGuard)
export class BoletoController {
  constructor(private readonly boletoService: BoletoService) {}

  @Get()
  async findAll() {
    return this.boletoService.findAll();
  }

  @Get(':numero')
  async findOne(@Param('numero') numero: number) {
    return this.boletoService.findOne(numero);
  }

  @Post()
  async create(@Body() data: any) {
    return this.boletoService.create(data);
  }

  @Put(':numero')
  async update(@Param('numero') numero: number, @Body() data: any) {
    return this.boletoService.update(numero, data);
  }

  @Delete(':numero')
  async delete(@Param('numero') numero: number) {
    return this.boletoService.delete(numero);
  }
}
