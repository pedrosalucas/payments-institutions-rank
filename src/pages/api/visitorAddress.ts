import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestMethod = req.method;

  switch (requestMethod) {
    case "POST":
      const params = JSON.parse(req.body);
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${params.lat},${params.lng}&key=${process.env.GET_GOOGLE_MAPS_API_KEY}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      res.status(200).json(data);
      break;
    default:
      return res
        .status(405)
        .json({ status: "error", error: "Method not allowed" });
      break;
  }
}
