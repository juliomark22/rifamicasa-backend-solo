import { Controller, Get } from "@nestjs/common";
import { DashboardService } from "./dashboard.service";

@Controller("api/dashboard")
export class DashboardController {
  constructor(private readonly service: DashboardService) {}

  @Get("metrics")
  async getMetrics() {
    return this.service.getMetrics();
  }
}
