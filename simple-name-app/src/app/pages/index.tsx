import { useState, useEffect } from "react";

interface Name {
  _id: string;
  name: string;
}

const Home = () => {
  const [names, setNames] = useState<Name[]>([]);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    fetch("/api/names")
      .then((res) => res.json())
      .then((data) => setNames(data));
  }, []);

  const addName = async () => {
    const res = await fetch("/api/names", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    });

    if (res.ok) {
      const addedName = await res.json();
      setNames([...names, { _id: addedName._id, name: newName }]);
      setNewName("");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Simple Name App</h1>
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="Enter a name"
      />
      <button onClick={addName}>Add Name</button>
      <ul>
        {names.map((name) => (
          <li key={name._id}>{name.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
