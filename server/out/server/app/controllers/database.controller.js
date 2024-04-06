"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseController = void 0;
const express_1 = require("express");
const inversify_1 = require("inversify");
const database_service_1 = require("../services/database.service");
const types_1 = require("../types");
let DatabaseController = class DatabaseController {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    get router() {
        const router = (0, express_1.Router)();
        router.get("/birds", (req, res, _) => {
            this.databaseService
                .getAllBirds()
                .then((result) => {
                res.json(result.rows);
            })
                .catch((e) => {
                console.error(e.stack);
                res.status(400).send(e.message);
            });
        });
        router.delete("/birds/:nomscientifique", (req, res, _) => {
            this.databaseService
                .deleteBird(req.params.nomscientifique)
                .then((result) => {
                res.json(result.rowCount);
            })
                .catch((e) => {
                console.error(e.message);
                res.status(400).send(e.message);
            });
        });
        router.post("/birds/add", (req, res, _) => {
            const oiseau = {
                nomscientifique: req.body.nomscientifique,
                nomcommun: req.body.nomcommun,
                statutspeces: req.body.statutspeces,
                nomscientifiquecomsommer: req.body.nomscientifiquecomsommer,
            };
            this.databaseService
                .addBird(oiseau)
                .then((result) => {
                res.json(result.rowCount);
            })
                .catch((e) => {
                console.error(e.stack);
                res.status(400).send(e.message);
            });
        });
        router.put("/birds/update", (req, res, _) => {
            const oiseau = {
                nomscientifique: req.body.nomscientifique,
                nomcommun: req.body.nomcommun,
                statutspeces: req.body.statutspeces,
                nomscientifiquecomsommer: req.body.nomscientifiquecomsommer === "" ? null : req.body.nomscientifiquecomsommer,
            };
            console.log(oiseau);
            this.databaseService
                .updateBird(oiseau)
                .then((result) => {
                res.json(result.rowCount);
            })
                .catch((e) => {
                console.error(e.stack);
                res.status(400).send(e.message);
            });
        });
        // ======= GENERAL ROUTES =======
        router.get("/tables/:tableName", (req, res, next) => {
            this.databaseService
                .getAllFromTable(req.params.tableName)
                .then((result) => {
                res.json(result.rows);
            })
                .catch((e) => {
                console.error(e.stack);
            });
        });
        return router;
    }
};
DatabaseController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.default.DatabaseService)),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], DatabaseController);
exports.DatabaseController = DatabaseController;
//# sourceMappingURL=database.controller.js.map