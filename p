<html><head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>114學年度國中會考範圍與日程表 - 智慧互動版</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700&display=swap');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css');

  :root {
    --primary-color: #3498db;
    --secondary-color: #2c3e50;
    --background-color: #ecf0f1;
    --text-color: #34495e;
    --accent-color: #e74c3c;
    --timeline-color: #95a5a6;
    --gradient-start: #3498db;
    --gradient-end: #2980b9;
    --success-color: #2ecc71;
    --warning-color: #f39c12;
  }

  body {
    font-family: 'Noto Sans TC', Arial, sans-serif;
    line-height: 1.6;
    color: var(--text-color);
    margin: 0;
    padding: 0;
    background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .container {
    background-color: white;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    padding: 40px;
    max-width: 1000px;
    width: 90%;
    margin: 20px;
  }

  h1 {
    color: var(--secondary-color);
    text-align: center;
    font-size: 2.5em;
    margin-bottom: 30px;
    border-bottom: 3px solid var(--primary-color);
    padding-bottom: 15px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
  }

  .timeline {
    position: relative;
    padding: 20px 0;
  }

  .timeline::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 4px;
    height: 100%;
    background-color: var(--timeline-color);
    transform: translateX(-50%);
  }

  .timeline-item {
    padding: 25px;
    position: relative;
    background-color: #f8f9fa;
    border-radius: 10px;
    width: calc(50% - 40px);
    margin-bottom: 40px;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  .timeline-item:nth-child(odd) {
    float: left;
    clear: right;
  }

  .timeline-item:nth-child(even) {
    float: right;
    clear: left;
  }

  .timeline-item::before {
    content: '';
    position: absolute;
    top: 20px;
    right: -50px;
    width: 25px;
    height: 25px;
    background-color: var(--primary-color);
    border-radius: 50%;
    box-shadow: 0 0 0 4px #fff, 0 0 0 8px var(--primary-color);
    transition: all 0.3s ease;
  }

  .timeline-item:nth-child(even)::before {
    left: -50px;
  }

  .timeline-item:hover {
    transform: translateY(-5px) scale(1.03);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }

  .timeline-item:hover::before {
    background-color: var(--accent-color);
    box-shadow: 0 0 0 4px #fff, 0 0 0 8px var(--accent-color);
  }

  .timeline-date {
    font-weight: bold;
    color: var(--primary-color);
    margin-bottom: 15px;
    font-size: 1.2em;
  }

  .timeline-content {
    margin-bottom: 15px;
  }

  .timeline-note {
    font-style: italic;
    color: var(--accent-color);
    font-size: 0.9em;
  }

  .clearfix::after {
    content: '';
    display: table;
    clear: both;
  }

  .icon {
    font-size: 24px;
    color: var(--primary-color);
    margin-right: 10px;
    vertical-align: middle;
  }

  .toast {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 15px 25px;
    background-color: var(--success-color);
    color: white;
    border-radius: 5px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    display: none;
    z-index: 1000;
  }

  .countdown {
    text-align: center;
    font-size: 1.2em;
    margin-top: 20px;
    color: var(--secondary-color);
  }

  .progress-bar {
    width: 100%;
    height: 10px;
    background-color: #ddd;
    border-radius: 5px;
    overflow: hidden;
    margin-top: 10px;
  }

  .progress {
    width: 0;
    height: 100%;
    background-color: var(--primary-color);
    transition: width 0.5s ease;
  }

  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }

  .loading-spinner {
    width: 50px;
    height: 50px;
    border: 5px solid var(--primary-color);
    border-top: 5px solid var(--accent-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Mobile styles */
  @media (max-width: 768px) {
    .container {
      padding: 20px;
      width: 95%;
    }

    h1 {
      font-size: 2em;
    }

    .timeline::before {
      left: 20px;
    }

    .timeline-item {
      width: calc(100% - 70px);
      float: right;
      clear: both;
      margin-left: 40px;
    }

    .timeline-item::before {
      left: -45px;
    }

    .timeline-item:nth-child(even)::before {
      left: -45px;
    }

    .icon {
      font-size: 20px;
    }

    .toast {
      left: 20px;
      right: 20px;
      bottom: 20px;
      width: calc(100% - 40px);
      font-size: 0.9em;
    }

    .countdown {
      font-size: 1em;
    }
  }

  /* Additional mobile enhancements */
  @media (max-width: 480px) {
    h1 {
      font-size: 1.8em;
    }

    .timeline-item {
      padding: 15px;
    }

    .timeline-date {
      font-size: 1em;
    }

    .timeline-content {
      font-size: 0.9em;
    }

    .timeline-note {
      font-size: 0.8em;
    }

    .countdown {
      font-size: 0.9em;
    }
  }

  /* Improved touch targets for mobile */
  @media (hover: none) and (pointer: coarse) {
    .timeline-item {
      padding: 20px;
    }

    .timeline-item:hover {
      transform: none;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }

    .timeline-item:active {
      background-color: #e9ecef;
    }
  }
</style>
</head>
<body>
  <div class="container">
    <h1><i class="fas fa-graduation-cap icon"></i>114學年度國中會考範圍與日程表</h1>
    
    <div id="countdown" class="countdown">
      <h3>距離下一個重要日期還有：</h3>
      <div id="timer"></div>
      <div class="progress-bar">
        <div id="progress" class="progress"></div>
      </div>
    </div>

    <div id="timeline" class="timeline clearfix">
      <!-- Timeline items will be dynamically inserted here -->
    </div>
  </div>

  <div id="toast" class="toast"></div>

  <!-- Loading overlay -->
  <div id="loadingOverlay" class="loading-overlay">
    <div class="loading-spinner"></div>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>
  <script>
    // Function to show loading animation
    function showLoading() {
      document.getElementById('loadingOverlay').style.display = 'flex';
    }

    // Function to hide loading animation
    function hideLoading() {
      document.getElementById('loadingOverlay').style.display = 'none';
    }

    // Function to fetch exam data from Google Apps Script
    function fetchExamData() {
      showLoading(); // Show loading animation before fetching data
      fetch('https://script.google.com/macros/s/AKfycbyePGH7alw6ZUaAqWaVPMQvE5ydQak1XXr7ngVJ93wRyLd0nZ2UR_1Jy8iT1GrnI3ua/exec?action=getExams')
        .then(response => response.json())
        .then(data => {
          const timeline = document.getElementById('timeline');
          timeline.innerHTML = ''; // Clear existing items

          data.forEach(exam => {
            const item = createTimelineItem(exam);
            timeline.appendChild(item);
          });

          // Animate new items
          anime({
            targets: '.timeline-item',
            opacity: [0, 1],
            translateY: [20, 0],
            delay: anime.stagger(200),
            duration: 800
          });

          updateCountdown(data);
          hideLoading(); // Hide loading animation after data is loaded
        })
        .catch(error => {
          console.error('Error:', error);
          hideLoading(); // Hide loading animation in case of error
          showToast('資料載入失敗，請稍後再試。', 5000);
        });
    }

    // Function to create a timeline item
    function createTimelineItem(exam) {
      const item = document.createElement('div');
      item.className = 'timeline-item';
      item.innerHTML = `
        <div class="timeline-date"><i class="far fa-calendar-alt icon"></i>${exam.date}</div>
        <div class="timeline-content">
          <strong><i class="fas fa-book icon"></i>${exam.name}</strong><br>
          ${exam.content}
        </div>
        ${exam.note ? `<div class="timeline-note"><i class="fas fa-info-circle icon"></i>${exam.note}</div>` : ''}
      `;
      item.addEventListener('click', () => showExamDetails(exam));
      return item;
    }

    // Function to show exam details
    function showExamDetails(exam) {
      const detailsHtml = `
        <h3>${exam.name}</h3>
        <p><strong>日期：</strong>${exam.date}</p>
        <p><strong>內容：</strong>${exam.content}</p>
        ${exam.note ? `<p><strong>備註：</strong>${exam.note}</p>` : ''}
      `;
      showToast(detailsHtml, 10000);
    }

    // Function to show toast message
    function showToast(message, duration) {
      const toast = document.getElementById('toast');
      toast.innerHTML = message;
      toast.style.display = 'block';
      setTimeout(() => {
        toast.style.display = 'none';
      }, duration);
    }

    // Function to update countdown
    function updateCountdown(exams) {
      const now = new Date();
      const futureExams = exams.filter(exam => new Date(exam.date) > now);
      if (futureExams.length === 0) return;

      const nextExam = futureExams.reduce((a, b) => new Date(a.date) < new Date(b.date) ? a : b);
      const examDate = new Date(nextExam.date);
      const timeDiff = examDate - now;
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

      document.getElementById('timer').innerHTML = `${days}天 ${hours}小時 ${minutes}分鐘`;

      // Update progress bar
      const totalDays = Math.ceil((examDate - now) / (1000 * 60 * 60 * 24));
      const progress = ((totalDays - days) / totalDays) * 100;
      document.getElementById('progress').style.width = `${progress}%`;

      setTimeout(() => updateCountdown(exams), 60000); // Update every minute
    }

    // Initial fetch of exam data
    document.addEventListener('DOMContentLoaded', fetchExamData);

    // Add touch event listeners for mobile devices
    if ('ontouchstart' in window) {
      document.addEventListener('touchstart', handleTouchStart, false);
      document.addEventListener('touchmove', handleTouchMove, false);

      let xDown = null;
      let yDown = null;

      function handleTouchStart(evt) {
        xDown = evt.touches[0].clientX;
        yDown = evt.touches[0].clientY;
      }

      function handleTouchMove(evt) {
        if (!xDown || !yDown) {
          return;
        }

        let xUp = evt.touches[0].clientX;
        let yUp = evt.touches[0].clientY;

        let xDiff = xDown - xUp;
        let yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
          if (xDiff > 0) {
            // Swipe left
            console.log('Swiped left');
          } else {
            // Swipe right
            console.log('Swiped right');
          }
        } else {
          if (yDiff > 0) {
            // Swipe up
            console.log('Swiped up');
          } else {
            // Swipe down
            console.log('Swiped down');
          }
        }

        xDown = null;
        yDown = null;
      }
    }
  </script>
</body></html>
