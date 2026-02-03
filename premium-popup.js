document.addEventListener('DOMContentLoaded', function() {
  // Show popup on last free chapter
  const isLastFreeChapter = document.body.classList.contains('last-free-chapter');
  
  if (isLastFreeChapter) {
    showPremiumPopup();
  }

  // Close button
  document.querySelector('.premium-popup .close-btn').addEventListener('click', function() {
    document.getElementById('premium-popup').classList.add('hidden');
  });
});

function showPremiumPopup() {
  document.getElementById('premium-popup').classList.remove('hidden');
}

// Export for chapter navigation
window.showPremiumPopup = showPremiumPopup;
