import React from "react";
import data from "./data";
import Entry from "./Entry";
import Heading from "./Heading";

function App() {
  const experiences = data.map((item) => {
    return <Entry key={item.id} {...item} />;
  });

  return (
    <div>
      <Heading />
      <section className="visited-places">{experiences}</section>
    </div>
  );
}

export default App;
