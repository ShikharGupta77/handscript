import Card from "./../../components/card.js"
import learnContent from "./content"

function Learn () {
    return <section className="learn">
        {learnContent.map((body) => <Card header={body.header} content={body.content} imageUrl={body.imageUrl}/>)}    
    </section>
}

export default Learn;