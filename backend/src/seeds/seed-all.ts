import { DataSource } from "typeorm";
import * as bcrypt from "bcrypt";
import { User } from "../users/user.entity";

export async function seedAll(dataSource: DataSource) {
  const repo = dataSource.getRepository(User);
  const email = "test@example.com";
  const plainPass = "123456";
  const rol = "cliente";

  let user = await repo.findOne({ where: { email } });
  if (!user) {
    const hashed = await bcrypt.hash(plainPass, 10);
    user = repo.create({ email, passwordHash: hashed, rol });
    await repo.save(user);
    console.log("✅ Usuario seed creado:", email);
  } else {
    console.log("ℹ️ Usuario seed ya existe:", email);
  }
}
