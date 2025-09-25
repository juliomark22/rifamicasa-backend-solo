import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "../../admin-ui"),
      serveRoot: "/admin-ui",
    }),
  ],
})
export class AdminUiModule {}
