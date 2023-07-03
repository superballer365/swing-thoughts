import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "@tanstack/router";
import React from "react";

type Props = React.PropsWithChildren<{}>;

export default function ProtectedRoute({ children }: Props) {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return null;

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
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
