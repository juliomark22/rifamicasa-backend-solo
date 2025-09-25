import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common";
import { ReferralsService } from "./referrals.service";
import { Referral } from "./referral.entity";

@Controller("referrals")
export class ReferralsController {
  constructor(private readonly service: ReferralsService) {}

  @Get()
  findAll(): Promise<Referral[]> { return this.service.findAll(); }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<Referral | null> { return this.service.findOne(id); }

  @Post()
  create(@Body() data: Partial<Referral>): Promise<Referral> { return this.service.create(data); }

  @Put(":id")
  update(@Param("id") id: string, @Body() data: Partial<Referral>) { return this.service.update(id, data); }

  @Delete(":id")
  remove(@Param("id") id: string) { return this.service.remove(id); }
}
