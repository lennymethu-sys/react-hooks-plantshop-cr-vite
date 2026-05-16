<form onSubmit={(e) => {
  e.preventDefault();
  onAddPlant({ name, image, price, inStock: true });
}}></form>