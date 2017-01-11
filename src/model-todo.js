"use strict";
// import db from './db'
var crypto = require("crypto");
var Todo = (function () {
    function Todo(todo) {
        this.id = todo.id;
        this.content = todo.content;
        this.time = todo.time || Date.now();
        this.status = todo.status || 0 /* UNDONE */;
        this.user = todo.user || null;
    }
    return Todo;
}());
exports.Todo = Todo;
var fakeDatabase = {};
var checkDatabase = (function (db, id) {
    var todo = db[id];
    if (!todo) {
        throw new Error('There is no such a todo item with id ' + id);
    }
    return todo;
}).bind(null, fakeDatabase);
var Todos = {
    getAll: function () {
        return Object.keys(fakeDatabase).filter(function (id) { return fakeDatabase[id] && !fakeDatabase[id].user; }).map(function (id) { return new Todo(fakeDatabase[id]); });
    },
    getByUser: function (user) {
        return Object.keys(fakeDatabase).filter(function (id) {
            return fakeDatabase[id] && fakeDatabase[id].user === user;
        }).map(function (id) { return new Todo(fakeDatabase[id]); });
    },
    getById: function (id, user) {
        var todo = fakeDatabase[id];
        if (todo && (!todo.user || todo.user === user)) {
            return new Todo(Object.assign({}, { id: id }, todo));
        }
        throw new Error('not found id ' + id);
    },
    create: function (todo) {
        var id = crypto.randomBytes(10).toString('hex');
        var aTodo = Object.assign({}, todo, {
            time: Date.now()
        });
        fakeDatabase[id] = aTodo;
        return new Todo(Object.assign({ id: id }, aTodo));
    },
    "delete": function (id, user) {
        if (fakeDatabase[id] && user === fakeDatabase[id].user) {
            fakeDatabase[id] = null;
            return true;
        }
        throw new Error('not allowed delete id ' + id);
    },
    update: function (todo) {
        if (todo.user === undefined || todo.user === fakeDatabase[todo.id].user) {
            var _todo = Object.assign({}, todo, {
                time: Date.now()
            });
            fakeDatabase[todo.id] = _todo;
            return new Todo(_todo);
        }
        throw new Error('not allowed update id ' + todo.id);
    }
};
exports.__esModule = true;
exports["default"] = Todos;
