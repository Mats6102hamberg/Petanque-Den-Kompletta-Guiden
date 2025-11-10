// Simple License Check for Pétanque Guide
// Checks if user has premium access

(function() {
    'use strict';
    
    // Check if user has premium license
    function hasValidLicense() {
        let licenseKey = localStorage.getItem('petanque_premium_key');

        // Backwards compatibility: accept older storage keys and migrate them
        if (!licenseKey || licenseKey.length === 0) {
            const legacyKeys = [
                'petanque_license_key',
                'petanque_premium_license',
                'petanque_full_access_key'
            ];

            for (let i = 0; i < legacyKeys.length; i++) {
                const legacyValue = localStorage.getItem(legacyKeys[i]);
                if (legacyValue && legacyValue.length > 0) {
                    licenseKey = legacyValue;
                    localStorage.setItem('petanque_premium_key', licenseKey);
                    break;
                }
            }
        }

        return licenseKey && licenseKey.length > 0;
    }

    function isLocalEnvironment() {
        const protocol = window.location.protocol;
        if (protocol === 'file:') {
            return true;
        }

        const host = window.location.hostname;
        return host === 'localhost' || host === '127.0.0.1';
    }
    
    // Strict access: DISABLED for Swedish book
    function requirePremium() {
        // This function now does nothing
        return;
    }
    
    // Add preview overlay to lock content
    function addPreviewOverlay() {
        const content = document.querySelector('.content');
        if (!content) return;
        
        // Create overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: relative;
            margin-top: 40px;
            padding: 60px 40px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 15px;
            text-align: center;
            color: white;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        `;
        
        overlay.innerHTML = `
            <div style="max-width: 600px; margin: 0 auto;">
                <h2 style="color: white; font-size: 32px; margin-bottom: 20px;">🔒 Premium-innehåll</h2>
                <p style="font-size: 18px; line-height: 1.6; margin-bottom: 30px;">
                    Du har läst förhandsgranskningen! För att fortsätta läsa detta kapitel och få tillgång till allt premium-innehåll, uppgradera till Premium.
                </p>
                <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; margin-bottom: 30px;">
                    <h3 style="color: white; margin-bottom: 15px;">✨ Med Premium får du:</h3>
                    <ul style="list-style: none; padding: 0; text-align: left; max-width: 400px; margin: 0 auto;">
                        <li style="padding: 8px 0; font-size: 16px;">✓ Kapitel 4-15 (Fullständigt innehåll)</li>
                        <li style="padding: 8px 0; font-size: 16px;">✓ Alla bilagor och guider</li>
                        <li style="padding: 8px 0; font-size: 16px;">✓ Exklusiva artiklar med videolänkar</li>
                        <li style="padding: 8px 0; font-size: 16px;">✓ Framtida uppdateringar</li>
                        <li style="padding: 8px 0; font-size: 16px;">✓ Spara 50+ timmar research</li>
                    </ul>
                </div>
                <a href="kop.html" style="display: inline-block; background: white; color: #667eea; padding: 18px 50px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 20px; box-shadow: 0 5px 20px rgba(0,0,0,0.2); transition: all 0.3s ease;">
                    Uppgradera till Premium från 149 kr →
                </a>
                <p style="margin-top: 20px; font-size: 14px; opacity: 0.9;">
                    Välj ditt eget pris • Swish eller Gumroad
                </p>
            </div>
        `;
        
        // Add blur effect to remaining content
        const allElements = content.children;
        let previewCount = 0;
        const maxPreviewElements = 5; // Show first 5 elements (usually 2-3 paragraphs)
        
        for (let i = 0; i < allElements.length; i++) {
            if (previewCount >= maxPreviewElements) {
                allElements[i].style.filter = 'blur(8px)';
                allElements[i].style.opacity = '0.3';
                allElements[i].style.pointerEvents = 'none';
                allElements[i].style.userSelect = 'none';
            }
            previewCount++;
        }
        
        // Insert overlay after preview content
        if (allElements.length > maxPreviewElements) {
            allElements[maxPreviewElements].parentNode.insertBefore(overlay, allElements[maxPreviewElements]);
        } else {
            content.appendChild(overlay);
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
        // Backwards compatibility: some pages call hasPremiumAccess()
        hasPremiumAccess: hasValidLicense,
        requirePremium: requirePremium,
        showPremiumContent: showPremiumContent,
        hidePremiumContent: hidePremiumContent
    };
    
})();
