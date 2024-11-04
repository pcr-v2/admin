import { PrismaClient as MysqlPrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  mysqlPrisma?: MysqlPrismaClient;
};

export const mysqlPrisma =
  globalForPrisma.mysqlPrisma || new MysqlPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.mysqlPrisma = mysqlPrisma;
}
