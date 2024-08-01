import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export const findAll = async (): Promise<User[]> => {
  return prisma.user.findMany();
};

export const findById = async (id: number): Promise<User | null> => {
  return prisma.user.findUnique({ where: { id } });
};

export const findByEmail = async (email: string): Promise<User | null> => {
  return prisma.user.findUnique({ where: { email } });
};

export const create = async (user: Omit<User, "id">): Promise<User> => {
  return prisma.user.create({ data: user });
};

export const update = async (
  id: number,
  updateUser: Partial<User>
): Promise<User | null> => {
  return prisma.user.update({ where: { id }, data: updateUser });
};

export const remove = async (id: number): Promise<boolean> => {
  try {
    await prisma.user.delete({ where: { id } });
    return true;
  } catch (error) {
    return false;
  }
};
