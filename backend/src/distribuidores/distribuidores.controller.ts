import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common";
import { DistribuidoresService } from "./distribuidores.service";
import { Distribuidor } from "./distribuidor.entity";

@Controller("distribuidores")
export class DistribuidoresController {
  constructor(private readonly service: DistribuidoresService) {}

  @Get()
  findAll(): Promise<Distribuidor[]> { return this.service.findAll(); }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<Distribuidor | null> { return this.service.findOne(id); }

  @Post()
  create(@Body() data: Partial<Distribuidor>): Promise<Distribuidor> { return this.service.create(data); }

  @Put(":id")
  update(@Param("id") id: string, @Body() data: Partial<Distribuidor>) { return this.service.update(id, data); }

  @Delete(":id")
  remove(@Param("id") id: string) { return this.service.remove(id); }
}
