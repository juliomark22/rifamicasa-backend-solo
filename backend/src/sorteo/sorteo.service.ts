import { Injectable } from "@nestjs/common";

@Injectable()
export class SorteoService {
  ejecutar() {
    return { mensaje: "Sorteo ejecutado correctamente" };
  }
}
