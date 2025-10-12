/**
 * Petanque License Manager
 * Hanterar licensverifiering och årlig re-aktivering
 * 
 * Regler:
 * - Licens måste aktiveras minst en gång per år
 * - Efter 18 månader utan aktivering förfaller licensen
 * - Påminnelse skickas när 11 månader har gått
 */

const LicenseManager = {
    // Konstanter
    MONTHS_BEFORE_WARNING: 11,
    MONTHS_BEFORE_EXPIRY: 18,
    
    /**
     * Kontrollera om licensen är giltig och aktiv
     */
    checkLicense() {
        const licenseKey = localStorage.getItem('petanque_license_key');
        const lastActivation = localStorage.getItem('petanque_last_activation');
        
        if (!licenseKey) {
            return {
                valid: false,
                reason: 'no_license',
                action: 'redirect_to_upload'
            };
        }
        
        if (!lastActivation) {
            // Första gången - sätt aktiveringsdatum
            this.updateActivation();
            return { valid: true };
        }
        
        const monthsSinceActivation = this.getMonthsSince(lastActivation);
        
        // Licensen har gått ut (18+ månader)
        if (monthsSinceActivation >= this.MONTHS_BEFORE_EXPIRY) {
            return {
                valid: false,
                reason: 'expired',
                monthsSince: monthsSinceActivation,
                action: 'redirect_to_expired'
            };
        }
        
        // Varning - snart dags att aktivera (11+ månader)
        if (monthsSinceActivation >= this.MONTHS_BEFORE_WARNING) {
            return {
                valid: true,
                warning: true,
                monthsSince: monthsSinceActivation,
                daysUntilExpiry: this.getDaysUntilExpiry(lastActivation)
            };
        }
        
        // Allt OK
        return {
            valid: true,
            monthsSince: monthsSinceActivation
        };
    },
    
    /**
     * Kontrollera arkivlicens
     */
    checkArchiveLicense() {
        const archiveLicense = localStorage.getItem('petanque_archive_license');
        const lastActivation = localStorage.getItem('petanque_archive_last_activation');
        
        if (!archiveLicense) {
            return {
                valid: false,
                reason: 'no_archive_license',
                action: 'redirect_to_archive_subscription'
            };
        }
        
        if (!lastActivation) {
            this.updateArchiveActivation();
            return { valid: true };
        }
        
        const monthsSinceActivation = this.getMonthsSince(lastActivation);
        
        if (monthsSinceActivation >= this.MONTHS_BEFORE_EXPIRY) {
            return {
                valid: false,
                reason: 'expired',
                monthsSince: monthsSinceActivation,
                action: 'redirect_to_expired'
            };
        }
        
        if (monthsSinceActivation >= this.MONTHS_BEFORE_WARNING) {
            return {
                valid: true,
                warning: true,
                monthsSince: monthsSinceActivation,
                daysUntilExpiry: this.getDaysUntilExpiry(lastActivation)
            };
        }
        
        return {
            valid: true,
            monthsSince: monthsSinceActivation
        };
    },
    
    /**
     * Uppdatera aktiveringsdatum för huvudlicens
     */
    updateActivation() {
        const now = new Date().toISOString();
        localStorage.setItem('petanque_last_activation', now);
        console.log('License activation updated:', now);
    },
    
    /**
     * Uppdatera aktiveringsdatum för arkivlicens
     */
    updateArchiveActivation() {
        const now = new Date().toISOString();
        localStorage.setItem('petanque_archive_last_activation', now);
        console.log('Archive license activation updated:', now);
    },
    
    /**
     * Beräkna antal månader sedan datum
     */
    getMonthsSince(dateString) {
        const then = new Date(dateString);
        const now = new Date();
        
        const yearsDiff = now.getFullYear() - then.getFullYear();
        const monthsDiff = now.getMonth() - then.getMonth();
        
        return yearsDiff * 12 + monthsDiff;
    },
    
    /**
     * Beräkna dagar kvar till licensen går ut
     */
    getDaysUntilExpiry(dateString) {
        const activationDate = new Date(dateString);
        const expiryDate = new Date(activationDate);
        expiryDate.setMonth(expiryDate.getMonth() + this.MONTHS_BEFORE_EXPIRY);
        
        const now = new Date();
        const diffTime = expiryDate - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        return diffDays;
    },
    
    /**
     * Återaktivera licens med Gumroad-verifiering
     */
    async reactivateLicense(licenseKey) {
        try {
            // Verifiera med Gumroad att licensen fortfarande är giltig
            const isValid = await this.verifyWithGumroad(licenseKey);
            
            if (isValid) {
                this.updateActivation();
                return { success: true };
            } else {
                return {
                    success: false,
                    error: 'Licensnyckeln är inte längre giltig'
                };
            }
        } catch (error) {
            console.error('Reactivation error:', error);
            return {
                success: false,
                error: 'Ett fel uppstod vid verifieringen'
            };
        }
    },
    
    /**
     * Återaktivera arkivlicens
     */
    async reactivateArchiveLicense(licenseKey) {
        try {
            const isValid = await this.verifyArchiveWithGumroad(licenseKey);
            
            if (isValid) {
                this.updateArchiveActivation();
                return { success: true };
            } else {
                return {
                    success: false,
                    error: 'Arkivlicensen är inte längre giltig'
                };
            }
        } catch (error) {
            console.error('Archive reactivation error:', error);
            return {
                success: false,
                error: 'Ett fel uppstod vid verifieringen'
            };
        }
    },
    
    /**
     * Verifiera licens med Gumroad API
     */
    async verifyWithGumroad(licenseKey) {
        // ⚠️ DEMO MODE - Ersätt med riktig Gumroad API-anrop
        // I produktion, använd Gumroad License API
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // I produktion, ersätt med:
            /*
            const response = await fetch('https://api.gumroad.com/v2/licenses/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    'product_permalink': 'qfwmvg',
                    'license_key': licenseKey,
                    'increment_uses_count': 'false'
                })
            });
            
            const data = await response.json();
            return data.success && data.purchase.refunded === false && data.purchase.chargebacked === false;
            */
            
            return licenseKey.length >= 10;
        } catch (error) {
            console.error('Gumroad verification error:', error);
            return false;
        }
    },
    
    /**
     * Verifiera arkivlicens med Gumroad API
     */
    async verifyArchiveWithGumroad(licenseKey) {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // I produktion, ersätt med riktig Gumroad API-anrop
            return licenseKey.length >= 10;
        } catch (error) {
            console.error('Archive Gumroad verification error:', error);
            return false;
        }
    },
    
    /**
     * Rensa utgången licens
     */
    clearExpiredLicense() {
        localStorage.removeItem('petanque_license_key');
        localStorage.removeItem('petanque_last_activation');
        localStorage.removeItem('petanque_activation_date');
    },
    
    /**
     * Rensa utgången arkivlicens
     */
    clearExpiredArchiveLicense() {
        localStorage.removeItem('petanque_archive_license');
        localStorage.removeItem('petanque_archive_last_activation');
        localStorage.removeItem('petanque_archive_activation_date');
    },
    
    /**
     * Visa varningsmeddelande för användare
     */
    showWarningBanner(daysLeft) {
        const banner = document.createElement('div');
        banner.id = 'license-warning-banner';
        banner.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
            color: white;
            padding: 15px 20px;
            text-align: center;
            z-index: 10000;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        `;
        
        banner.innerHTML = `
            <strong>⚠️ Viktigt:</strong> Din licens behöver aktiveras inom ${daysLeft} dagar för att fortsätta fungera.
            <a href="aktivera-licens.html" style="color: white; text-decoration: underline; margin-left: 10px; font-weight: 700;">
                Aktivera nu →
            </a>
        `;
        
        document.body.insertBefore(banner, document.body.firstChild);
        
        // Justera body padding för att kompensera för banner
        document.body.style.paddingTop = '60px';
    }
};

// Exportera för användning i andra filer
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LicenseManager;
}
