"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var _this = this;
var graphql_server_koa_1 = require("graphql-server-koa");
var Router = require("koa-router");
var jsonwebtoken_1 = require("jsonwebtoken");
var model_todo_1 = require("./model-todo");
var model_user_1 = require("./model-user");
exports.SECRET_KEY = 'NETEASE';
var router = new Router();
router.get('/', function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.body = 'hello world';
        ctx.status = 200;
        return [2 /*return*/];
    });
}); });
// User routes
router.post('/user', function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    var _a, name, password;
    return __generator(this, function (_b) {
        _a = ctx.request.body, name = _a.name, password = _a.password;
        if (!name || !password) {
            ctx.body = 'err';
            ctx.status = 406;
            return [2 /*return*/];
        }
        try {
            ctx.body = model_user_1["default"].create({ name: name, password: password });
        }
        catch (err) {
            ctx.body = err.message;
            ctx.status = 403;
        }
        return [2 /*return*/];
    });
}); });
// Login
router.post('/login', function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    var _a, name, password, result;
    return __generator(this, function (_b) {
        _a = ctx.request.body, name = _a.name, password = _a.password;
        result = model_user_1["default"].verify(name, password);
        if (result) {
            ctx.body = {
                status: 'success',
                token: jsonwebtoken_1.sign({ name: name }, exports.SECRET_KEY, { expiresIn: 60 * 60 * 5 })
            };
        }
        else {
            ctx.body = {
                status: 'fail'
            };
        }
        return [2 /*return*/];
    });
}); });
// Todo routes
router.get('/todos', function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.body = model_todo_1["default"].getAll();
        return [2 /*return*/];
    });
}); });
router.get('/todo/:id', function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            ctx.body = model_todo_1["default"].getById(ctx.params.id);
        }
        catch (err) {
            ctx.body = err;
            ctx.status = 500;
        }
        return [2 /*return*/];
    });
}); });
router.patch('/todo/:id', function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    var id, _a, content, user;
    return __generator(this, function (_b) {
        id = ctx.params.id;
        _a = ctx.request.body, content = _a.content, user = _a.user;
        ctx.body = model_todo_1["default"].update({ content: content, id: id, user: user });
        ctx.status = 201;
        return [2 /*return*/];
    });
}); });
router.post('/todo', function (ctx) { return __awaiter(_this, void 0, void 0, function () {
    var content;
    return __generator(this, function (_a) {
        content = ctx.request.body.content;
        if (!content) {
            ctx.status = 406;
            ctx.body = 'Not found content field';
            return [2 /*return*/];
        }
        ctx.body = model_todo_1["default"].create({ content: content });
        ctx.status = 201;
        return [2 /*return*/];
    });
}); });
router.get('/graphiql', graphql_server_koa_1.graphiqlKoa({ endpointURL: '/graphql' }));
exports.__esModule = true;
exports["default"] = router;
