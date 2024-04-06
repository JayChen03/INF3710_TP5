import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";

import { Oiseau } from "../../../common/tables/Oiseau";

import { DatabaseService } from "../services/database.service";
import Types from "../types";

@injectable()
export class DatabaseController {
  public constructor(
    @inject(Types.DatabaseService) private databaseService: DatabaseService
  ) {}

  public get router(): Router {
    const router: Router = Router();

    router.get("/birds", (req: Request, res: Response, _: NextFunction) => {
      this.databaseService
        .getAllBirds()
        .then((result: pg.QueryResult) => {
          res.json(result.rows);
        })
        .catch((e: Error) => {
          console.error(e.stack);
          res.status(400).send(e.message);
        });
    });

    router.delete("/birds/:nomscientifique", (req: Request, res: Response, _: NextFunction) => {
      this.databaseService
        .deleteBird(req.params.nomscientifique)
        .then((result: pg.QueryResult) => {
          res.json(result.rowCount);
        })
        .catch((e: Error) => {
          console.error(e.message);
          res.status(400).send(e.message);
        });
    });

    router.post("/birds/add", (req: Request, res: Response, _: NextFunction) => {
      const oiseau: Oiseau = {
        nomscientifique: req.body.nomscientifique,
        nomcommun: req.body.nomcommun,
        statutspeces: req.body.statutspeces,
        nomscientifiquecomsommer: req.body.nomscientifiquecomsommer,
      };

      this.databaseService
        .addBird(oiseau)
        .then((result: pg.QueryResult) => {
          res.json(result.rowCount);
        })
        .catch((e: Error) => {
          console.error(e.stack);
          res.status(400).send(e.message);
        });
    });

    router.put("/birds/update", (req: Request, res: Response, _: NextFunction) => {
      const oiseau: Oiseau = {
        nomscientifique: req.body.nomscientifique,
        nomcommun: req.body.nomcommun,
        statutspeces: req.body.statutspeces,
        nomscientifiquecomsommer: req.body.nomscientifiquecomsommer === "" ? null : req.body.nomscientifiquecomsommer,
      };

      console.log(oiseau);

      this.databaseService
        .updateBird(oiseau)
        .then((result: pg.QueryResult) => {
          res.json(result.rowCount);
        })
        .catch((e: Error) => {
          console.error(e.stack);
          res.status(400).send(e.message);
        });
    });

    // ======= GENERAL ROUTES =======
    router.get(
      "/tables/:tableName",
      (req: Request, res: Response, next: NextFunction) => {
        this.databaseService
          .getAllFromTable(req.params.tableName)
          .then((result: pg.QueryResult) => {
            res.json(result.rows);
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );

    return router;
  }
}
