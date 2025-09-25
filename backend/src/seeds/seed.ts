import { DataSource } from "typeorm";
import { User } from "../users/user.entity";
import { Distribuidor } from "../distribuidores/distribuidor.entity";
import { Afiliado } from "../afiliados/afiliado.entity";
import { Boleto } from "../boletos/boleto.entity";
import { Referral } from "../referrals/referral.entity";
import * as bcrypt from "bcrypt";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "127.0.0.1",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER || "rifas_user",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "rifasdb",
  entities: [User, Afiliado, Boleto, Distribuidor, Referral],
  synchronize: false,
});

async function runSeed() {
  await AppDataSource.initialize();

  // 1) Usuario admin
  const userRepo = AppDataSource.getRepository(User);
  const existsAdmin = await userRepo.findOne({ where: { email: "admin@rifas.com" } });
  if (!existsAdmin) {
    const hash = await bcrypt.hash("admin123", 10);
    await userRepo.save(userRepo.create({ email: "admin@rifas.com", passwordHash: hash, rol: "admin" }));
    console.log("✅ Usuario admin creado: admin@rifas.com / admin123");
  }

  // 2) Distribuidor demo
  const distRepo = AppDataSource.getRepository(Distribuidor);
  let dist = await distRepo.findOne({ where: { nombre: "Distribuidor Demo" } });
  if (!dist) {
    dist = await distRepo.save(distRepo.create({ nombre: "Distribuidor Demo", activo: true }));
    console.log("✅ Distribuidor demo creado");
  }

  // 3) Afiliado demo
  const afiRepo = AppDataSource.getRepository(Afiliado);
  const existsAfi = await afiRepo.findOne({ where: { email: "afiliado@demo.com" } });
  if (!existsAfi) {
    await afiRepo.save(afiRepo.create({ nombre: "Afiliado Demo", email: "afiliado@demo.com" }));
    console.log("✅ Afiliado demo creado");
  }

  // 4) Boletos demo
  const boletoRepo = AppDataSource.getRepository(Boleto);
  const countBoletos = await boletoRepo.count();
  if (countBoletos < 5) {
    for (let i = 1; i <= 5; i++) {
      await boletoRepo.save(boletoRepo.create({ codigo: "B" + String(i).padStart(4, "0"), distribuidorId: dist.id }));
    }
    console.log("✅ 5 boletos demo creados");
  }

  await AppDataSource.destroy();
}

runSeed().then(() => process.exit(0)).catch(err => {
  console.error("❌ Error en seed:", err);
  process.exit(1);
});
