function changeSRC() {
    var img = document.getElementById("srchng");

    if (img.src.includes("1.png")) {
        img.src = "0.png";
    } else {
        img.src = "1.png";
    }
}
function changeSRC2() {
    var img = document.getElementById("srchng2");

    if (img.src.includes("Slider2/11.jpg")) {
        img.src = "Slider2/12.jpg";
    } else {
        img.src = "Slider2/11.jpg";
    }
}
function changeSRC3() {
    var img = document.getElementById("srchng3");

    if (img.src.includes("access/b1.webp")) {
        img.src = "access/b2.webp";
    } else {
        img.src = "access/b1.webp";
    }
}
function changeSRC4() {
    var img = document.getElementById("srchng4");

    if (img.src.includes("access/b3.webp")) {
        img.src = "access/b4.jpg";
    } else {
        img.src = "access/b3.webp";
    }
}
setInterval(changeSRC, 1200);
setInterval(changeSRC2, 1200);
setInterval(changeSRC3, 1200);
setInterval(changeSRC4, 1200);


// search input suggestions start from here

// footer subscribe button

document.addEventListener('DOMContentLoaded', function () {
    const subscribeBtn = document.getElementById('subscribeBtn');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', function () {
            var email = document.getElementById('emailInput').value;
            if (email) {
                document.getElementById('confirmationMessage').style.display = 'block';
                document.getElementById('userEmail').textContent = email;

                document.getElementById('emailInput').value = '';
                // Optionally, you can send the email to a server for saving it to a database
                // Example: sending the email to the server using fetch (not implemented in this example)
                // fetch('/subscribe', {
                //     method: 'POST',
                //     body: JSON.stringify({ email: email }),
                //     headers: { 'Content-Type': 'application/json' }
                // })
                // .then(response => response.json())
                // .then(data => {
                //     console.log(data);
                // });

            } else {
                alert('Please enter a valid email.');
            }
        });
    } else {
        console.error('Subscribe button not found!');
    }
});


// login page authentication

    // Check if the user is logged in when the page loads
    window.onload = function() {
        const userName = sessionStorage.getItem("userName");

        if (userName) {
            // Show username and hide the login button
            document.getElementById("loginNavItem").style.display = "none";
            document.getElementById("nameNavItem").style.display = "block";
            document.getElementById("logoutNavItem").style.display = "block";
            document.getElementById("userName").textContent = `Hello, ${userName}`;
        } else {
            // Show the login button and hide the logout button
            document.getElementById("loginNavItem").style.display = "block";
            document.getElementById("logoutNavItem").style.display = "none";
        }
    };

    // Login validation function (as an example)
    const users = [
        { email: "yash@gmail.com", password: "12345678", name: "Yash" },
        { email: "prabh@gmail.com", password: "password", name: "Prabh" },
        { email: "abc@gmail.com", password: "pass1234", name: "ABC" }
    ];

    function validateLogin(event) {
        event.preventDefault();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("pwd").value.trim();
        const user = users.find(u => u.email === email);

        if (user) {
            if (user.password === password) {
                
                sessionStorage.setItem("userName", user.name);
                showModal("Login successful!");
                
                
                setTimeout(() => {
                    window.location.href = "welcome_page.html";
                }, 1500);
            } else {
                showModal("Incorrect password. Please try again.");
            }
        } else {
            showModal("Sorry, this email is not registered.");
        }
    }

    function showModal(message) {
        const modalMessage = document.getElementById("modalMessage");
        modalMessage.textContent = message;

        const modal = new bootstrap.Modal(document.getElementById("loginModal"));
        modal.show();
    }

    // Logout functionality
    function logout() {
       
        sessionStorage.removeItem("userName");

       
        document.getElementById("loginNavItem").style.display = "block";
        document.getElementById("nameNavItem").style.display = "none";
        document.getElementById("logoutNavItem").style.display = "none";

        
        window.location.href = "welcome_page.html";
    }

