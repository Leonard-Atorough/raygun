import { useState } from "react";
import type { RequestDTO } from "../dto/request.dto";
import type { ResponseDTO } from "../dto/response.dto";
import { Box } from "@mui/material";
import { RequestForm } from "../components/RequestForm";
import { ResponseViewer } from "../components/ResponseViewer";

export function RequestTab() {
  const [localRequest, setLocalRequest] = useState<RequestDTO | undefined>(
    undefined
  );
  const [localResponse, setLocalResponse] = useState<ResponseDTO | undefined>(
    undefined
  );

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        p: { xs: 1, md: 2 },
      }}
    >
      <RequestForm />
      <ResponseViewer />
    </Box>
  );
}
