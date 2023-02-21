import { getAssetUrl } from '../../../utils/config';
import './style.scss';
import Fede from '../../../utils/test';

const Home = () => (
  <div className="home">
    <div className="home__section">
      <img src={getAssetUrl('./homepage/ecommerce.jpg')} alt="section1" />
      <img src={getAssetUrl('./placeholders/firebaseReact.png')} alt="section1" />
      <img src={getAssetUrl('./placeholders/webpack.png')} alt="section2" />
      <Fede />
    </div>
  </div>
);
export default Home;
