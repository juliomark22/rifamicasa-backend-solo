import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/infrastructure/jwt-auth.guard';

@Controller('afiliados')
@UseGuards(JwtAuthGuard)
export class AfiliadoController {
  @Get()
  async findAll() {
    return [
      {
        id: 'afiliado-1',
        nombre: 'Juan Pérez',
        email: 'juan@example.com',
        boletosVendidos: 25,
        comisionTotal: 250,
        codigoReferido: 'JUAN123',
      },
      {
        id: 'afiliado-2',
        nombre: 'María López',
        email: 'maria@example.com',
        boletosVendidos: 18,
        comisionTotal: 180,
        codigoReferido: 'MARIA456',
      },
    ];
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return {
      id,
      nombre: 'Juan Pérez',
      email: 'juan@example.com',
      boletosVendidos: 25,
      comisionTotal: 250,
      codigoReferido: 'JUAN123',
      boletos: [
        { numero: 5, estado: 'vendido', precio: 100, comision: 10 },
        { numero: 8, estado: 'vendido', precio: 100, comision: 10 },
      ],
    };
  }

  @Get(':id/reporte')
  async getReporte(@Param('id') id: string) {
    return {
      afiliadoId: id,
      boletosVendidos: 25,
      ventasTotales: 2500,
      comisionTotal: 250,
      boletos: [
        { numero: 5, comprador: 'cliente@example.com', fecha: '2025-09-21' },
        { numero: 8, comprador: 'cliente2@example.com', fecha: '2025-09-22' },
      ],
    };
  }
}
