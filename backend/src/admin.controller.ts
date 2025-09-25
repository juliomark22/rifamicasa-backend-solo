import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt.guard';

@Controller('admin')
export class AdminController {
  @Get('stats')
  @UseGuards(JwtAuthGuard)
  getStats(@Request() req: any) {
    return {
      boletosVendidos: 150,
      afiliados: 45,
      ventasTotales: 75000,
    };
  }
}
