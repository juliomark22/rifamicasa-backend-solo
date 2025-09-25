import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Referral } from "./referral.entity";

@Injectable()
export class ReferralsService {
  constructor(@InjectRepository(Referral) private repo: Repository<Referral>) {}

  findAll() { return this.repo.find(); }
  findOne(id: string) { return this.repo.findOne({ where: { id } }); }
  create(data: Partial<Referral>) { return this.repo.save(this.repo.create(data)); }
  update(id: string, data: Partial<Referral>) { return this.repo.update(id, data); }
  remove(id: string) { return this.repo.delete(id); }
}
