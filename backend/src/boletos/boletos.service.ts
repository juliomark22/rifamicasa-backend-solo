import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Boleto } from "./boleto.entity";

@Injectable()
export class BoletosService {
  constructor(@InjectRepository(Boleto) private repo: Repository<Boleto>) {}

  findAll() { return this.repo.find({ relations: ["distribuidor"] }); }
  findOne(id: string) { return this.repo.findOne({ where: { id }, relations: ["distribuidor"] }); }
  create(data: Partial<Boleto>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<Boleto>) { return this.repo.update(id, data); }
  remove(id: string) { return this.repo.delete(id); }
}
