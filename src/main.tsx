import React from "react";
import ReactDOM from "react-dom/client";
import {
  AppShell,
  Burger,
  Header,
  MantineProvider,
  Navbar,
} from "@mantine/core";
import App from "./App.tsx";
import "./index.css";
import { ClerkProvider, SignIn } from "@clerk/clerk-react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { withProtected } from "./components/ProtectedRoute.tsx";
import Swings from "./pages/swings/Swings.tsx";
import Home from "./pages/home/Home.tsx";

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw "Missing Publishable Key";
}

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const router = createBrowserRouter([
  {
    path: "/sign-in",
    Component: () => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100dvw",
          height: "100dvh",
        }}
      >
        <SignIn />
      </div>
    ),
  },
  {
    path: "/",
    Component: withProtected(App),
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/swings",
        Component: Swings,
      },
      {
        path: "/test",
        Component: () => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
            }}
          >
            You are on test page
          </div>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <MantineProvider>
        <RouterProvider router={router} />
      </MantineProvider>
    </ClerkProvider>
  </React.StrictMode>
);
