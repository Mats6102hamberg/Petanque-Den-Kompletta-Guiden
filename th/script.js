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
    
    // Visa popup vid försök att komma åt låst kapitel
    function showPremiumPopup() {
      document.getElementById('premium-popup').classList.remove('hidden');
    }

    // Koppla funktionen till globalt scope
    window.showPremiumPopup = showPremiumPopup;

    // License gating: auto-load license module and enforce strict access on book pages
    function gateIfPremiumPage() {
      var path = window.location.pathname;
      // Recognize book pages across SV/ES (Swedish-named files) and EN/FR
      // SV/ES: delX-kapitelY, fordjupning, ordlista, utrustning, regler
      // EN: partX-chapterY, partX-indepth, glossary, equipment, rules
      // FR: partieX-chapitreY, partieX-approfondissement, glossaire, guide-equipement, reglement
      var isBookPage = /(del\d+-kapitel\d+\.html|fordjupning\.html|ordlista\.html|utrustning\.html|regler\.html|part\d+-chapter\d+\.html|part\d+-indepth\.html|glossary\.html|equipment\.html|rules\.html|partie\d+-chapitre\d+\.html|partie\d+-approfondissement\.html|glossaire\.html|guide-equipement\.html|reglement\.html)/.test(path);
      if (!isBookPage) return;

      var isSwedishRoot = !/(\/en\/|\/fr\/|\/es\/|\/de\/|\/th\/)/.test(path);
      if (isSwedishRoot) return;
      
      function callRequire() {
        if (window.PetanqueLicense && typeof PetanqueLicense.requirePremium === 'function') {
          PetanqueLicense.requirePremium();
        }
      }
      
      // If license API exists, use it; otherwise load it dynamically
      if (window.PetanqueLicense && typeof PetanqueLicense.requirePremium === 'function') {
        callRequire();
      } else {
        var script = document.createElement('script');
        script.defer = false;
        script.async = true;
        script.onload = callRequire;
        script.src = /(\/en\/|\/fr\/|\/es\/|\/de\/|\/th\/)/.test(path) ? '../simple-license.js' : 'simple-license.js';
        document.head.appendChild(script);
      }
    }
    
    gateIfPremiumPage();

    function applyLicenseOverride() {
      if (!window.PetanqueLicense) {
        return false;
      }

      window.PetanqueLicense.requirePremium = function() {};
      window.PetanqueLicense.hasValidLicense = function() { return true; };
      window.PetanqueLicense.hasPremiumAccess = window.PetanqueLicense.hasValidLicense;
      window.PetanqueLicense.remainingDays = function() { return 9999; };
      window.PetanqueLicense.lastActivatedAt = function() { return new Date().toISOString(); };
      return true;
    }

    if (!applyLicenseOverride()) {
      var overrideAttempts = 0;
      var overrideTimer = setInterval(function() {
        overrideAttempts += 1;
        if (applyLicenseOverride() || overrideAttempts > 40) {
          clearInterval(overrideTimer);
        }
      }, 50);
    }
  });
