/**
 * Pétanque Guide Chatbot
 * Intelligent chatbot för att svara på vanliga frågor
 */

class PetanqueChatbot {
    constructor() {
        this.isOpen = false;
        this.conversationHistory = [];
        this.init();
    }

    init() {
        this.createChatbotHTML();
        this.attachEventListeners();
        this.loadKnowledgeBase();
    }

    createChatbotHTML() {
        const chatbotHTML = `
            <div id="petanque-chatbot" class="chatbot-container">
                <!-- Chat Button -->
                <button id="chatbot-toggle" class="chatbot-toggle" aria-label="Öppna chatbot">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <span class="chatbot-badge">1</span>
                </button>

                <!-- Chat Window -->
                <div id="chatbot-window" class="chatbot-window" style="display: none;">
                    <div class="chatbot-header">
                        <div class="chatbot-header-info">
                            <div class="chatbot-avatar">🎾</div>
                            <div>
                                <div class="chatbot-title">Pétanque Assistent</div>
                                <div class="chatbot-status">
                                    <span class="status-dot"></span>
                                    Online
                                </div>
                            </div>
                        </div>
                        <button id="chatbot-close" class="chatbot-close-btn" aria-label="Stäng chatbot">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>

                    <div id="chatbot-messages" class="chatbot-messages">
                        <div class="chatbot-message bot-message">
                            <div class="message-avatar">🎾</div>
                            <div class="message-content">
                                <p>Hej! 👋 Jag är din Pétanque-assistent!</p>
                                <p>Jag kan hjälpa dig med frågor om:</p>
                                <div class="quick-replies">
                                    <button class="quick-reply" data-question="pris">💰 Priser</button>
                                    <button class="quick-reply" data-question="klubbpaket">🏛️ Klubbpaket</button>
                                    <button class="quick-reply" data-question="appar">📱 Appar</button>
                                    <button class="quick-reply" data-question="licens">🔑 Licensfrågor</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="chatbot-input-container">
                        <input 
                            type="text" 
                            id="chatbot-input" 
                            class="chatbot-input" 
                            placeholder="Skriv din fråga här..."
                            autocomplete="off"
                        >
                        <button id="chatbot-send" class="chatbot-send-btn" aria-label="Skicka meddelande">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </button>
                    </div>

                    <div class="chatbot-footer">
                        Drivs av Pétanque Guide AI
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    attachEventListeners() {
        const toggleBtn = document.getElementById('chatbot-toggle');
        const closeBtn = document.getElementById('chatbot-close');
        const sendBtn = document.getElementById('chatbot-send');
        const input = document.getElementById('chatbot-input');

        toggleBtn.addEventListener('click', () => this.toggleChat());
        closeBtn.addEventListener('click', () => this.toggleChat());
        sendBtn.addEventListener('click', () => this.sendMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Quick replies
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-reply')) {
                const question = e.target.dataset.question;
                this.handleQuickReply(question);
            }
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        const window = document.getElementById('chatbot-window');
        const badge = document.querySelector('.chatbot-badge');
        
        if (this.isOpen) {
            window.style.display = 'flex';
            if (badge) badge.style.display = 'none';
            setTimeout(() => {
                document.getElementById('chatbot-input').focus();
            }, 100);
        } else {
            window.style.display = 'none';
        }
    }

    async sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        
        if (!message) return;

        this.addMessage(message, 'user');
        this.conversationHistory.push({ role: 'user', content: message });
        input.value = '';

        // Show typing indicator
        this.showTypingIndicator();
        
        try {
            // Call AI backend
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                    conversationHistory: this.conversationHistory
                })
            });

            if (!response.ok) {
                throw new Error('Failed to get AI response');
            }

            const data = await response.json();
            
            this.hideTypingIndicator();
            this.addMessage(data.response, 'bot');
            this.conversationHistory.push({ role: 'assistant', content: data.response });

            // Keep conversation history manageable
            if (this.conversationHistory.length > 12) {
                this.conversationHistory = this.conversationHistory.slice(-12);
            }

        } catch (error) {
            console.error('Chatbot error:', error);
            this.hideTypingIndicator();
            
            // Fallback to knowledge base if AI fails
            const fallbackResponse = this.getResponse(message);
            this.addMessage(fallbackResponse.text, 'bot', fallbackResponse.quickReplies);
        }
    }

    addMessage(text, sender, quickReplies = null) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageHTML = `
            <div class="chatbot-message ${sender}-message">
                ${sender === 'bot' ? '<div class="message-avatar">🎾</div>' : ''}
                <div class="message-content">
                    <p>${text}</p>
                    ${quickReplies ? this.createQuickReplies(quickReplies) : ''}
                </div>
            </div>
        `;
        
        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    createQuickReplies(replies) {
        const buttons = replies.map(reply => 
            `<button class="quick-reply" data-question="${reply.action}">${reply.label}</button>`
        ).join('');
        
        return `<div class="quick-replies">${buttons}</div>`;
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatbot-messages');
        const typingHTML = `
            <div class="chatbot-message bot-message typing-indicator" id="typing-indicator">
                <div class="message-avatar">🎾</div>
                <div class="message-content">
                    <div class="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        `;
        messagesContainer.insertAdjacentHTML('beforeend', typingHTML);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) indicator.remove();
    }

    handleQuickReply(question) {
        const responses = {
            'pris': 'Vad vill du veta om priser?',
            'klubbpaket': 'Klubbpaketet kostar 1,999 kr + 20 kr/mån per app. Vill du veta mer?',
            'appar': 'Vi har 3 appar: Tränings-Appen, BoulePRO Turneringar och Faktura Snap. Vilken vill du veta mer om?',
            'licens': 'Vad vill du veta om licenser och aktivering?'
        };

        this.addMessage(responses[question] || 'Hur kan jag hjälpa dig?', 'bot');
    }

    loadKnowledgeBase() {
        this.knowledgeBase = {
            // Priser
            'pris|kostnad|betala|kostar': {
                text: '💰 <strong>Priser:</strong><br><br>' +
                      '📚 <strong>Boken:</strong> 299 kr (engångsbetalning)<br>' +
                      '🏛️ <strong>Klubbpaket:</strong> 1,999 kr + 60 kr/mån<br>' +
                      '📱 <strong>Appar (individuellt):</strong><br>' +
                      '• Tränings-Appen: 99 kr/mån (50% rabatt för bokköpare)<br>' +
                      '• BoulePRO: 149 kr/mån (50% rabatt)<br>' +
                      '• Faktura Snap: 199 kr/mån (50% rabatt)<br><br>' +
                      '📚 <strong>Arkiv:</strong> 499 kr/mån',
                quickReplies: [
                    { label: '🏛️ Mer om Klubbpaket', action: 'klubbpaket' },
                    { label: '📱 Mer om Appar', action: 'appar' }
                ]
            },

            // Klubbpaket
            'klubb|förening|klubbpaket': {
                text: '🏛️ <strong>Klubbpaket - Perfekt för föreningar!</strong><br><br>' +
                      '<strong>Vad ingår:</strong><br>' +
                      '✅ 10 böcker till styrelsen (2,990 kr värde)<br>' +
                      '✅ Tränings-Appen (20 kr/mån)<br>' +
                      '✅ BoulePRO Turneringar (20 kr/mån)<br>' +
                      '✅ Faktura Snap (20 kr/mån)<br><br>' +
                      '<strong>Pris:</strong> 1,999 kr + 60 kr/mån<br>' +
                      '<strong>Spara:</strong> 6,251 kr första året! (70% rabatt)<br><br>' +
                      '🎁 <strong>Första 50 klubbarna:</strong> 500 kr extra rabatt!',
                quickReplies: [
                    { label: '📋 Se FAQ', action: 'faq' },
                    { label: '💬 Kontakta oss', action: 'kontakt' }
                ]
            },

            // Appar
            'app|träning|turnering|faktura': {
                text: '📱 <strong>Våra Appar:</strong><br><br>' +
                      '🎯 <strong>Tränings-Appen</strong><br>' +
                      'Strukturerade träningsprogram och utvecklingsplaner<br>' +
                      '99 kr/mån (ordinarie 199 kr/mån)<br><br>' +
                      '🏆 <strong>BoulePRO Turneringar</strong><br>' +
                      'Organisera turneringar, anmälningar och resultat<br>' +
                      '149 kr/mån (ordinarie 299 kr/mån)<br><br>' +
                      '📄 <strong>Faktura Snap</strong><br>' +
                      'Automatisk fakturering och medlemsregister<br>' +
                      '199 kr/mån (ordinarie 399 kr/mån)<br><br>' +
                      '💡 <strong>Paketpris:</strong> Alla 3 för 349 kr/mån',
                quickReplies: [
                    { label: '🏛️ Klubbpaket', action: 'klubbpaket' },
                    { label: '💰 Priser', action: 'pris' }
                ]
            },

            // Licens
            'licens|aktivera|nyckel': {
                text: '🔑 <strong>Licensfrågor:</strong><br><br>' +
                      '✅ Livstidsåtkomst till boken<br>' +
                      '✅ Årlig aktivering krävs (gratis)<br>' +
                      '✅ Efter 18 månader utan aktivering går licensen ut<br>' +
                      '✅ Påminnelser skickas efter 11, 15 och 17 månader<br><br>' +
                      '<strong>Aktivera licens:</strong><br>' +
                      '1. Gå till aktivera-licens.html<br>' +
                      '2. Ange din licensnyckel<br>' +
                      '3. Klicka på "Aktivera"<br><br>' +
                      'Licensnyckeln hittar du i emailet från Gumroad.',
                quickReplies: [
                    { label: '❓ Mer hjälp', action: 'kontakt' }
                ]
            },

            // Arkiv
            'arkiv|premium|historia': {
                text: '📚 <strong>Premium Historiskt Arkiv:</strong><br><br>' +
                      'Exklusivt arkiv med hundratals artiklar, intervjuer och regeländringar.<br><br>' +
                      '<strong>Pris:</strong> 499 kr/månad<br>' +
                      '<strong>Perfekt för:</strong><br>' +
                      '• Journalister & Media<br>' +
                      '• Historiker & Forskare<br>' +
                      '• Klubbar & Föreningar<br>' +
                      '• Seriösa Entusiaster<br><br>' +
                      '💼 <strong>Företag & Media:</strong> Kontakta oss för specialpriser',
                quickReplies: [
                    { label: '💬 Kontakta oss', action: 'kontakt' }
                ]
            },

            // Språk
            'språk|översättning|english|français': {
                text: '🌍 <strong>Tillgängliga språk:</strong><br><br>' +
                      '🇸🇪 Svenska<br>' +
                      '🇬🇧 English<br>' +
                      '🇫🇷 Français<br>' +
                      '🇪🇸 Español<br>' +
                      '🇩🇪 Deutsch<br>' +
                      '🇹🇭 ไทย<br><br>' +
                      'Välj språk i språkväxlaren längst upp på sidan!',
                quickReplies: []
            },

            // Kontakt
            'kontakt|email|telefon|hjälp|support': {
                text: '💬 <strong>Kontakta oss:</strong><br><br>' +
                      '📧 <strong>Email:</strong> mats@petanqueguiden.se<br>' +
                      '📞 <strong>Telefon:</strong> [Ditt nummer]<br><br>' +
                      '<strong>Öppettider:</strong><br>' +
                      'Mån-Fre: 09:00-17:00<br>' +
                      'Svarstid: Inom 24 timmar<br><br>' +
                      'Vi hjälper gärna till med alla frågor!',
                quickReplies: []
            },

            // Betalning
            'betala|betalning|gumroad|kort': {
                text: '💳 <strong>Betalning:</strong><br><br>' +
                      'Vi använder Gumroad för säker betalning.<br><br>' +
                      '<strong>Accepterar:</strong><br>' +
                      '✅ Kreditkort (Visa, Mastercard, Amex)<br>' +
                      '✅ PayPal<br>' +
                      '✅ Apple Pay / Google Pay<br><br>' +
                      '<strong>För klubbar:</strong> Fakturering möjlig<br><br>' +
                      '🔒 All betalning är krypterad och säker',
                quickReplies: [
                    { label: '🏛️ Klubbfaktura', action: 'klubbpaket' }
                ]
            },

            // Default
            'default': {
                text: 'Jag förstår inte riktigt din fråga. 🤔<br><br>' +
                      'Jag kan hjälpa dig med:<br>' +
                      '• Priser och paket<br>' +
                      '• Klubbpaket<br>' +
                      '• Appar och funktioner<br>' +
                      '• Licenser och aktivering<br>' +
                      '• Kontaktinformation<br><br>' +
                      'Vad vill du veta mer om?',
                quickReplies: [
                    { label: '💰 Priser', action: 'pris' },
                    { label: '🏛️ Klubbpaket', action: 'klubbpaket' },
                    { label: '📱 Appar', action: 'appar' },
                    { label: '💬 Kontakt', action: 'kontakt' }
                ]
            }
        };
    }

    getResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check knowledge base
        for (const [pattern, response] of Object.entries(this.knowledgeBase)) {
            if (pattern === 'default') continue;
            
            const keywords = pattern.split('|');
            if (keywords.some(keyword => lowerMessage.includes(keyword))) {
                return response;
            }
        }
        
        // Default response
        return this.knowledgeBase.default;
    }
}

// Initialize chatbot when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new PetanqueChatbot();
    });
} else {
    new PetanqueChatbot();
}
