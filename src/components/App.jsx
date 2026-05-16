import { useState, useEffect } from "react";
import NewPlantForm from "./components/NewPlantForm";
import PlantCard from "./components/PlantCard";

function App() {
  const [plants, setPlants] = useState([]);    
  const [search, setSearch] = useState("");       


  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then(r => r.json())
      .then(data => setPlants(data));
  }, []);

  
  function handleAddPlant(newPlant) {
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPlant),
    })
      .then(r => r.json())
      .then(added => setPlants(prev => [...prev, added]));
  }


  function handleToggleStock(id) {
    setPlants(prev =>
      prev.map(p => p.id === id ? { ...p, inStock: !p.inStock } : p)
    );
  }


  const displayedPlants = plants.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search plants..."
        onChange={e => setSearch(e.target.value)} 
      />
      <NewPlantForm onAddPlant={handleAddPlant} /> 
      {displayedPlants.map(plant => (               
        <PlantCard
          key={plant.id}
          plant={plant}
          onToggleStock={handleToggleStock}        
        />
      ))}
    </div>
  );
}

export default App;