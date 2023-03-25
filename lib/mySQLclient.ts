import { createPool, Pool, ResultSetHeader } from "mysql2";

class mySQLutils {
  public connection: Pool;

  constructor(conf: {
    host: string;
    user: string;
    password: string;
    database: string;
    multipleStatements: boolean;
  }) {
    this.connection = createPool(conf);
  }

  protected query(sql: string, values?: any[]) {
    const promise = new Promise<any>((resolve, reject) => {
      this.connection.query(sql, values, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
    return promise;
  }

  public selectFrom(
    from: string,
    identifiers: string[] | string,
    whereExp?: string
  ): Promise<any[]> {
    if (typeof identifiers !== "string")
      identifiers = this.arrayToString(identifiers);

    const sql = `SELECT ${identifiers} FROM ${from} ${
      whereExp ? `WHERE ${whereExp}` : ""
    };`;

    return this.query(sql);
  }

  public insertInto(table: string, obj: {}): Promise<ResultSetHeader> {
    const keysString = this.arrayToString(Object.keys(obj), false);
    const values = Object.values(obj);

    const placeholders = this.getPlaceholdersStr(obj);

    const sql = `INSERT INTO ${table} (${keysString}) VALUES ${placeholders};`;
    return this.query(sql, values);
  }

  public update(
    table: string,
    object: {},
    whereExp: {},
    skipId = false
  ): Promise<void> {
    let values = [];
    let updateExp = `UPDATE ${table} SET `;

    const keysArray = Object.keys(object);

    for (const [index, key] of keysArray.entries()) {
      if (skipId && index === 0) continue;

      updateExp += key + " = ?";
      values.push(object[key as keyof Object]);

      if (index !== keysArray.length - 1) updateExp += ", ";
    }

    updateExp += " WHERE " + whereExp + ";";

    return this.query(updateExp, values);
  }

  public deleteFrom(table: string, whereExp?: string) {
    let sql = `DELETE FROM ${table}`;

    if (whereExp) sql += ` WHERE ${whereExp};`;
    sql += ";";

    return this.query(sql);
  }

  private arrayToString(
    array: (string | number)[],
    withQuotes: boolean = true
  ) {
    let mergedString = "";
    mergedString += array.map((id) => {
      if (id === "") return " null";
      if (withQuotes && typeof id === "string") return ` '${id}'`;
      return " " + id;
    });
    return mergedString.trim();
  }

  private getPlaceholdersStr(obj: {}) {
    let result = "(";

    const objKeys = Object.keys(obj);
    objKeys.map((key, i) => {
      result += "?";
      if (i !== objKeys.length - 1) result += ",";
    });

    return result + ")";
  }
}

export enum Tables {}

export class mySQLclient extends mySQLutils {
  constructor() {
    const conf = {
      host: "example.com",
      user: "admin",
      password: "test",
      database: "test_db",
      multipleStatements: false,
    };

    super(conf);
  }
}
