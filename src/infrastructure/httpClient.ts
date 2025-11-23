import type { AxiosRequestConfig, AxiosResponseHeaders, AxiosHeaders } from "axios";
import type { RequestDTO } from "../dto/request.dto";
import type { ResponseDTO } from "../dto/response.dto";
import axios from "axios";

export async function sendRequest(req: RequestDTO): Promise<ResponseDTO> {
  const start = Date.now();

  const config: AxiosRequestConfig = {
    method: req.method,
    url: req.url,
    headers: req.headers,
    data: req.body ? JSON.parse(req.body) : undefined,
    timeout: 30000,
    withCredentials: true,
  };

  //Basic/Bearer auth convenience
  if (req.auth?.type === "basic") {
    const encoded = btoa(`${req.auth.username}:${req.auth.password}`);
    config.headers = {
      ...config.headers,
      getAuthorization: `Basic ${encoded}`,
    };
  } else if (req.auth?.type === "bearer") {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${req.auth.token}`,
    };
  }

  // Axios style fetch request, very cool
  // define config and use that as the request!
  try {
    const resp = await axios(config);
    return {
      status: resp.status,
      headers: axiosHeadersToRecord(resp.headers, {
        lowerCaseKeys: true,
        stringHopByHop: true,
      }),
      data: resp.data,
      durationMs: Date.now() - start,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return {
      error: err.message,
      status: err.response?.status,
      headers: err.response?.headers,
      data: err.response?.data,
      durationMs: Date.now() - start,
    };
  }
}

function axiosHeadersToRecord(
  raw: AxiosResponseHeaders | Partial<AxiosHeaders> | undefined,
  opts?: { lowerCaseKeys?: boolean; stringHopByHop?: boolean }
): Record<string, string> {
  if (!raw) return {};
  // Destructure settings for lowercase keys and skipping hop by hop headers
  const { lowerCaseKeys = true, stringHopByHop = false } = opts ?? {};

  //A set of standard generic hop by hop headers. Set ensures no duplication plus faster hasmap based lookup
  const hopByHop = new Set([
    "connection",
    "keep-alive",
    "proxy-authenticate",
    "proxy-authorization",
    "te",
    "trailer",
    "transfer-encoding",
    "upgrade",
  ]);

  //Our output Record
  const out: Record<string, string> = {};

  // walk the input record
  // if the value is null for a given key, continue
  // if value is an array, join array elements using a separator
  // map key and value to Record
  for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
    if (v === null) continue;
    const key = lowerCaseKeys ? k.toLowerCase() : k;
    if (stringHopByHop && hopByHop.has(key)) continue;

    out[key] = Array.isArray(v) ? v.join(", ") : String(v);
  }

  // return Record
  return out;
}
