import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { AfiliadoService } from "./afiliado.service";
import { Afiliado } from "./domain/afiliado.entity";

@Controller("afiliados")
export class AfiliadoController {
  constructor(private service: AfiliadoService) {}

  @Get()
  listar(): Promise<Afiliado[]> {
    return this.service.findAll();
  }

  @Post()
  crear(@Body() data: Partial<Afiliado>): Promise<Afiliado> {
    return this.service.create(data);
  }

  @Put(":id")
  actualizar(@Param("id") id: string, @Body() data: Partial<Afiliado>): Promise<Afiliado> {
    return this.service.update(id, data);
  }

  @Delete(":id")
  eliminar(@Param("id") id: string): Promise<void> {
    return this.service.remove(id);
  }
}
