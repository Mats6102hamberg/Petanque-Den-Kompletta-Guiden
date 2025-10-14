// Simple License Check for Pétanque Guide
// Checks if user has premium access

(function() {
    'use strict';
    
    // Check if user has premium license
    function hasValidLicense() {
        const licenseKey = localStorage.getItem('petanque_premium_key');
        return licenseKey && licenseKey.length > 0;
    }
    
    // Redirect to purchase page if no license
    function requirePremium() {
        if (!hasValidLicense()) {
            // Save current page to return after purchase
            sessionStorage.setItem('petanque_return_url', window.location.href);
            window.location.href = 'kop.html';
        }
    }
    
    // Show premium content only if licensed
    function showPremiumContent(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            if (hasValidLicense()) {
                element.style.display = 'block';
            } else {
                element.style.display = 'none';
            }
        }
    }
    
    // Hide premium content and show upgrade message
    function hidePremiumContent(elementId, upgradeMessage) {
        const element = document.getElementById(elementId);
        if (element && !hasValidLicense()) {
            element.innerHTML = `
                <div style="text-align: center; padding: 60px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px; color: white;">
                    <h2 style="color: white; margin-bottom: 20px;">🔒 Premium-innehåll</h2>
                    <p style="font-size: 18px; margin-bottom: 30px;">${upgradeMessage || 'Detta innehåll kräver Premium-access'}</p>
                    <a href="kop.html" style="display: inline-block; background: white; color: #667eea; padding: 15px 40px; border-radius: 5px; text-decoration: none; font-weight: 700; font-size: 18px;">
                        Uppgradera till Premium →
                    </a>
                </div>
            `;
        }
    }
    
    // Export functions
    window.PetanqueLicense = {
        hasValidLicense: hasValidLicense,
        requirePremium: requirePremium,
        showPremiumContent: showPremiumContent,
        hidePremiumContent: hidePremiumContent
    };
    
})();
