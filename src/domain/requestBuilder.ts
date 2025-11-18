import type { HttpMethod, RequestDTO } from "../dto/request.dto";

interface buildRequestParams {
  method: string;
  url: string;
  rawHeaders: string;
  rawQuery: string;
  body: string;
  auth?: {
    type: "basic" | "bearer";
    username?: string;
    password?: string;
    token?: string;
  };
}

export function buildRequest(params: buildRequestParams): RequestDTO {
  const { method, url, rawHeaders, rawQuery, body, auth } = params;

  // parse and construct headers
  const headers: Record<string, string> = {};
  rawHeaders.split("\n").forEach((line) => {
    const [k, ...v] = line.split(":");
    if (!k) return;
    const value = v.join(":").trim();
    if (value) headers[k.trim()] = value;
  });

  // parse query parameters
  const queryParams: Record<string, string> = {};
  const urlParams = new URLSearchParams(rawQuery);
  for (const [key, value] of urlParams) {
    queryParams[key] = value;
  }

  // parse url and add query
  const baseUrl = url.trim();
  const finalUrl = Object.keys(queryParams).length
    ? `${baseUrl}?${new URLSearchParams(queryParams).toString()}`
    : baseUrl;

  // NOTE: Consider casting the method input earlier
  // and having fallback logic (like, if req has no
  // body then default to get, log our structured error)
  return {
    method: method.toUpperCase() as HttpMethod,
    url: finalUrl,
    headers,
    queryParams,
    body: body?.trim(),
    auth,
  };
}
