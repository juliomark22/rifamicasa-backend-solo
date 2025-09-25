import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Distribuidor } from "./distribuidor.entity";

@Injectable()
export class DistribuidoresService {
  constructor(@InjectRepository(Distribuidor) private repo: Repository<Distribuidor>) {}

  findAll() { return this.repo.find({ relations: ["boletos"] }); }
  findOne(id: string) { return this.repo.findOne({ where: { id }, relations: ["boletos"] }); }
  create(data: Partial<Distribuidor>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<Distribuidor>) { return this.repo.update(id, data); }
  remove(id: string) { return this.repo.delete(id); }
}
