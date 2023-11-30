import knex, { Knex } from "knex";

export class DatabaseService {
  public instance: Knex;

  constructor() {
    this.instance = this.connect();
  }

  private connect = (): Knex => {
    if (!this.instance) {
      const db2 = knex({
        client: "sqlite3",
        connection: {
          filename: "database.db",
        },
        useNullAsDefault: true,
      });

      return db2;
    }
    return this.instance;
  };
}

const DataBase = new DatabaseService();

export { DataBase };
