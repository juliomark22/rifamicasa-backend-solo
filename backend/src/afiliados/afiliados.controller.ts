import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common";
import { AfiliadosService } from "./afiliados.service";
import { Afiliado } from "./afiliado.entity";

@Controller("afiliados")
export class AfiliadosController {
  constructor(private service: AfiliadosService) {}

  @Get()
  getAll(): Promise<Afiliado[]> { return this.service.findAll(); }

  @Get(":id")
  getOne(@Param("id") id: string) { return this.service.findOne(id); }

  @Post()
  create(@Body() data: Partial<Afiliado>) { return this.service.create(data); }

  @Put(":id")
  update(@Param("id") id: string, @Body() data: Partial<Afiliado>) { return this.service.update(id, data); }

  @Delete(":id")
  remove(@Param("id") id: string) { return this.service.remove(id); }
}
