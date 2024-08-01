"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.deleteUser = exports.updateUser = exports.addUser = exports.getUserById = exports.getUsers = void 0;
const userService = __importStar(require("../services/userService"));
const getUsers = async (request, reply) => {
    const users = await userService.getUsers();
    reply.send(users);
};
exports.getUsers = getUsers;
const getUserById = async (request, reply) => {
    const user = await userService.getUserById(Number(request.params.id));
    if (user) {
        reply.send(user);
    }
    else {
        reply.status(404).send({ message: "User not found" });
    }
};
exports.getUserById = getUserById;
const addUser = async (request, reply) => {
    const user = await userService.addUser(request.body);
    reply.status(201).send(user);
};
exports.addUser = addUser;
const updateUser = async (request, reply) => {
    const user = await userService.updateUser(Number(request.params.id), request.body);
    if (user) {
        reply.send(user);
    }
    else {
        reply.status(404).send({ message: "User not found" });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (request, reply) => {
    const success = await userService.deleteUser(Number(request.params.id));
    if (success) {
        reply.status(204).send();
    }
    else {
        reply.status(404).send({ message: "User not found" });
    }
};
exports.deleteUser = deleteUser;
const loginUser = async (request, reply) => {
    try {
        const { token, user } = await userService.authenticateUser(request.body.email, request.body.password);
        reply.send({ token, user });
    }
    catch (error) {
        reply.status(401).send({ message: "Invalid email or password" });
    }
};
exports.loginUser = loginUser;
