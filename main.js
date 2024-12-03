
document.addEventListener("DOMContentLoaded", function () {
    var userName = document.getElementById("userName");
    var userEmail = document.getElementById("userEmail");
    var userPass = document.getElementById("userPass");
    var signUp = document.getElementById("signUp");
    var login = document.getElementById("login");
    var Logout = document.getElementById("Logout");
    var welcUser = document.getElementById("welcUser");
    var wrong = document.getElementById("wrong");
  
    var userList = JSON.parse(localStorage.getItem("people")) || [];
  
    if (signUp) {
      signUp.addEventListener("click", function () {
        if (!userName.value || !userEmail.value || !userPass.value) {
          showError("Please Enter Your Informaition");
          return;
        }
  
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userEmail.value)) {
          showError("Invalid Email");
          return;
        }
  
        var existingUser = userList.find(function(user) {
          return user.uEmail === userEmail.value;
        });
        if (existingUser) {
          showError("Email already registered");
          return;
        }
  
        var newUser = {
          uName: userName.value,
          uEmail: userEmail.value,
          uPass: userPass.value,
        };
        userList.push(newUser);
        localStorage.setItem("people", JSON.stringify(userList));
  
        alert("Sign up successful! Go To Login");
        window.location.href = "index.html";
      });
    }
  

    if (login) {
      login.addEventListener("click", function () {
        if (!userEmail.value || !userPass.value) {
          showError("Please enter both email and password");
          return;
        }
  
        var user = userList.find(function(u) {
          return u.uEmail === userEmail.value && u.uPass === userPass.value;
        });
  
        if (user) {
          localStorage.setItem("currentUser", JSON.stringify(user));
          window.location.href = "home.html";
        } else {
          showError("Invalid email or password");
        }
      });
    }
  

    if (welcUser) {
      var currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (!currentUser) {
        alert("Please log in first");
        window.location.href = "login.html";
        return;
      }
  
      welcUser.textContent = "Welcome " + currentUser.uName ;
    }
  

    if (Logout) {
      Logout.addEventListener("click", function () {
        localStorage.removeItem("currentUser");
        window.location.href = "sign.html";
      });
    }
  
    function showError(message) {
      wrong.textContent = message;
      wrong.style.color = "#DC3543";
    }
  });
  