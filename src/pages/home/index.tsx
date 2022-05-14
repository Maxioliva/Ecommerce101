import { getAssetUrl } from '../../utils/config';
import './style.scss';

const Home = () => (
  <div className="home">
    <div className="home__section">
      <img src={getAssetUrl('./placeholders/firebaseReact.png')} alt="section1" />
      <img src={getAssetUrl('./placeholders/webpack.png')} alt="section2" />
      <img src={getAssetUrl('./placeholders/firebaseReact.png')} alt="section1" />
      <img src={getAssetUrl('./placeholders/webpack.png')} alt="section2" />
      <img src={getAssetUrl('./placeholders/firebaseReact.png')} alt="section1" />
      <img src={getAssetUrl('./placeholders/firebaseReact.png')} alt="section1" />
      <img src={getAssetUrl('./placeholders/webpack.png')} alt="section2" />
      <img src={getAssetUrl('./placeholders/firebaseReact.png')} alt="section1" />
    </div>
  </div>
);
export default Home;
