// ===== Firebase Configuration =====
const firebaseConfig = {
  apiKey: "AIzaSyAvuzDL-6IKPAT-xcxIiGILEVqAZbbyXxM",
  authDomain: "vajra-e2a4c.firebaseapp.com",
  projectId: "vajra-e2a4c",
  storageBucket: "vajra-e2a4c.firebasestorage.app",
  messagingSenderId: "152960368488",
  appId: "1:152960368488:web:38046313d08b8f96a220dd",
  measurementId: "G-FHVCTB08F6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
// ===== Google Sign-In =====
const googleBtn = document.getElementById("google-btn");
const provider = new firebase.auth.GoogleAuthProvider();

googleBtn.addEventListener("click", () => {
  auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      alert(`Login successful! Welcome, ${user.displayName}`);
      modal.style.display = "none";   // hide modal
      window.location.href = "home.html"; // redirect to home
    })
    .catch((error) => {
      alert(error.message);
    });
});

// ===== Modal Elements =====
const modal = document.getElementById("auth-modal");
const getStartedBtn = document.querySelector(".get-started-btn");
const closeBtn = document.querySelector(".close");

// ===== Form Elements =====
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const formTitle = document.getElementById("form-title");
const toggleForms = document.querySelectorAll("#toggle-form");

// ===== Open Modal on "Get Started" =====
// ===== Open Modal on "Get Started" =====
getStartedBtn.addEventListener("click", (e) => {
  e.preventDefault(); // prevent navigating to signup.html
  modal.style.display = "block";
  signupForm.classList.add("active");   // show signup
  loginForm.classList.remove("active"); // hide login
  formTitle.textContent = "Sign Up";
  toggleForms.forEach(t => t.textContent = "Already have an account? Login");
});

// ===== Close Modal =====
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// ===== Toggle Forms =====
toggleForms.forEach(toggle => {
  toggle.addEventListener("click", () => {
    loginForm.classList.toggle("active");
    signupForm.classList.toggle("active");
    if (loginForm.classList.contains("active")) {
      formTitle.textContent = "Login";
      toggleForms.forEach(t => t.textContent = "Don't have an account? Sign Up");
    } else {
      formTitle.textContent = "Sign Up";
      toggleForms.forEach(t => t.textContent = "Already have an account? Login");
    }
  });
});

// ===== Signup Form =====
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Send verification email
      userCredential.user.sendEmailVerification()
        .then(() => {
          alert(`Signup successful! Verification email sent to ${email}. Please verify before logging in.`);
          signupForm.reset();
          // Switch to login form
          loginForm.classList.add("active");
          signupForm.classList.remove("active");
          formTitle.textContent = "Login";
          toggleForms.forEach(t => t.textContent = "Don't have an account? Sign Up");
        })
        .catch((error) => {
          alert(error.message);
        });
    })
    .catch((error) => {
      alert(error.message);
    });
});

// ===== Login Form =====
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (user.emailVerified) {
        alert(`Login successful! Redirecting to home page...`);
        loginForm.reset();
        window.location.href = "home.html"; // Redirect after successful login
      } else {
        alert(`Please verify your email first. Check your inbox for a verification email.`);
        auth.signOut(); // Sign out unverified user
      }
    })
    .catch((error) => {
      alert(error.message);
    });
});
