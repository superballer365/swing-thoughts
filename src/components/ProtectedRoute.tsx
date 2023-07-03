import { useAuth } from "@clerk/clerk-react";
import { Navigate, useNavigate } from "@tanstack/router";
import React from "react";

type Props = React.PropsWithChildren<{}>;

export default function ProtectedRoute({ children }: Props) {
  const { isLoaded, isSignedIn } = useAuth();
  const navigate = useNavigate();

  if (!isLoaded) return null;

  if (!isSignedIn) {
    console.log("Redirecting to sign in page");
    navigate({ to: "/sign-in" });

    return null;
  }

  return <>{children}</>;
}

export function withProtected<T>(
  Component: React.ComponentType<T>
): React.FC<T> {
  return (props: T) => (
    <ProtectedRoute>
      <Component {...(props as any)} />
    </ProtectedRoute>
  );
}
