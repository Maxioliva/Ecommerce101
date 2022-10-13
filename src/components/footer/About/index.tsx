import './style.scss';

const changes = [{
    releaseDate: "25/09/2022",
    version: "1.2.0",
    changeLog: ["Add new addressBook feature", "Add profile page", "Fix issue with login resolver", "Update form styles"],
},
{
    releaseDate: "25/09/2022",
    version: "1.2.1",
    changeLog: ["Add about page", "New Checkout and payment", "Clean Code", "Create OSP (Order Success Page)", "Create loading indicator", "Addresses Book Frontend part"],
}]

const About = () => (
    <div className="about">
        <h1 className="about__title" >About Us</h1>
        <h2 className="about__h2">Maigni-Shop is a shop-eccomerce frontend project with educational pourposes. This is a responsive single page application **written** in javascript + sass, **enforced** by typescript + ESLint + prettier, **bundled** by webpack, **powered** by react + firebase and *served** by netlify.
            Maigni-Shop is being mantained respecting the latest code conventions and EcmaScript updates.</h2>
        <ul className="about__ul">
            {changes.map((c) => (
                <li key={c.version} className="about__li">
                    <h6>----------------------------------------------------------------------------------------------------------</h6>
                    <h4>Release date: {c.releaseDate}</h4>
                    <h4>Version: {c.version}</h4>
                    <h5>Changelog: </h5>
                    {c.changeLog.map((cambio, i) => (
                        <div key={i}>{cambio}</div>
                    ))}

                </li>
            ))}
        </ul>
    </div>
);

export default About;
