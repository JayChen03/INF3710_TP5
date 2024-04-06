"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const inversify_1 = require("inversify");
const pg = require("pg");
require("reflect-metadata");
let DatabaseService = class DatabaseService {
    constructor() {
        // TODO: A MODIFIER POUR VOTRE BD
        this.connectionConfig = {
            user: "postgres",
            database: "ornithologue_db",
            password: "Password",
            port: 5432,
            host: "127.0.0.1",
            keepAlive: true,
        };
        this.pool = new pg.Pool(this.connectionConfig);
    }
    // ======= DEBUG =======
    getAllFromTable(tableName) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            const res = yield client.query(`SELECT * FROM HOTELDB.${tableName};`);
            client.release();
            return res;
        });
    }
    getAllBirds() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            const res = yield client.query(`SELECT * FROM ornithologue_bd.Especeoiseau;`);
            client.release();
            return res;
        });
    }
    deleteBird(nomscientifique) {
        return __awaiter(this, void 0, void 0, function* () {
            if (nomscientifique.length === 0)
                throw new Error("Invalid delete query");
            const client = yield this.pool.connect();
            const query = `DELETE FROM ornithologue_bd.Especeoiseau WHERE nomscientifique = '${nomscientifique}';`;
            const res = yield client.query(query);
            client.release();
            return res;
        });
    }
    addBird(oiseau) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            if (!oiseau.nomscientifique || !oiseau.nomcommun || !oiseau.statutspeces)
                throw new Error("Invalid create bird values");
            const values = [
                oiseau.nomscientifique,
                oiseau.nomcommun,
                oiseau.statutspeces,
                oiseau.nomscientifiquecomsommer,
            ];
            const queryText = `INSERT INTO ornithologue_bd.Especeoiseau VALUES($1, $2, $3, $4);`;
            const res = yield client.query(queryText, values);
            client.release();
            return res;
        });
    }
    updateBird(oiseau) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            let toUpdateValues = [];
            if (oiseau.nomcommun.length > 0)
                toUpdateValues.push(`nomcommun = '${oiseau.nomcommun}'`);
            if (oiseau.statutspeces.length > 0)
                toUpdateValues.push(`statutspeces = '${oiseau.statutspeces}'`);
            if (oiseau.nomscientifiquecomsommer) {
                toUpdateValues.push(`nomscientifiquecomsommer = '${oiseau.nomscientifiquecomsommer}'`);
            }
            else {
                toUpdateValues.push(`nomscientifiquecomsommer = NULL`);
            }
            if (!oiseau.nomscientifique ||
                oiseau.nomscientifique.length === 0 ||
                toUpdateValues.length === 0)
                throw new Error("Invalid bird update query");
            const query = `UPDATE ornithologue_bd.Especeoiseau SET ${toUpdateValues.join(", ")} WHERE nomscientifique = '${oiseau.nomscientifique}';`;
            const res = yield client.query(query);
            client.release();
            return res;
        });
    }
};
DatabaseService = __decorate([
    (0, inversify_1.injectable)()
], DatabaseService);
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=database.service.js.map