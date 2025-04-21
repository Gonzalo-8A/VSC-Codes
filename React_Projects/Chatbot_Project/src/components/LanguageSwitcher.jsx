// src/components/LanguageSwitcher.jsx
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang); // Cambiar el estado manualmente
    i18n.changeLanguage(newLang);
  };

  // Si el idioma cambia, fuerza un re-render
  useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);

  return (
    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor="language-select">Idioma: </label>
      <select
        id="language-select"
        onChange={handleLanguageChange}
        value={language}
      >
        <option value="en">🇬🇧 English</option>
        <option value="es">🇪🇸 Español</option>
      </select>
    </div>
  );
}

