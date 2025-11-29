"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
// import {authRoutes } from './routes/auth.js'
require("dotenv/config");
var neon_http_1 = require("drizzle-orm/neon-http");
var drizzle_orm_1 = require("drizzle-orm");
var schema_1 = require("./db/schema");
var db = (0, neon_http_1.drizzle)(process.env.DATABASE_URL);
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var user, users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = {
                        name: 'John',
                        age: 30,
                        email: 'john@example.com',
                    };
                    return [4 /*yield*/, db.insert(schema_1.usersTable).values(user)];
                case 1:
                    _a.sent();
                    console.log('New user created!');
                    return [4 /*yield*/, db.select().from(schema_1.usersTable)];
                case 2:
                    users = _a.sent();
                    console.log('Getting all users from the database: ', users);
                    /*
                    const users: {
                      id: number;
                      name: string;
                      age: number;
                      email: string;
                    }[]
                    */
                    return [4 /*yield*/, db
                            .update(schema_1.usersTable)
                            .set({
                            age: 31,
                        })
                            .where((0, drizzle_orm_1.eq)(schema_1.usersTable.email, user.email))];
                case 3:
                    /*
                    const users: {
                      id: number;
                      name: string;
                      age: number;
                      email: string;
                    }[]
                    */
                    _a.sent();
                    console.log('User info updated!');
                    return [4 /*yield*/, db.delete(schema_1.usersTable).where((0, drizzle_orm_1.eq)(schema_1.usersTable.email, user.email))];
                case 4:
                    _a.sent();
                    console.log('User deleted!');
                    return [2 /*return*/];
            }
        });
    });
}
main();
var app = (0, express_1.default)();
app.use(express_1.default.json());
// app.use('/auth' ,authRoutes);
app.get("/", function (req, res) {
    res.json({ message: "Server is running!" });
});
app.listen(8000, function () {
    console.log("App running on port 8000");
});
