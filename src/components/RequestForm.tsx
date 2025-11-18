import { useContext, useState } from "react";
import RequestContext from "../context/RequestContext";
import { buildRequest } from "../domain/requestBuilder";
import { Box, Button, MenuItem, Select, TextField } from "@mui/material";
import { sendRequest } from "../infrastructure/httpClient";

export function RequestForm() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [rawHeaders, setRawHeaders] = useState("");
  const [rawQuery, setRawQuery] = useState("");
  const [body, setBody] = useState("");
  const [authType, setAuthType] = useState<"none" | "basic" | "bearer">("none");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const ctx = useContext(RequestContext);

  if (!ctx) {
    throw new Error(
      "No Request context. Component must be used within <RequestProvider>"
    );
  }

  const { setRequest, setResponse } = ctx;

  async function handleSend() {
    console.log("handling send");
    const requestDto = buildRequest({
      method,
      url,
      rawHeaders,
      rawQuery,
      body,
      auth:
        authType === "none"
          ? undefined
          : authType === "basic"
          ? { type: authType, username, password }
          : { type: authType, token },
    });

    setRequest(requestDto);

    const response = await sendRequest(requestDto);

    setResponse(response);
    console.log(response);
  }

  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          size="small"
        >
          {["GET", "POST", "PUT", "PATCH", "DELETE"].map((m) => (
            <MenuItem key={m} value={m}>
              {m}
            </MenuItem>
          ))}
        </Select>
        <TextField
          label="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          fullWidth
        />
        <Select value={authType} onChange={(e) => setAuthType(e.target.value)}>
          {["none", "basic", "bearer"].map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </div>
      {/* headers */}
      <TextField
        label="Headers (one per line - Key:Value)"
        multiline
        rows={4}
        value={rawHeaders}
        onChange={(e) => setRawHeaders(e.target.value)}
        fullWidth
      />
      {/* query params */}
      <TextField
        label="Query string (key=value&key2=value2)"
        value={rawQuery}
        onChange={(e) => setRawQuery(e.target.value)}
        fullWidth
      />
      {/* Body */}
      {["POST", "PUT", "PATCH"].includes(method) && (
        <TextField
          label="Body (raw JSON / text)"
          multiline
          rows={6}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          fullWidth
        />
      )}

      {/* Auth section */}
      {authType === "basic" && (
        <>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </>
      )}
      {authType === "bearer" && (
        <TextField
          name="Bearer token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          fullWidth
        />
      )}

      <Button variant="contained" color="primary" onClick={handleSend}>
        Send
      </Button>
    </Box>
  );
}
