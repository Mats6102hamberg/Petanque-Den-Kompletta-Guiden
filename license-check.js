// License verification script - Include this in all protected pages
(function() {
    'use strict';
    
    // Check if user has a valid license key
    function checkLicenseAccess() {
        const licenseKey = localStorage.getItem('petanque_license_key');
        
        // If no license key found, redirect to activation page
        if (!licenseKey) {
            // Store the current page URL so we can return after activation
            sessionStorage.setItem('petanque_return_url', window.location.pathname + window.location.search);
            
            // Determine the correct path to upload.html based on current location
            const currentPath = window.location.pathname;
            let uploadPath = '/upload.html';
            
            // If we're in a subdirectory (e.g., /en/, /de/), adjust the path
            if (currentPath.includes('/en/')) {
                uploadPath = '/en/upload.html';
            } else if (currentPath.includes('/de/')) {
                uploadPath = '/de/upload.html';
            } else if (currentPath.includes('/fr/')) {
                uploadPath = '/fr/upload.html';
            } else if (currentPath.includes('/es/')) {
                uploadPath = '/es/upload.html';
            } else if (currentPath.includes('/th/')) {
                uploadPath = '/th/upload.html';
            }
            
            window.location.href = uploadPath;
            return false;
        }
        
        return true;
    }
    
    // Run check immediately when script loads
    if (!checkLicenseAccess()) {
        // Prevent page content from showing by hiding body
        document.documentElement.style.display = 'none';
    }
})();
