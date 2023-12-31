import knex, { Knex } from "knex";
import { attachPaginate } from "knex-paginate";

export class DatabaseService {
  public instance: Knex;

  constructor() {
    this.instance = this.connect();
  }

  private connect = (): Knex => {
    if (!this.instance) {
      const config: knex.Knex.Config = {
        client: "sqlite3",
        connection: {
          filename: "database.db",
        },
        useNullAsDefault: true,
        log: console,
        debug: true,
      };
      const db2 = knex(config);

      attachPaginate();
      return db2;
    }
    return this.instance;
  };
}

const DataBase = new DatabaseService();

export { DataBase };
