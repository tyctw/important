document.addEventListener('DOMContentLoaded', () => {
  // Menu toggle functionality
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', 
        menuToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
      );
    });
  }

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !menuToggle.contains(e.target)) {
      navMenu.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Active menu item
  const navLinks = document.querySelectorAll('.nav-menu-link');
  navLinks.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add('active');
    }
  });

  const timeline = document.getElementById('timeline');
  const loading = document.getElementById('loading');
  
  function showLoading() {
    loading.classList.add('active');
  }
  
  function hideLoading() {
    loading.classList.remove('active');
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
      
      timeline.innerHTML = '';
      data.forEach(event => {
        const eventElement = createEventElement(event);
        timeline.appendChild(eventElement);
      });
      
      // Initialize intersection observer after adding elements
      initializeObserver();
    } catch (error) {
      console.error('Error fetching events:', error);
      timeline.innerHTML = '<div class="error">載入失敗，請稍後再試</div>';
    } finally {
      hideLoading();
    }
  }

  function initializeObserver() {
    const events = document.querySelectorAll('.event');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    });

    events.forEach((event, index) => {
      event.style.opacity = '0';
      event.style.transform = 'translateY(30px)';
      event.style.transitionDelay = `${index * 0.1}s`;
      event.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      observer.observe(event);
    });

    // Add hover effect for timeline dots
    events.forEach(event => {
      event.addEventListener('mouseenter', () => {
        const dot = event.querySelector('::before');
        if (dot) {
          dot.style.transform = 'translateY(-50%) scale(1.2)';
        }
      });
      
      event.addEventListener('mouseleave', () => {
        const dot = event.querySelector('::before');
        if (dot) {
          dot.style.transform = 'translateY(-50%) scale(1)';
        }
      });
    });
  }

  // Handle notification permission
  const notifyBtn = document.getElementById('notifyBtn');
  
  if (notifyBtn) {
    notifyBtn.addEventListener('click', async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          notifyBtn.innerHTML = '<i class="fas fa-bell"></i> 通知已開啟';
          notifyBtn.style.background = 'linear-gradient(145deg, #48bb78, #38a169)';
          notifyBtn.style.color = 'white';
        }
      } catch (error) {
        console.error('Error requesting notification permission:', error);
      }
    });

    // Update button state based on current permission
    if (Notification.permission === 'granted') {
      notifyBtn.innerHTML = '<i class="fas fa-bell"></i> 通知已開啟';
      notifyBtn.style.background = 'linear-gradient(145deg, #48bb78, #38a169)';
      notifyBtn.style.color = 'white';
    }
  }

  // Initial load
  fetchEvents();
});