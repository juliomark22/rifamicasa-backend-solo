import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users/user.entity";
import { Afiliado } from "./afiliados/afiliado.entity";
import { Boleto } from "./boletos/boleto.entity";
import { Distribuidor } from "./distribuidores/distribuidor.entity";
import { Referral } from "./referrals/referral.entity";

import { UsersModule } from "./users/users.module";
import { BoletosModule } from "./boletos/boletos.module";
import { DistribuidoresModule } from "./distribuidores/distribuidores.module";
import { ReferralsModule } from "./referrals/referrals.module";
import { AdminModule } from "./admin/admin.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST || "127.0.0.1",
      port: parseInt(process.env.DB_PORT || "5432"),
      username: process.env.DB_USER || "rifas_user",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "rifasdb",
      entities: [User, Afiliado, Boleto, Distribuidor, Referral],
      synchronize: false,
    }),
    UsersModule,
    BoletosModule,
    DistribuidoresModule,
    ReferralsModule,
    AdminModule,
  ],
})
export class AppModule {}
