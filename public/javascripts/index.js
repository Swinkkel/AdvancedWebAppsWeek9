if (document.readyState !== "loading") {
    console.log("Document is ready");
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function() {
        console.log("Document ready after waiting!");
        initializeCode();
    })
}

function initializeCode() {
    const token = localStorage.getItem('auth_token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const contentDiv = document.getElementById('content');
      contentDiv.innerHTML = `
        <p>Welcome, ${payload.email}</p>
        <button id="logout">Logout</button>
      `;
      
      document.getElementById('logout').addEventListener('click', () => {
        localStorage.removeItem('auth_token');
        location.reload();
      });
    } else {
      const contentDiv = document.getElementById('content');
      contentDiv.innerHTML = `
        <a href="/login.html">Login</a>
        <a href="/register.html">Register</a>
      `;
    }
}