import React from "react";
import { useAuth } from "@clerk/clerk-react";

function App() {
  const auth = useAuth();
  console.log(auth);

  React.useEffect(() => {
    fetch("/api/test")
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error("Failed to hit test endpoint", err));
  }, []);

  return (
    <div>
      Hello you are signed in
      <button onClick={() => auth.signOut()}>sign out</button>
    </div>
  );
}

export default App;
