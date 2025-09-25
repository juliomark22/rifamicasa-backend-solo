import { Controller, Post } from "@nestjs/common";
import { SorteoService } from "./sorteo.service";

@Controller("sorteo")
export class SorteoController {
  constructor(private service: SorteoService) {}

  @Post("ejecutar")
  ejecutar() {
    return this.service.ejecutar();
  }
}
