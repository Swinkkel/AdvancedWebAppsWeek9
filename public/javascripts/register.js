if(document.readyState !== "loading"){
    console.log("Document is ready");
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function(){
        console.log("Document ready after waiting!");
        initializeCode();
    })
}

function initializeCode() {
    document.getElementById('registerForm').addEventListener('submit', async function(event) {
        console.log("Submit clicked");
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const response = await fetch(form.action, {
            method: form.method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            window.location.href = "/login.html";
        } else {
            const errorData = await response.json();
            alert(`Registration failed: ${errorData.errors ? errorData.errors.map(e => e.msg).join(', ') : errorData.email}`);
        }
    });
}