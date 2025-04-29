import { useEffect, useRef } from "react";
import { EXAMPLES } from "../../data.js";
import "./TabContent.css";

export default function TabContent({ selectedTopic }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (selectedTopic && contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedTopic]);

  const content = EXAMPLES[selectedTopic];

  return (
    <div
      id="tab-content"
      className={selectedTopic === "default" ? "centered" : "left"}
      ref={contentRef}
    >
      <h3>{content ? content.title : "Selecciona una opción"}</h3>
      {content && content.description && <p>{content.description}</p>}
      {content && content.code && (
        <pre>
          <code>{content.code}</code>
        </pre>
      )}
    </div>
  );
}
