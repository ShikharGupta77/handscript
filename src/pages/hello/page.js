import "./page.css"
import { ArrowForwardIcon } from '@chakra-ui/icons'
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import { useState, useEffect} from 'react';


function Hello () {
    const [offsetsTop, setOffsetsTop] = useState([false, false, false, false, false]);
    const showThreshold = 0.15;

    useEffect(() => {
        const handleScroll = () => {
            const h1s = Object.entries(document.getElementsByTagName("h1"));
            const mapped = h1s.map((tag) => ((((tag[1].offsetTop - window.scrollY)/window.innerHeight)) < showThreshold));
            console.log(mapped);
            setOffsetsTop(mapped);
        }
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [offsetsTop]);


    return (<>
    <div className="hello-container">
        <h1>
            <span className="highlight">Hello,</span><br/>
            from a <span className="color">silent</span> world.
        </h1>
        <form action="/translate">
            <button className="hello__button">Try it out</button>
        </form>

        <div className="arrow bounce" style={{ opacity: offsetsTop[1] ? "0%" : "100%", transition: "opacity 0.3s" }}></div>

        <Zoom when={offsetsTop[1]} duration={500}>
            <h1>
                <span className="highlight color">70 million+</span><br/>
                people are deaf in the world
            </h1>
        </Zoom>

        <Zoom when={offsetsTop[2]} duration={500}>
            <h1>
                <span className="highlight color">&lt; 1%</span><br/>
                of non-deaf people know ASL
            </h1>
        </Zoom>
        <Zoom when={offsetsTop[3]} duration={500}>
            <h1>
                <span className="highlight color">0</span><br/>
                free services exist for ASL to text
            </h1>
        </Zoom>
        <Zoom when={offsetsTop[4]} duration={500}>
            <h1>
                <span className="highlight color">Introducing HandScript</span><br/>
                A web app to convert ASL to text
            </h1>
        </Zoom>
        
    </div>


    <div className="wave"></div>
    <div className="wave"></div>
    <div className="wave"></div>
    </>);
}

export default Hello;