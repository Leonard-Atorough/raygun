import { createContext, useState, type ReactNode } from "react";
import type { RequestDTO } from "../dto/request.dto";
import type { ResponseDTO } from "../dto/response.dto";

interface requestCtx {
  request: RequestDTO | null;
  setRequest: (r: RequestDTO) => void;
  response: ResponseDTO | null;
  setResponse: (r: ResponseDTO) => void;
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
}

const RequestContext = createContext<requestCtx | undefined>(undefined);

export function RequestProvider({ children }: { children: ReactNode }) {
  const [request, setRequest] = useState<RequestDTO | null>(null);
  const [response, setResponse] = useState<ResponseDTO | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <RequestContext
      value={{
        request,
        setRequest,
        response,
        setResponse,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </RequestContext>
  );
}

export default RequestContext;
