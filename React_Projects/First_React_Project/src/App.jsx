import { useState, useEffect, useRef } from 'react'
import { CORE_CONCEPTS, EXAMPLES } from "./data.js";
import CoreConcepts from './components/CoreConcepts/CoreConcepts.jsx';
import  Header  from "./components/Header/Header.jsx";
import TabButton from './components/TabButton/TabButton.jsx';
import TabContent from './components/TabContent/TabContent.jsx';
import "./App.css";

function App() {
  const [selectedTopic, setTabContent] = useState("default");
  const contentRef = useRef(null)
  
  useEffect(() => {
    window.scrollTo({
      top: 80,
      behavior: 'auto' // sin animación
    });
  }, []);

  useEffect(() => {
    if (selectedTopic && contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedTopic]);

  function handleClickMenu(selectedButton) {
    setTabContent(selectedButton)
  }
  
  return (
    <div>
      <Header />

      <section id="coreConcepts">
        <h2>Principales Características</h2>
        <div id="coreConceptsCards">
          <CoreConcepts {...CORE_CONCEPTS[0]}/>
          <CoreConcepts {...CORE_CONCEPTS[1]}/>
          <CoreConcepts {...CORE_CONCEPTS[2]}/>
          <CoreConcepts {...CORE_CONCEPTS[3]}/>
        </div>
      </section>

      <section id='reactExamples'>
        <h2>Ejemplos React</h2>
        <menu>
          <TabButton onClick={() => handleClickMenu("components")}>Componentes</TabButton>
          <TabButton onClick={() => handleClickMenu("jsx")}>JSX</TabButton>
          <TabButton onClick={() => handleClickMenu("props")}>Props</TabButton>
          <TabButton onClick={() => handleClickMenu("state")}>Estados</TabButton>
        </menu>
          <TabContent selectedTopic={selectedTopic}/>
        {/* <div id='tab-content' className={selectedTopic==='default' ? 'centered' : 'left'} ref={contentRef}>
          <h3>{EXAMPLES[selectedTopic].title}</h3>
          <p>{EXAMPLES[selectedTopic].description}</p>
          <pre>
            <code>
            {EXAMPLES[selectedTopic].code}
            </code>
          </pre>
        </div> */}
      </section>

      {/* <main>
        <h2></h2>
      </main> */}
    </div>
  );
}

export default App;
