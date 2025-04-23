// Firebase Auth config (тек тест үшін, өзіңіздің кілтіңізді қойыңыз)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_APP_ID"
};

let firebaseEnabled = firebaseConfig.apiKey !== "YOUR_API_KEY";
if(firebaseEnabled) {
  firebase.initializeApp(firebaseConfig);
  var auth = firebase.auth();
}


// UI logic
const loginSection = document.getElementById('login-section');
const profileSection = document.getElementById('profile-section');
const userName = document.getElementById('user-name');
const userEmail = document.getElementById('user-email');
const userPhone = document.getElementById('user-phone');
const userPhoto = document.getElementById('user-photo');
const logoutBtn = document.getElementById('logout-btn');

function showProfile(user) {
  loginSection.style.display = 'none';
  profileSection.style.display = 'block';
  userName.textContent = user.displayName || 'Аноним';
  userEmail.textContent = user.email || '-';
  userPhone.textContent = user.phoneNumber || '-';
  userPhoto.src = user.photoURL || 'https://ui-avatars.com/api/?name=' + (user.displayName || 'User');
}
function showLogin() {
  loginSection.style.display = 'block';
  profileSection.style.display = 'none';
}

auth.onAuthStateChanged(function(user) {
  if (user) {
    showProfile(user);
  } else {
    showLogin();
  }
});

if(firebaseEnabled) {
  document.getElementById('login-google').onclick = function() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  document.getElementById('login-vk').onclick = function() {
    const provider = new firebase.auth.OAuthProvider('vk.com');
    auth.signInWithPopup(provider);
  };
  document.getElementById('login-phone').onclick = function() {
    alert('Телефон арқылы кіру әзірге тек толық интеграциямен жұмыс істейді.');
  };
  logoutBtn.onclick = function() {
    auth.signOut();
  };
  document.getElementById('edit-btn').onclick = function() {
    alert('Профильді өңдеу функциясы жақында қолжетімді болады!');
  };
} else {
  document.getElementById('login-google').onclick = function() {
    alert('Демо: Google арқылы кіру (Firebase конфигі жоқ)');
  };
  document.getElementById('login-vk').onclick = function() {
    alert('Демо: VK арқылы кіру (Firebase конфигі жоқ)');
  };
  document.getElementById('login-phone').onclick = function() {
    alert('Демо: Телефон арқылы кіру (Firebase конфигі жоқ)');
  };
  logoutBtn.onclick = function() {
    alert('Демо: Шығу (Firebase конфигі жоқ)');
  };
  document.getElementById('edit-btn').onclick = function() {
    alert('Демо: Профильді өңдеу (Firebase конфигі жоқ)');
  };
}


// Ripple эффект барлық .ripple классына
function createRipple(event) {
  const button = event.currentTarget;
  const circle = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
  circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
  circle.classList.add('ripple-effect');
  const ripple = button.getElementsByClassName('ripple-effect')[0];
  if (ripple) {
    ripple.remove();
  }
  button.appendChild(circle);
}
document.querySelectorAll('.ripple').forEach(btn => {
  btn.addEventListener('click', createRipple);
});
