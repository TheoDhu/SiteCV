document.addEventListener('DOMContentLoaded', function() {
  // --- Onglets ---
  const tabLinks = document.querySelectorAll('.tab-link');
  const tabContents = document.querySelectorAll('.tab-content');

  tabLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const tabId = link.getAttribute('data-tab');

      tabLinks.forEach(l => l.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      link.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });

  // --- Thème ---
  const themeToggle = document.getElementById("theme-toggle");
  if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
    document.body.classList.add('dark-mode');
  }
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });

  // --- Langue ---
  let currentLang = navigator.language.startsWith("fr") ? "fr" : "en";
  let texts = {};

  // Fonction pour appliquer la langue aux éléments
  function setLanguage(lang) {
    for (const id in texts) {
      const element = document.getElementById(id);
      if(element) {
        element.textContent = texts[id];
      }
    }
  }

  // Charger le JSON correspondant à la langue actuelle
  function loadLanguage(lang) {
    fetch(`lang/${lang}.json`)
      .then(response => response.json())
      .then(data => {
        texts = data;
        setLanguage(lang);
        const langToggle = document.getElementById("lang-toggle");
        if(langToggle) langToggle.textContent = lang.toUpperCase();
      })
      .catch(err => console.error(`Erreur chargement langue ${lang}:`, err));
  }

  // Initialisation
  loadLanguage(currentLang);

  // Changement de langue au clic
  const langToggle = document.getElementById("lang-toggle");
  if(langToggle) {
    langToggle.addEventListener("click", () => {
      currentLang = currentLang === "fr" ? "en" : "fr";
      loadLanguage(currentLang);
    });
  }
});