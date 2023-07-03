import { useAuth } from "@clerk/clerk-react";
import React from "react";
import { Navigate } from "react-router-dom";

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
