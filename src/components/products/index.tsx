import { useEffect, useState } from 'react';
import { Badge, Box, Button, ChakraProvider } from '@chakra-ui/react';
import axios from 'axios';
import './style.scss';

const Products = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://fakestoreapi.com/products',
      // eslint-disable-next-line promise/prefer-await-to-then
    }).then(res => {
      // eslint-disable-next-line no-undef
      console.log(res.data);
      setData(res.data);
    });
  }, []);

  return (
    <ChakraProvider>
      <div>
        <Box>
          <ul className="products-container">
            {data.map((product: any) => (
              <div key={product.id} className="card">
                <div className="img">
                  <img src={product.image} alt={product.image} />
                </div>
                <div>
                  <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                    {product.title}
                  </Box>
                  <Badge borderRadius="full" px="2" colorScheme="teal">
                    New
                  </Badge>
                  <Box>{`Price: ${product.price}`}</Box>
                  <h6>{`Category: ${product.category}`}</h6>
                  <Button colorScheme="blue">Add to Cart</Button>
                </div>
              </div>
            ))}
          </ul>
        </Box>
      </div>
    </ChakraProvider>
  );
};
export default Products;
