document.addEventListener('DOMContentLoaded', function() {
  const tabLinks = document.querySelectorAll('.tab-link');
  const tabContents = document.querySelectorAll('.tab-content');

  tabLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const tabId = link.getAttribute('data-tab');

      tabLinks.forEach(link => link.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      link.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });
});
