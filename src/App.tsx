import { useState } from "react";
import "./App.css";
import { RequestProvider } from "./context/RequestContext";
import { Container, Typography } from "@mui/material";
import { RequestForm } from "./components/RequestForm";

function App() {
  return (
    <RequestProvider>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Mini-postman Clone
        </Typography>
        <RequestForm />
      </Container>
    </RequestProvider>
  );
}

export default App;
