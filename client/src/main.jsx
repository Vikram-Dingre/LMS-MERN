import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/auth";
import InstructorContextProvider, {
  InstructorContext,
} from "./context/instructor";
import StudentContextProvider, { StudentContext } from "./context/student";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <InstructorContextProvider>
        <StudentContextProvider>
          <App />
        </StudentContextProvider>
      </InstructorContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
