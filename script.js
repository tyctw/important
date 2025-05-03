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

// 事件日期標籤更新
function updateEventTags() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  const today = new Date();
  
  // 定義未來30天的日期
  const nextMonth = new Date();
  nextMonth.setDate(today.getDate() + 30);
  
  timelineItems.forEach(item => {
    const dateEl = item.querySelector('.timeline-date');
    const dateText = dateEl.textContent.split(' ')[0]; // 取得日期部分（排除標籤）
    
    let dateParts = dateText.split('/');
    let month = parseInt(dateParts[0], 10);
    let day = parseInt(dateParts[1], 10);
    
    // 處理日期範圍（例如5/6-7）
    if (day.toString().includes('-')) {
      day = parseInt(day.split('-')[0], 10);
    }
    
    // 創建事件日期（設定年份為2025）
    const eventDate = new Date(2025, month - 1, day);
    
    // 移除舊標籤
    const oldTag = item.querySelector('.timeline-tag');
    if (oldTag) {
      oldTag.remove();
    }
    
    // 創建新標籤
    const tagEl = document.createElement('span');
    tagEl.classList.add('timeline-tag');
    
    if (eventDate < today) {
      tagEl.classList.add('tag-past');
      tagEl.textContent = '已結束';
    } else if (
      eventDate.getDate() === today.getDate() && 
      eventDate.getMonth() === today.getMonth() &&
      eventDate.getFullYear() === today.getFullYear()
    ) {
      tagEl.classList.add('tag-active');
      tagEl.textContent = '今日';
    } else if (eventDate <= nextMonth) {
      tagEl.classList.add('tag-upcoming');
      tagEl.textContent = '即將來臨';
    } else {
      tagEl.classList.add('tag-future');
      tagEl.textContent = '未來事項';
    }
    
    dateEl.appendChild(tagEl);
  });
}

// 事件篩選功能
document.getElementById('timeFilter').addEventListener('change', function() {
  const filterValue = this.value;
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  timelineItems.forEach(item => {
    const tag = item.querySelector('.timeline-tag');
    
    if (!tag) return;
    
    switch(filterValue) {
      case 'all':
        item.style.display = '';
        break;
      case 'upcoming':
        item.style.display = tag.classList.contains('tag-upcoming') ? '' : 'none';
        break;
      case 'active':
        item.style.display = tag.classList.contains('tag-active') ? '' : 'none';
        break;
      case 'past':
        item.style.display = tag.classList.contains('tag-past') ? '' : 'none';
        break;
    }
  });
});

// 視圖模式切換
let isListView = false;
document.getElementById('viewModeBtn').addEventListener('click', function() {
  const timeline = document.querySelector('.timeline');
  isListView = !isListView;
  
  if (isListView) {
    timeline.classList.add('list-view');
    this.setAttribute('data-tooltip', '切換時間軸視圖');
  } else {
    timeline.classList.remove('list-view');
    this.setAttribute('data-tooltip', '切換列表視圖');
  }
});

// Search Functionality
document.getElementById('searchInput').addEventListener('input', function(e) {
  const searchText = e.target.value.toLowerCase();
  const timelineItems = document.querySelectorAll('.timeline-item');

  if (searchText.trim() === '') {
    // 如果搜尋欄為空，顯示所有項目
    timelineItems.forEach(item => {
      item.style.display = '';
      item.classList.remove('search-highlight');
    });
    return;
  }

  timelineItems.forEach(item => {
    const itemText = item.textContent.toLowerCase();
    const isVisible = itemText.includes(searchText);
    item.style.display = isVisible ? '' : 'none';
    
    // 高亮搜索結果
    if (isVisible) {
      item.classList.add('search-highlight');
    } else {
      item.classList.remove('search-highlight');
    }
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
  const timelineItems = document.querySelectorAll('.timeline-item');
  let csv = '日期,事項,狀態\n';
  
  timelineItems.forEach(item => {
    const dateTextFull = item.querySelector('.timeline-date').textContent;
    const dateText = dateTextFull.split(' ')[0]; // 只取日期部分
    const event = item.querySelector('.timeline-event').textContent;
    const status = item.querySelector('.timeline-tag') ? item.querySelector('.timeline-tag').textContent : '';
    
    csv += `${dateText},${event.replace(/\n/g, ' ')},${status}\n`;
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
    { date: '2025-04-11', event: '國中會考寄發准考證' },
    { date: '2025-05-06', event: '完全免試入學報名' },
    { date: '2025-05-15', event: '完全免試入學放榜' },
    { date: '2025-05-17', event: '國中會考考試' },
    { date: '2025-05-19', event: '優先免試入學開始辦理' },
    { date: '2025-06-06', event: '國中會考成績公布' },
    { date: '2025-06-17', event: '優先免試入學放榜' },
    { date: '2025-06-20', event: '就學區免試入學名額發布及會考序位區間公告' },
    { date: '2025-06-20', event: '就學區免試入學志願選填開始' },
    { date: '2025-07-08', event: '就學區免試入學放榜' }
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

// 暗黑模式功能
function setupDarkMode() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  
  // 檢查本地儲存中的設置
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  
  // 根據儲存的偏好設置初始模式
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    darkModeToggle.setAttribute('aria-checked', 'true');
  }
  
  // 切換暗黑模式
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    darkModeToggle.setAttribute('aria-checked', isDark);
  });
}

// 列印功能
document.getElementById('printBtn').addEventListener('click', () => {
  window.print();
});

// 回到頂部功能
function setupScrollToTop() {
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  
  // 顯示或隱藏回到頂部按鈕
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });
  
  // 點擊回到頂部
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// 添加提醒功能
function setupReminders() {
  document.querySelectorAll('.reminder-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const date = this.dataset.date;
      const event = this.dataset.event;
      
      // 檢查瀏覽器通知權限
      if (Notification.permission === 'granted') {
        setNotification(date, event);
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            setNotification(date, event);
          }
        });
      }
    });
  });
  
  // 全部設置提醒按鈕
  document.getElementById('reminderAllBtn').addEventListener('click', function() {
    if (Notification.permission === 'granted') {
      const allEvents = [
        { date: '2025-04-11', event: '國中會考寄發准考證' },
        { date: '2025-05-06', event: '完全免試入學報名' },
        { date: '2025-05-15', event: '完全免試入學放榜' },
        { date: '2025-05-17', event: '國中會考考試' },
        { date: '2025-05-19', event: '優先免試入學開始辦理' },
        { date: '2025-06-06', event: '國中會考成績公布' },
        { date: '2025-06-17', event: '優先免試入學放榜' },
        { date: '2025-06-20', event: '就學區免試入學名額發布及會考序位區間公告' },
        { date: '2025-06-20', event: '就學區免試入學志願選填開始' },
        { date: '2025-07-08', event: '就學區免試入學放榜' }
      ];
      
      // 篩選出未來事件
      const now = new Date();
      const futureEvents = allEvents.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate > now;
      });
      
      if (futureEvents.length === 0) {
        alert('沒有未來事件可設置提醒。');
        return;
      }
      
      // 設置所有未來事件的提醒
      let successCount = 0;
      futureEvents.forEach(({date, event}) => {
        const success = setNotification(date, event, false);
        if (success) successCount++;
      });
      
      alert(`已成功設置 ${successCount} 個事件的提醒。`);
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          // 重新調用此函數
          this.click();
        }
      });
    } else {
      alert('您已拒絕通知權限，請在瀏覽器設置中啟用通知。');
    }
  });
  
  function setNotification(dateStr, eventName, showAlert = true) {
    // 設置提醒時間（事件前一天）
    const reminderDate = new Date(dateStr);
    reminderDate.setDate(reminderDate.getDate() - 1);
    reminderDate.setHours(9, 0, 0, 0);
    
    const now = new Date();
    
    // 如果提醒時間已過，顯示消息
    if (reminderDate < now) {
      if (showAlert) {
        alert('此事件已過期或即將發生，無法設置提醒。');
      }
      return false;
    }
    
    // 儲存提醒到本地儲存
    const reminders = JSON.parse(localStorage.getItem('reminders') || '[]');
    const reminderId = Date.now();
    
    const reminder = {
      id: reminderId,
      date: dateStr,
      event: eventName,
      reminderTime: reminderDate.toISOString()
    };
    
    reminders.push(reminder);
    localStorage.setItem('reminders', JSON.stringify(reminders));
    
    // 設置計時器
    setTimeout(() => {
      new Notification('國中會考事項提醒', {
        body: `明天（${dateStr}）有重要事項：${eventName}`,
        icon: '/favicon.ico'
      });
      
      // 從儲存中移除已觸發的提醒
      removeReminderFromStorage(reminderId);
    }, reminderDate.getTime() - now.getTime());
    
    if (showAlert) {
      alert(`已設置提醒：將在 ${reminderDate.toLocaleString('zh-TW')} 提醒您 "${eventName}"`);
    }
    
    return true;
  }
  
  function removeReminderFromStorage(id) {
    const reminders = JSON.parse(localStorage.getItem('reminders') || '[]');
    const updatedReminders = reminders.filter(r => r.id !== id);
    localStorage.setItem('reminders', JSON.stringify(updatedReminders));
  }
  
  // 頁面載入時恢復儲存的提醒
  function restoreReminders() {
    const reminders = JSON.parse(localStorage.getItem('reminders') || '[]');
    const now = new Date();
    
    reminders.forEach(reminder => {
      const reminderTime = new Date(reminder.reminderTime);
      
      // 如果提醒時間還未到
      if (reminderTime > now) {
        const delayMs = reminderTime.getTime() - now.getTime();
        
        setTimeout(() => {
          new Notification('國中會考事項提醒', {
            body: `明天（${reminder.date}）有重要事項：${reminder.event}`,
            icon: '/favicon.ico'
          });
          
          removeReminderFromStorage(reminder.id);
        }, delayMs);
      } else {
        // 如果提醒時間已過，從儲存中移除
        removeReminderFromStorage(reminder.id);
      }
    });
  }
  
  // 如果有權限，恢復提醒
  if (Notification.permission === 'granted') {
    restoreReminders();
  }
}

// 初始化工具提示
function setupTooltips() {
  const tooltips = document.querySelectorAll('[data-tooltip]');
  tooltips.forEach(tooltip => {
    tooltip.addEventListener('mouseenter', () => {
      const tooltipText = tooltip.getAttribute('data-tooltip');
      const tooltipEl = document.createElement('div');
      tooltipEl.className = 'tooltip';
      tooltipEl.textContent = tooltipText;
      tooltip.appendChild(tooltipEl);
    });
    
    tooltip.addEventListener('mouseleave', () => {
      const existingTooltip = tooltip.querySelector('.tooltip');
      if (existingTooltip) {
        existingTooltip.remove();
      }
    });
  });
}

// 初始化所有功能
document.addEventListener('DOMContentLoaded', () => {
  updateEventTags();
  setupDarkMode();
  setupScrollToTop();
  setupReminders();
  setupTooltips();
  
  document.querySelectorAll('.timeline-item').forEach(item => observer.observe(item));
});