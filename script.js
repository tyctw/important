document.addEventListener('DOMContentLoaded', () => {
  const timeline = document.getElementById('timeline');
  const loading = document.getElementById('loading');
  
  function showLoading() {
    timeline.style.display = 'none';
    loading.classList.add('active');
  }
  
  function hideLoading() {
    return new Promise(resolve => {
      setTimeout(() => {
        loading.classList.remove('active');
        timeline.style.display = 'block';
        resolve();
      }, 800); // Add slight delay for smoother transition
    });
  }

  function createEventElement(event) {
    const div = document.createElement('div');
    div.className = `event${event.highlight ? ' highlight' : ''}`;
    
    div.innerHTML = `
      <div class="date">${event.date}</div>
      <div class="content">${event.content}</div>
      ${event.isLatest ? '<div class="tag">最新</div>' : ''}
    `;
    
    return div;
  }

  async function fetchEvents() {
    showLoading();
    try {
      // Replace this URL with your actual Google Apps Script web app URL
      const response = await fetch('https://script.google.com/macros/s/AKfycby8qNVVffuMNvDjjpIc5bBrRSxqz-iVRd-VxKsHlaz3I5a4VGqXLPxLZ0yMSi2TV5WZnA/exec');
      const data = await response.json();
      
      await hideLoading();
      
      timeline.innerHTML = '';
      data.forEach(event => {
        const eventElement = createEventElement(event);
        timeline.appendChild(eventElement);
      });
      
      // Initialize intersection observer after adding elements
      initializeObserver();
    } catch (error) {
      console.error('Error fetching events:', error);
      await hideLoading();
      timeline.innerHTML = '<div class="error">載入失敗，請稍後再試</div>';
    }
  }

  function initializeObserver() {
    const events = document.querySelectorAll('.event');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    });

    events.forEach((event, index) => {
      event.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(event);
    });
  }

  // Initial load
  fetchEvents();
});