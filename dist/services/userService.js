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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = exports.deleteUser = exports.updateUser = exports.addUser = exports.getUserById = exports.getUsers = void 0;
const userModel = __importStar(require("../models/userModel"));
const hashUtils_1 = require("../utils/hashUtils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
const getUsers = () => {
    return userModel.findAll();
};
exports.getUsers = getUsers;
const getUserById = (id) => {
    return userModel.findById(id);
};
exports.getUserById = getUserById;
const addUser = async (user) => {
    user.password = await (0, hashUtils_1.hashPassword)(user.password);
    return userModel.create(user);
};
exports.addUser = addUser;
const updateUser = (id, updateUser) => {
    return userModel.update(id, updateUser);
};
exports.updateUser = updateUser;
const deleteUser = (id) => {
    return userModel.remove(id);
};
exports.deleteUser = deleteUser;
const authenticateUser = async (email, password) => {
    const user = await userModel.findByEmail(email);
    if (user && (await (0, hashUtils_1.comparePassword)(password, user.password))) {
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, JWT_SECRET, {
            expiresIn: "1h",
        });
        return { token, user };
    }
    throw new Error("Invalid email or password");
};
exports.authenticateUser = authenticateUser;
