import "./App.css";
import { RequestProvider } from "./context/RequestContext";
import {
  Box,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { RequestForm } from "./components/RequestForm";
import { ResponseViewer } from "./components/ResponseViewer";

function App() {
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: { main: "#0066ff" },
      background: {
        default: "#f5f5f5",
        paper: "#fff",
      },
    },
    typography: {
      fontFamily: '"Inter", "Helvetica", "Arial", "sans-serif"',
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 8 },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RequestProvider>
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",

            bgcolor: "background.default",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              mb: 2,
              p: 1,
              bgcolor: "primary.main",
              color: "#fff",
            }}
          >
            <Typography variant="h4" component="h1" sx={{ fontWeight: "700" }}>
              Raygun
            </Typography>
            <Typography> Your handy HTTP Helper</Typography>
          </Box>

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
        </Box>
      </RequestProvider>
    </ThemeProvider>
  );
}

export default App;
