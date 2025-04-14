import { DataSource } from "typeorm";
import { Country } from "./entities/Country";
import { Continent } from "./entities/Continent";

export const dataSource = new DataSource({
  type: "sqlite",
  database: "db.sqlite",
  entities: [Country, Continent],
  logging: true,
  synchronize: true,
  // migrations: ["./migrations/*.ts"],
  // migrationsTableName: "migrations",
});
