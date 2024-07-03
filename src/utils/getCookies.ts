import { Request } from "express";

export function getCookies(req: Request): Record<string, string> {
  const cookieHeader = req.headers.cookie;
  const cookieList: Record<string, string> = {};

  if (cookieHeader) {
    const cookies = cookieHeader.split(";");
    cookies.forEach((cookie) => {
      const [name, value] = cookie.split("=");
      cookieList[name] = value;
    });
  }

  return cookieList;
}
