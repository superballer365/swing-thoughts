import React from "react";

export default function Home() {
  React.useEffect(() => {
    fetch("/api/test")
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error("Failed to hit test endpoint", err));
  }, []);

  return <div>Hello you are signed in</div>;
}
