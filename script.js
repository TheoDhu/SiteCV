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

  let currentLang = navigator.language.startsWith("fr") ? "fr" : "en";
  let texts = {};

  fetch(`lang/${currentLang}.json`)
    .then(response => response.json())
    .then(data => {
      texts = data;
      setLanguage(currentLang);
    });

  // Changement de langue au clic
  const langToggle = document.getElementById("lang-toggle");
  langToggle.addEventListener("click", () => {
    currentLang = currentLang === "fr" ? "en" : "fr";
    fetch(`lang/${currentLang}.json`)
      .then(response => response.json())
      .then(data => {
        texts = data;
        setLanguage(currentLang);
        langToggle.textContent = currentLang.toUpperCase();
      });
  });

});
