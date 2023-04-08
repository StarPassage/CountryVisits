import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const searchInput = req.query.searchInput;

  const countries = await prisma.countries.findMany({
    where: {
      name: {
        contains: searchInput,
        mode: "insensitive",
      },
    },
    select: {
      name: true,
      iso_code: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  res.status(200).json(countries);
}
