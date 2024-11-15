import React from 'react';

function LanguageSwitcher({ switchLanguage }) {
  return (
    <div className="language-switcher">
      <button onClick={() => switchLanguage('en')}>English</button>
      <button onClick={() => switchLanguage('es')}>Español</button>
    </div>
  );
}

export default LanguageSwitcher;
