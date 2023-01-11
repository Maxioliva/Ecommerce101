export const getAllProducts = () => fetch('https://dummyjson.com/products').then(res => res.json());
