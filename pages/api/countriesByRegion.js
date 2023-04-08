import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const region = req.query.region;

  const countries = await prisma.countries.findMany({
    where: {
      region: region,
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
