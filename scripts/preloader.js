// Wait 2 seconds for preloader
setTimeout(() => {
  // Hide preloader
  document.getElementById('preloader').style.display = 'none';
  // Show main content
  document.getElementById('app-content').style.display = 'block';
}, 2000); // 2000ms = 2 seconds
