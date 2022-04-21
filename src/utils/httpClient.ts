// export const Products = fetch('https://fakestoreapi.com/products')
//   .then(res => res.json())
//   .then(json => console.log(json));

// console.log(Products);

export const getProducts = fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(json => console.log(json));
