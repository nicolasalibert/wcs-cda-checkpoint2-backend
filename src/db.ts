import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "sqlite",
  database: "db.sqlite",
  entities: [],
  logging: true,
  synchronize: true,
  // migrations: ["./migrations/*.ts"],
  // migrationsTableName: "migrations",
});
