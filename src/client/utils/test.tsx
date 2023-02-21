import { gql, useQuery } from '@apollo/client';

const HELLO_QUERY = gql`
  query {
    fede
  }
`;

const Fede = () => {
  const { loading, error, data } = useQuery(HELLO_QUERY);
  console.log('1', data);
  if (loading) {
    return <p>Cargando...</p>;
  }
  if (error) {
    return <p>Error :(</p>;
  }
  return <p> {data.fede}</p>;
};

export default Fede;
