import { useState } from "react";
import "./App.css";
import { RequestProvider } from "./context/RequestContext";
import { Container, Typography } from "@mui/material";
import { RequestForm } from "./components/RequestForm";
import { ResponseViewer } from "./components/ResponseViewer";

function App() {
  return (
    <RequestProvider>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Raygun - API Tester
        </Typography>
        <RequestForm />
        <ResponseViewer />
      </Container>
    </RequestProvider>
  );
}

export default App;
