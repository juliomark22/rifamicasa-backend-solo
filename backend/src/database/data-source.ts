import "dotenv/config";
import { DataSource } from "typeorm";
import { User } from "../users/user.entity";

const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "127.0.0.1",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "rifas_user",
  password: process.env.DB_PASSWORD || "Martich05",
  database: process.env.DB_NAME || "rifasdb",
  entities: [User],
  synchronize: true,
  logging: false,
});

export default dataSource;
