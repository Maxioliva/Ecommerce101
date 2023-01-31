import axios from 'axios';
import { SearchResult } from './Type';

const api = axios.create({ baseURL: 'https://dummyjson.com/' });

type GetAllProducts = (search?: string, skip?: number, limit?: number) => Promise<SearchResult>;
// export const getAllProducts: () => Promise<SearchResult> = () =>
//   fetch('https://dummyjson.com/products').then(res => res.json());

export const getAllProducts: GetAllProducts = async (search, skip, limit = 15) => {
  const response = await api.get('/products', {
    params: { search, skip, limit },
  });

  return response.data;
};

export const searchProducts: (value: string) => Promise<SearchResult> = value =>
  fetch(`https://dummyjson.com/products/search?q=${value}`).then(res => res.json());

export const searchProduct = (value: string) =>
  fetch(`https://dummyjson.com/products/${value}`).then(res => res.json());

const fetcher = (value: number) => fetch(`https://fakestoreapi.com/products?limit=${value}`).then(res => res.json());
