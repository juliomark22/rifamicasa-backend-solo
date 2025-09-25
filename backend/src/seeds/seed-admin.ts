import { DataSource } from "typeorm";
import * as bcrypt from "bcrypt";
import { User } from "../users/user.entity";
import { AppDataSource } from "../data-source"; // Ajusta si tu data-source está en otra ruta

async function seedAdmin() {
  await AppDataSource.initialize();
  const repo = AppDataSource.getRepository(User);

  const email = "admin@example.com";
  const plainPass = "admin123";
  const rol: "admin" = "admin";

  let user = await repo.findOne({ where: { email } });

  if (!user) {
    const passwordHash = await bcrypt.hash(plainPass, 10);
    user = repo.create({ email, passwordHash, rol });
    await repo.save(user);
    console.log("✅ Admin creado:", email, plainPass);
  } else {
    // Actualizamos password y rol por seguridad
    user.passwordHash = await bcrypt.hash(plainPass, 10);
    user.rol = rol;
    await repo.save(user);
    console.log("🔄 Admin actualizado:", email, plainPass);
  }

  await AppDataSource.destroy();
}

seedAdmin().then(() => process.exit(0));
