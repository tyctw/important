document.addEventListener('DOMContentLoaded', () => {
  const timeline = document.getElementById('timeline');
  const loading = document.getElementById('loading');
  const searchInput = document.getElementById('searchInput');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const shareBtn = document.getElementById('shareBtn');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  
  let events = [];
  
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
      }, 800);
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

  function updateCountdown(nextEvent) {
    if (!nextEvent) return;
    
    const now = new Date();
    const eventDate = parseDate(nextEvent.date);
    const timeLeft = eventDate - now;
    
    if (timeLeft < 0) return;
    
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    document.getElementById('nextEventTitle').textContent = nextEvent.content;
  }

  function parseDate(dateStr) {
    const [year, month, day] = dateStr.split('/').map(num => parseInt(num));
    return new Date(year + 1911, month - 1, day);
  }

  function filterEvents(filterType) {
    const now = new Date();
    
    events.forEach(event => {
      const eventDate = parseDate(event.date);
      const eventElement = document.querySelector(`.event:nth-child(${events.indexOf(event) + 1})`);
      
      if (filterType === 'all' || 
          (filterType === 'upcoming' && eventDate >= now) ||
          (filterType === 'past' && eventDate < now)) {
        eventElement.classList.remove('hidden');
      } else {
        eventElement.classList.add('hidden');
      }
    });
  }

  async function fetchEvents() {
    showLoading();
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycby8qNVVffuMNvDjjpIc5bBrRSxqz-iVRd-VxKsHlaz3I5a4VGqXLPxLZ0yMSi2TV5WZnA/exec');
      events = await response.json();
      
      await hideLoading();
      
      timeline.innerHTML = '<div class="timestamp"></div>';
      events.forEach(event => {
        const eventElement = createEventElement(event);
        timeline.appendChild(eventElement);
      });
      
      initializeObserver();
      
      // Find next upcoming event
      const now = new Date();
      const nextEvent = events.find(event => parseDate(event.date) > now);
      if (nextEvent) {
        setInterval(() => updateCountdown(nextEvent), 1000);
      }
      
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

  // Search functionality
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const eventElements = document.querySelectorAll('.event');
    
    eventElements.forEach((element, index) => {
      const content = events[index].content.toLowerCase();
      if (content.includes(searchTerm)) {
        element.classList.remove('hidden');
      } else {
        element.classList.add('hidden');
      }
    });
  });

  // Filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      filterEvents(button.dataset.filter);
    });
  });

  // Share button
  shareBtn.addEventListener('click', async () => {
    const shareData = {
      title: '114年國中會考重要日程',
      text: '查看114年國中會考重要日程表',
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('網址已複製到剪貼簿！');
      }
    } catch (err) {
      console.error('分享失敗:', err);
    }
  });

  // Scroll to top button
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollTopBtn.style.display = 'flex';
    } else {
      scrollTopBtn.style.display = 'none';
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Initial load
  fetchEvents();
});