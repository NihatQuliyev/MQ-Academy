import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const USERNAME = "admin";
const PASSWORD = "Admin123!";

async function main() {
  const existing = await prisma.adminUser.findUnique({ where: { username: USERNAME } });
  if (existing) {
    console.log("Admin artıq mövcuddur:", USERNAME);
    return;
  }
  const hash = await bcrypt.hash(PASSWORD, 10);
  await prisma.adminUser.create({ data: { username: USERNAME, passwordHash: hash } });
  console.log("✅ Admin yaradıldı!");
  console.log("   Username:", USERNAME);
  console.log("   Password:", PASSWORD);
}

main().catch(console.error).finally(() => prisma.$disconnect());
