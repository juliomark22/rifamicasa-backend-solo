import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Afiliado } from "./domain/afiliado.entity";

@Injectable()
export class AfiliadoService {
  constructor(
    @InjectRepository(Afiliado)
    private repo: Repository<Afiliado>
  ) {}

  findAll(): Promise<Afiliado[]> {
    return this.repo.find();
  }

  create(data: Partial<Afiliado>): Promise<Afiliado> {
    const nuevo = this.repo.create(data);
    return this.repo.save(nuevo);
  }

  async update(id: string, data: Partial<Afiliado>): Promise<Afiliado> {
    await this.repo.update(id, data);
    return this.repo.findOneByOrFail({ id });
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
