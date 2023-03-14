import { getAssetUrl } from '../../../utils/config';
import Slider from '../../atoms/slider';
import './style.scss';

const Home = () => (
  <div className="home">
    <Slider />
    <div className="home__section">
      <img src={getAssetUrl('./homepage/ecommerce.jpg')} alt="section1" />
      <img src={getAssetUrl('./placeholders/firebaseReact.png')} alt="section1" />
      <img src={getAssetUrl('./placeholders/webpack.png')} alt="section2" />
    </div>
  </div>
);
export default Home;
