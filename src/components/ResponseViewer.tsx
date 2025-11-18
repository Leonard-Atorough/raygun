import { Card, Divider, Typography } from "@mui/material";
import RequestContext from "../context/RequestContext";
import { useContext } from "react";
import JSONPretty from "react-json-pretty";

export function ResponseViewer() {
  const ctx = useContext(RequestContext);

  if (!ctx) {
    throw new Error(
      "No Request context. Component must be used within <RequestProvider>"
    );
  }
  const { response } = ctx;

  if (!response) return <Typography>No response yet.</Typography>;

  return (
    <Card sx={{ p: 2, mt: 2 }}>
      <Typography>
        Status: {response.status ?? "-"} • Tme: {response.durationMs ?? "-"} ms
      </Typography>
      <Divider sx={{ my: 1 }} />
      <Typography variant="caption">Headers</Typography>
      <pre>{JSON.stringify(response.headers, null, 2)}</pre>
      <Divider sx={{ my: 1 }} />
      <Typography variant="caption">Body</Typography>
      {typeof response.data === "object" ? (
        <JSONPretty data={response.data}></JSONPretty>
      ) : (
        <pre>{response.data}</pre>
      )}

      {response.error && (
        <>
          <Divider sx={{ my: 1 }} />
          <Typography color="error">Error: {response.error}</Typography>
        </>
      )}
    </Card>
  );
}
