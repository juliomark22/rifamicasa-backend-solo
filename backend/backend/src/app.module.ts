import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/domain/user.entity';
import { Boleto } from './boletos/domain/boleto.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BoletoModule } from './boletos/boleto.module';
import { AfiliadoModule } from './afiliados/afiliado.module';
import { SorteoModule } from './sorteo/sorteo.module';
import { HealthController } from './health.controller';
import { AdminController } from './admin.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [User, Boleto],
      synchronize: false,
      logging: false,
    }),
    AuthModule,
    UsersModule,
    BoletoModule,
    AfiliadoModule,
    SorteoModule,
  ],
  controllers: [HealthController, AdminController],
})
export class AppModule {}
