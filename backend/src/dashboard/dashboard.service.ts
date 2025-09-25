import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Boleto } from "../boletos/boleto.entity";
import { Distribuidor } from "../distribuidores/distribuidor.entity";
import { User } from "../users/user.entity"; // asumiendo que User es Afiliado

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Boleto)
    private readonly boletoRepo: Repository<Boleto>,
    @InjectRepository(Distribuidor)
    private readonly distribuidorRepo: Repository<Distribuidor>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  async getMetrics() {
    // Boletos
    const totalBoletos = await this.boletoRepo.count();
    const validados = await this.boletoRepo.count({ where: { validado: true } });
    const pendientes = totalBoletos - validados;

    const porDistribuidor = await this.boletoRepo
      .createQueryBuilder("b")
      .leftJoinAndSelect("b.distribuidor", "d")
      .select("d.nombre", "distribuidor")
      .addSelect("COUNT(b.id)", "cantidad")
      .groupBy("d.nombre")
      .getRawMany();

    const topDistribuidor = porDistribuidor.sort(
      (a, b) => Number(b.cantidad) - Number(a.cantidad)
    )[0] || null;

    // Distribuidores
    const totalDistribuidores = await this.distribuidorRepo.count();
    const activos = await this.distribuidorRepo.count({ where: { activo: true } });
    const inactivos = totalDistribuidores - activos;

    // Afiliados (usuarios)
    const totalAfiliados = await this.userRepo.count();

    return {
      boletos: { total: totalBoletos, validados, pendientes, porDistribuidor, topDistribuidor },
      distribuidores: { total: totalDistribuidores, activos, inactivos },
      afiliados: { total: totalAfiliados },
    };
  }
}
