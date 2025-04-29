import { useState, useEffect, useRef } from 'react'
import { CORE_CONCEPTS, EXAMPLES } from "./data.js";
import CoreConcepts from './components/CoreConcepts/CoreConcepts.jsx';
import  Header  from "./components/Header/Header.jsx";
import TabButton from './components/TabButton/TabButton.jsx';
import TabContent from './components/TabContent/TabContent.jsx';
import "./App.css";

function App() {
  const [selectedTopic, setSelectedTopic] = useState("default");
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
    setSelectedTopic(selectedButton)
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
          <TabButton isSelected={selectedTopic === 'components'} onClick={() => handleClickMenu("components")}>Componentes</TabButton>
          <TabButton isSelected={selectedTopic === 'jsx'} onClick={() => handleClickMenu("jsx")}>JSX</TabButton>
          <TabButton isSelected={selectedTopic === 'props'} onClick={() => handleClickMenu("props")}>Props</TabButton>
          <TabButton isSelected={selectedTopic === 'state'} onClick={() => handleClickMenu("state")}>Estados</TabButton>
        </menu>
          <TabContent selectedTopic={selectedTopic}/>
      </section>

      {/* <main>
        <h2></h2>
      </main> */}
    </div>
  );
}

export default App;
