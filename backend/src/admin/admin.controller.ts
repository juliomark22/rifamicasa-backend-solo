import { Controller, Get } from "@nestjs/common";

@Controller("admin")
export class AdminController {
  @Get("health")
  health() {
    return { status: "admin ok" };
  }
}
