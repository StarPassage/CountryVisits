// pages/api/countries/[region].js
import { fetchCountriesByRegion } from "./countries";

export default async function handler(req, res) {
  const {
    query: { region },
  } = req;

  if (req.method === "GET") {
    try {
      const countries = await fetchCountriesByRegion(region);
      res.status(200).json(countries);
    } catch (error) {
      res.status(500).json({ message: "Error fetching countries" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
