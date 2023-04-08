// dataFetcher.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function fetchAllCountries() {
  const allCountries = await prisma.countries.findMany({
    select: {
      name: true,
      iso_code: true,
      region: true,
    },
    orderBy: {
      name: "asc",
    },
  });
  await prisma.$disconnect();
  return allCountries;
}
