import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestMethod = req.method;
  let ip = req.headers["x-real-ip"] as string;

  const forwardedFor = req.headers["x-forwarded-for"] as string;
  if (!ip && forwardedFor) {
    ip = forwardedFor?.split(",").at(0) ?? "Unknown";
  }

  switch (requestMethod) {
    case "POST":
      const requestBody = req.body;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${requestBody.lat},${requestBody.lng}&key=${process.env.GET_GOOGLE_MAPS_API_KEY}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      res.status(200).json({ access_ip: ip, data: data });
      break;
    default:
      return res
        .status(405)
        .json({ status: "error", error: "Method not allowed" });
      break;
  }
}
