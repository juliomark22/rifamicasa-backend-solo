import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Afiliado } from "./afiliado.entity";

@Injectable()
export class AfiliadosService {
  constructor(@InjectRepository(Afiliado) private repo: Repository<Afiliado>) {}

  findAll() { return this.repo.find(); }
  findOne(id: string) { return this.repo.findOne({ where: { id } }); }
  create(data: Partial<Afiliado>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<Afiliado>) { return this.repo.update(id, data); }
  remove(id: string) { return this.repo.delete(id); }
}
