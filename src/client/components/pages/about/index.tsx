import releaseChanges from './changes';
import './style.scss';

const About = () => (
  <div className="about">
    <h1 className="about__title">About</h1>
    <p className="about__description">
      ANYMA is an ecommerce project with educational purposes and is being mantained respecting the latest code
      conventions and EcmaScript updates. This responsive single page application is being
      <b> written</b> in javascript + sass, <b> enforced</b> by typescript + ESLint + prettier, <b> bundled</b> by
      webpack, <b> powered</b> by react + firebase and <b> served</b> by render.
    </p>
    <h3 className="about__current-version">Current version: {releaseChanges[0].version}</h3>
    <ul className="about__releases">
      {releaseChanges.map(({ version, date, changeLog }) => (
        <li className="about__release" key={version}>
          <h4 className="about__version-and-date">{`[${version}] - ${date}`}</h4>
          <ul className="about__notes">
            {changeLog.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  </div>
);

export default About;
