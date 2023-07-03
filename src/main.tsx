import React from "react";
import ReactDOM from "react-dom/client";
import {
  Outlet,
  RouterProvider,
  Router,
  Route,
  RootRoute,
} from "@tanstack/router";
import App from "./App.tsx";
import "./index.css";
import { ClerkProvider, SignIn } from "@clerk/clerk-react";
import { withProtected } from "./components/ProtectedRoute.tsx";

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw "Missing Publishable Key";
}

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const rootRoute = new RootRoute({
  component: () => {
    console.log("At root route");
    return (
      <div style={{ height: "100dvh", width: "100dvw" }}>
        <Outlet />
      </div>
    );
  },
});

const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: withProtected(App),
});

const signInRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/sign-in",
  component: () => {
    console.log("On sign in page");

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <div>test</div>
        <SignIn />
      </div>
    );
  },
});

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([homeRoute, signInRoute]);

// Create the router using your route tree
const router = new Router({ routeTree });

// Register your router for maximum type safety
declare module "@tanstack/router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>
);
