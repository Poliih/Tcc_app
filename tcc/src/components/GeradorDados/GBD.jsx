
export const generateRandomData = () => {
  return Array.from({ length: 5 }, () => Math.floor(Math.random() * 1000));
};

export const generateRandomNames = () => {
  const names = ["John", "Doe", "Alice", "Bob", "Eve"];
  return Array.from({ length: 5 }, () => names[Math.floor(Math.random() * names.length)]);
};

export const generateRandomLocations = () => {
  const locations = ["New York", "London", "Paris", "Tokyo", "Berlin"];
  return Array.from({ length: 5 }, () => locations[Math.floor(Math.random() * locations.length)]);
};

export const generateRandomMonths = () => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return Array.from({ length: 5 }, () => months[Math.floor(Math.random() * months.length)]);
};

export const generateRandomKwh = () => {
  return Array.from({ length: 5 }, () => (Math.random() * 100).toFixed(2));
};
