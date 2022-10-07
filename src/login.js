
function Checklogin() {
    fetch(`http://127.0.0.1:3000/auth/cookie/status`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            
            'Content-Type': 'application/json'
        }

    }).then((response) => {
        const login = document.getElementById('login')
        const logout = document.getElementById('logout')

        if (response.status === 401) {
            logout.classList.add('hidden')
            login.classList.remove('hidden')


        } else {
            login.classList.add('hidden')
            logout.classList.remove('hidden')
        }
    });


};



function Login() {

    const password = document.getElementById('Password').value;
    const email = document.getElementById('Email').value;

    fetch(`http://127.0.0.1:3000/auth/cookie/login`, {
        method: 'POST',
        credentials : 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    }).then((response) => {
        if (response.status === 200) {
            window.location.href = "index.html"


        } else if(response.status === 400) {
            alert("Wrong Password")
        }
         else {

            throw new Error("Invalid Credentials")
        }

        
    })

};

function Logout() {
    fetch(`http:127.0.0.1:3000/auth/cookie/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
    });
};

document.addEventListener('DOMContentLoaded', () => {
    Checklogin();
    document.getElementById('Loginbtn').addEventListener('click', () => {
        
        Login();
        Checklogin();
    });
    
});

