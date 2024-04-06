import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import { Oiseau } from "../../../common/tables/Oiseau";

@injectable()
export class DatabaseService {
  // TODO: A MODIFIER POUR VOTRE BD
  public connectionConfig: pg.ConnectionConfig = {
    user: "postgres",
    database: "ornithologue_db",
    password: "Password",
    port: 5432,
    host: "127.0.0.1",
    keepAlive: true,
  };

  public pool: pg.Pool = new pg.Pool(this.connectionConfig);

  // ======= DEBUG =======
  public async getAllFromTable(tableName: string): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const res = await client.query(`SELECT * FROM HOTELDB.${tableName};`);
    client.release();
    return res;
  }

  public async getAllBirds(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const res = await client.query(`SELECT * FROM ornithologue_bd.Especeoiseau;`);
    client.release();
    return res;
  }

  public async deleteBird(nomscientifique: string): Promise<pg.QueryResult> {
    if (nomscientifique.length === 0) throw new Error("Invalid delete query");

    const client = await this.pool.connect();
    const query = `DELETE FROM ornithologue_bd.Especeoiseau WHERE nomscientifique = '${nomscientifique}';`;

    const res = await client.query(query);
    client.release();
    return res;
  }

  public async addBird(oiseau: Oiseau): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    if (!oiseau.nomscientifique || !oiseau.nomcommun || !oiseau.statutspeces)
      throw new Error("Invalid create bird values");

    const values: any[] = [
      oiseau.nomscientifique,
      oiseau.nomcommun,
      oiseau.statutspeces,
      oiseau.nomscientifiquecomsommer,
    ];
    const queryText: string = `INSERT INTO ornithologue_bd.Especeoiseau VALUES($1, $2, $3, $4);`;

    const res = await client.query(queryText, values);
    client.release();
    return res;
  }

  public async updateBird(oiseau: Oiseau): Promise<pg.QueryResult> {
    const client = await this.pool.connect();

    let toUpdateValues = [];
    if (oiseau.nomcommun.length > 0)
      toUpdateValues.push(`nomcommun = '${oiseau.nomcommun}'`);
    if (oiseau.statutspeces.length > 0)
      toUpdateValues.push(`statutspeces = '${oiseau.statutspeces}'`);
    if (oiseau.nomscientifiquecomsommer) {
      toUpdateValues.push(
        `nomscientifiquecomsommer = '${oiseau.nomscientifiquecomsommer}'`
      );
    } else {
      toUpdateValues.push(`nomscientifiquecomsommer = NULL`);
    }

    if (
      !oiseau.nomscientifique ||
      oiseau.nomscientifique.length === 0 ||
      toUpdateValues.length === 0
    )
      throw new Error("Invalid bird update query");

    const query = `UPDATE ornithologue_bd.Especeoiseau SET ${toUpdateValues.join(
      ", "
    )} WHERE nomscientifique = '${oiseau.nomscientifique}';`;
    const res = await client.query(query);
    client.release();
    return res;
  }
}
