import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider, theme } from "@chakra-ui/react"; // Import Chakra UI's ChakraProvider and theme
import { BrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
const root = ReactDOM.createRoot(document.getElementById("root")); // Find the 'root' element in the DOM

// Render the application wrapped with ChakraProvider for theming support
root.render(
  <React.StrictMode>
    <Layout>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </Layout>
  </React.StrictMode>
);
