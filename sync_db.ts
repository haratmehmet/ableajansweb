import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const localUrl = "postgresql://postgres:postgres@localhost:5435/ableajans?schema=public";
const remoteUrl = "postgresql://neondb_owner:npg_SgMkQE91lzAv@ep-young-breeze-asneg18b-pooler.c-4.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

const localPrisma = new PrismaClient({
  datasources: { db: { url: localUrl } },
});

const remotePool = new Pool({ connectionString: remoteUrl });
const remoteAdapter = new PrismaPg(remotePool);
const remotePrisma = new PrismaClient({ adapter: remoteAdapter });

async function sync() {
  console.log("Fetching local data...");
  const settings = await localPrisma.siteSetting.findMany();
  const heroes = await localPrisma.heroContent.findMany();
  const services = await localPrisma.service.findMany();
  const stats = await localPrisma.statCard.findMany();
  const references = await localPrisma.reference.findMany();
  const projects = await localPrisma.project.findMany();
  const solutions = await localPrisma.solutionItem.findMany();
  const abouts = await localPrisma.aboutContent.findMany();
  const footers = await localPrisma.footerContent.findMany();
  const users = await localPrisma.adminUser.findMany();

  console.log("Clearing remote data...");
  await remotePrisma.siteSetting.deleteMany();
  await remotePrisma.heroContent.deleteMany();
  await remotePrisma.service.deleteMany();
  await remotePrisma.statCard.deleteMany();
  await remotePrisma.reference.deleteMany();
  await remotePrisma.project.deleteMany();
  await remotePrisma.solutionItem.deleteMany();
  await remotePrisma.aboutContent.deleteMany();
  await remotePrisma.footerContent.deleteMany();
  await remotePrisma.adminUser.deleteMany();

  console.log("Inserting remote data...");
  if (settings.length > 0) await remotePrisma.siteSetting.createMany({ data: settings });
  if (heroes.length > 0) await remotePrisma.heroContent.createMany({ data: heroes });
  if (services.length > 0) await remotePrisma.service.createMany({ data: services });
  if (stats.length > 0) await remotePrisma.statCard.createMany({ data: stats });
  if (references.length > 0) await remotePrisma.reference.createMany({ data: references });
  if (projects.length > 0) await remotePrisma.project.createMany({ data: projects });
  if (solutions.length > 0) await remotePrisma.solutionItem.createMany({ data: solutions });
  
  for (const a of abouts) {
    await remotePrisma.aboutContent.create({ data: a });
  }
  for (const f of footers) {
    await remotePrisma.footerContent.create({ data: f });
  }
  if (users.length > 0) await remotePrisma.adminUser.createMany({ data: users });

  console.log("Sync complete!");
}

sync()
  .catch(console.error)
  .finally(async () => {
    await localPrisma.$disconnect();
    await remotePrisma.$disconnect();
    await remotePool.end();
  });
