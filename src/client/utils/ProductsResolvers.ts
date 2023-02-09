import axios from 'axios';
import { SearchResult } from './Type';

const api = axios.create({ baseURL: 'https://dummyjson.com/' });

type GetAllProducts = (search?: string, skip?: number, limit?: number) => Promise<SearchResult>;

export const getAllProducts: GetAllProducts = async (search, skip, limit = 15) => {
  const response = await api.get('/products', {
    params: { search, skip, limit },
  });

  return response.data;
};

export const searchProducts: (value: string) => Promise<SearchResult> = async value => {
  const response = await api.get(`m/products/search?q=${value}`)
  return response.data;
}

export const searchProduct = async (value: string) => {
  const response = await api.get(`/products/${value}`)
  return response.data;
}


