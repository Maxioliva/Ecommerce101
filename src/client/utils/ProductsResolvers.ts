export const getAllProducts = () => fetch('https://dummyjson.com/products').then(res => res.json());

export const searchProducts = (value: string) =>
  fetch(`https://dummyjson.com/products/search?q=${value}`).then(res => res.json());
