import './CoreConcepts.css'

export default function CoreConcepts({imagePath, title, description}) {
  return (
    <div className="coreConceptsCard">
      <img src={imagePath} alt="..." />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}