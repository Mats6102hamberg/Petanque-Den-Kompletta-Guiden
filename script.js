// Till-toppen-knapp
document.addEventListener('DOMContentLoaded', function() {
    // Skapa till-toppen-knapp
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑';
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Tillbaka till toppen');
    document.body.appendChild(backToTopButton);
    
    // Skapa mörkt läge-knapp
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '🌙';
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.setAttribute('aria-label', 'Växla mörkt läge');
    document.body.appendChild(darkModeToggle);
    
    // Visa/dölj till-toppen-knapp vid scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Scrolla till toppen vid klick
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Mörkt läge funktionalitet
    // Kolla om användaren har sparat preferens
    const darkModePreference = localStorage.getItem('darkMode');
    if (darkModePreference === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '☀️';
    }
    
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            darkModeToggle.innerHTML = '☀️';
            localStorage.setItem('darkMode', 'enabled');
        } else {
            darkModeToggle.innerHTML = '🌙';
            localStorage.setItem('darkMode', 'disabled');
        }
    });
    
    // License check for premium content
    function checkPremiumAccess() {
      if (!PetanqueLicense.hasPremiumAccess()) {
        // Show popup if trying to access locked chapter
        if (typeof showPremiumPopup === 'function') {
          showPremiumPopup();
        }
        return false;
      }
      return true;
    }

    // Call this on chapter pages
    if (window.location.pathname.includes('kapitel')) {
      checkPremiumAccess();
    }
});
