// Countdown Timer
function updateCountdown() {
  const examDate = new Date('2025-05-17T08:30:00');
  const now = new Date();
  const diff = examDate - now;

  if (diff > 0) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
  } else {
    // If exam has started
    document.querySelector('.countdown-container h2').textContent = '會考進行中';
    document.querySelector('.countdown').style.display = 'none';
  }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Search Functionality
document.getElementById('searchInput').addEventListener('input', function(e) {
  const searchText = e.target.value.toLowerCase();
  const rows = document.querySelectorAll('tbody tr');

  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(searchText) ? '' : 'none';
  });
});

// Add to Calendar Functionality
document.querySelectorAll('.add-calendar-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const date = this.dataset.date;
    const event = this.dataset.event;
    const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event)}&dates=${date.replace(/-/g, '')}/${date.replace(/-/g, '')}&details=${encodeURIComponent('114學年度國中會考重要日程')}`;
    window.open(calendarUrl);
  });
});

// Share Functionality
document.getElementById('shareBtn').addEventListener('click', async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: '114學年度國中會考重要日程',
        url: window.location.href
      });
    } catch (err) {
      console.error('Share failed:', err);
    }
  } else {
    // Fallback: Copy URL to clipboard
    navigator.clipboard.writeText(window.location.href);
    alert('網址已複製到剪貼簿');
  }
});

// Export Functionality
document.getElementById('exportBtn').addEventListener('click', () => {
  const rows = document.querySelectorAll('tbody tr');
  let csv = '日期,事項\n';
  
  rows.forEach(row => {
    const date = row.querySelector('.date-cell').textContent;
    const event = row.querySelector('td:nth-child(2)').textContent;
    csv += `${date},${event}\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = '114學年度國中會考重要日程.csv';
  link.click();
});

// Add All Events to Calendar Functionality
document.getElementById('addAllBtn').addEventListener('click', function() {
  const events = [
    { date: '2024-04-11', event: '國中會考寄發准考證' },
    { date: '2024-05-06', event: '完全免試入學報名' },
    { date: '2024-05-15', event: '完全免試入學放榜' },
    { date: '2024-05-17', event: '國中會考考試' },
    { date: '2024-05-19', event: '優先免試入學開始辦理' },
    { date: '2024-06-06', event: '國中會考成績公布' },
    { date: '2024-06-17', event: '優先免試入學放榜' },
    { date: '2024-06-20', event: '就學區免試入學名額發布及會考序位區間公告' },
    { date: '2024-06-20', event: '就學區免試入學志願選填開始' },
    { date: '2024-07-08', event: '就學區免試入學放榜' }
  ];

  // Create .ics file content
  let icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//114學年度國中會考重要日程//TW',
    'CALSCALE:GREGORIAN'
  ];

  events.forEach(({date, event}) => {
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    const endDate = nextDay.toISOString().split('T')[0].replace(/-/g, '');
    
    icsContent = icsContent.concat([
      'BEGIN:VEVENT',
      `DTSTART;VALUE=DATE:${date.replace(/-/g, '')}`,
      `DTEND;VALUE=DATE:${endDate}`,
      `SUMMARY:${event}`,
      'DESCRIPTION:114學年度國中會考重要日程',
      `UID:${date}-${Math.random().toString(36).substring(2)}`,
      'END:VEVENT'
    ]);
  });

  icsContent.push('END:VCALENDAR');

  // Create and download the .ics file
  const blob = new Blob([icsContent.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = '114學年度國中會考重要日程.ics';
  link.click();
});

// Animation on Scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateX(0)';
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.timeline-item').forEach(item => observer.observe(item));