import { useState, useEffect } from 'react'
import { CORE_CONCEPTS } from "./data.js";
import CoreConcepts from './components/CoreConcepts/CoreConcepts.jsx';
import  Header  from "./components/Header/Header.jsx";
import TabButton from './components/TabButton/TabButton.jsx';
import "./App.css";

function App() {
  const [tabContent, setTabContent] = useState("Por favor, pulse un botón del menú");
  
  useEffect(() => {
    window.scrollTo({
      top: 80,
      behavior: 'auto' // sin animación
    });
  }, []);

  function handleClickMenu(selectedButton) {
    setTabContent(selectedButton)
  }

  function TabContent({ selectedTab }) {
    return <div>{selectedTab}</div>;
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
          <TabButton onClick={() => handleClickMenu("Componentes")}>Componentes</TabButton>
          <TabButton onClick={() => handleClickMenu("JSX")}>JSX</TabButton>
          <TabButton onClick={() => handleClickMenu("Props")}>Props</TabButton>
          <TabButton onClick={() => handleClickMenu("Estados")}>Estados</TabButton>
        </menu>
        <TabContent selectedTab={tabContent} />
      </section>

      {/* <main>
        <h2></h2>
      </main> */}
    </div>
  );
}

export default App;
