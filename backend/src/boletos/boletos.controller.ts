import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common";
import { BoletosService } from "./boletos.service";
import { Boleto } from "./boleto.entity";

@Controller("boletos")
export class BoletosController {
  constructor(private readonly service: BoletosService) {}

  @Get()
  findAll(): Promise<Boleto[]> { return this.service.findAll(); }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<Boleto | null> { return this.service.findOne(id); }

  @Post()
  create(@Body() data: Partial<Boleto>): Promise<Boleto> { return this.service.create(data); }

  @Put(":id")
  update(@Param("id") id: string, @Body() data: Partial<Boleto>) { return this.service.update(id, data); }

  @Delete(":id")
  remove(@Param("id") id: string) { return this.service.remove(id); }
}
