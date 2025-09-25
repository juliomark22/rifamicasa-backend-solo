import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Boleto } from '../domain/boleto.entity';

@Injectable()
export class BoletoService {
  constructor(
    @InjectRepository(Boleto)
    private boletoRepo: Repository<Boleto>,
  ) {}

  async findAll(): Promise<Boleto[]> {
    return this.boletoRepo.find({ relations: ['comprador', 'afiliado'] });
  }

  async findOne(numero: number): Promise<Boleto | null> {
    return this.boletoRepo.findOne({ where: { numero }, relations: ['comprador', 'afiliado'] });
  }

  async create(data: Partial<Boleto>): Promise<Boleto> {
    const boleto = this.boletoRepo.create(data);
    return this.boletoRepo.save(boleto);
  }

  async update(numero: number, data: Partial<Boleto>): Promise<Boleto | null> {
    await this.boletoRepo.update(numero, data);
    return this.findOne(numero);
  }

  async delete(numero: number): Promise<void> {
    await this.boletoRepo.delete(numero);
  }
}
