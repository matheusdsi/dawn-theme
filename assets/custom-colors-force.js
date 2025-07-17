// Força aplicação das cores personalizadas
document.addEventListener('DOMContentLoaded', function() {
  
  // Força cores nos botões
  function forceButtonColors() {
    const buttons = document.querySelectorAll('.btn, .button, .product-form__cart-submit, .add-to-cart, [type="submit"]');
    buttons.forEach(button => {
      if (button.classList.contains('btn--primary') || button.classList.contains('product-form__cart-submit') || button.classList.contains('add-to-cart')) {
        const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--custom-add-to-cart-bg').trim();
        const textColor = getComputedStyle(document.documentElement).getPropertyValue('--custom-add-to-cart-text').trim();
        
        if (bgColor) {
          button.style.setProperty('background-color', bgColor, 'important');
          button.style.setProperty('border-color', bgColor, 'important');
        }
        if (textColor) {
          button.style.setProperty('color', textColor, 'important');
        }
      }
    });
  }
  
  // Força cores na barra de anúncios
  function forceAnnouncementColors() {
    const announcements = document.querySelectorAll('.announcement-bar, .announcement-bar__message, .announcement-bar__wrapper');
    announcements.forEach(element => {
      const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--custom-announcement-bg').trim();
      const textColor = getComputedStyle(document.documentElement).getPropertyValue('--custom-announcement-text').trim();
      
      if (bgColor) {
        element.style.setProperty('background-color', bgColor, 'important');
      }
      if (textColor) {
        element.style.setProperty('color', textColor, 'important');
      }
    });
  }
  
  // Executa as funções
  forceButtonColors();
  forceAnnouncementColors();
  
  // Re-executa quando necessário
  setTimeout(forceButtonColors, 1000);
  setTimeout(forceAnnouncementColors, 1000);
  
  // Observa mudanças no DOM
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        setTimeout(forceButtonColors, 100);
        setTimeout(forceAnnouncementColors, 100);
      }
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});
