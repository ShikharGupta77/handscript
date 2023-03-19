import Card from "./../../components/card.js"
import aboutContent from "./content"

function About () {
    return (
        <section className="about">
            {aboutContent.map((body) => <Card header={body.header} content={body.content} imageUrl={body.imageUrl}/>)}   
        </section>
    );
}

export default About;