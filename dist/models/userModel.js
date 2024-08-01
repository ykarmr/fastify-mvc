"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.findByEmail = exports.findById = exports.findAll = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const findAll = async () => {
    return prisma.user.findMany();
};
exports.findAll = findAll;
const findById = async (id) => {
    return prisma.user.findUnique({ where: { id } });
};
exports.findById = findById;
const findByEmail = async (email) => {
    return prisma.user.findUnique({ where: { email } });
};
exports.findByEmail = findByEmail;
const create = async (user) => {
    return prisma.user.create({ data: user });
};
exports.create = create;
const update = async (id, updateUser) => {
    return prisma.user.update({ where: { id }, data: updateUser });
};
exports.update = update;
const remove = async (id) => {
    try {
        await prisma.user.delete({ where: { id } });
        return true;
    }
    catch (error) {
        return false;
    }
};
exports.remove = remove;
