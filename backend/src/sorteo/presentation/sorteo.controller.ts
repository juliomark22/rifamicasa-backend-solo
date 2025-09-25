import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt.guard';

@Controller('sorteo')
@UseGuards(JwtAuthGuard)
export class SorteoController {
  @Post('ejecutar')
  async ejecutarSorteo(@Body() body: { boletosVendidos: number[] }) {
    const timestamp = new Date().toISOString();
    const hash = this.generarHash(body.boletosVendidos, timestamp);
    const ganador = this.seleccionarGanador(body.boletosVendidos);

    return {
      ganador,
      timestamp,
      hash,
      boletosVendidos: body.boletosVendidos,
      videoUrl: 'https://rifamicasard.com/sorteo-en-vivo.mp4',
      actaUrl: 'https://rifamicasard.com/acta-notarial.pdf',
    };
  }

  private generarHash(boletos: number[], timestamp: string): string {
    const crypto = require('crypto');
    return crypto.createHash('sha256').update(JSON.stringify(boletos) + timestamp).digest('hex');
  }

  private seleccionarGanador(boletos: number[]): number {
    const randomIndex = Math.floor(Math.random() * boletos.length);
    return boletos[randomIndex];
  }
}
