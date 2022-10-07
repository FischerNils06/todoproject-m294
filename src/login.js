
function Checklogin() {
    fetch(`http://127.0.0.1:3000/auth/cookie/status`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type' : 'application/json'
        }

    }).then ((response) => {
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
        
        
        const email = getElementById('Email').value;
        const password = getElementById('Password').value;
         fetch(`http:127.0.0.1:3000/auth/cookie/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                email : email,
                password : password
            })
         });
   
};
function Logout() {
    fetch(`http:127.0.0.1:3000/auth/cookie/login`, {
        method: 'POST',
        credentials : 'include',
        headers: {
            'Content-Type' : 'application/json'
        },
     });
};

document.addEventListener('DOMContentLoaded', () => {
    Checklogin();
    document.getElementById('Loginbtn').addEventListener('click', (event) => {
        event.preventDefault();
        Login();
        Checklogin();
    });
    document.getElementById('Logoutbtn').addEventListener('click', () => {
        Logout();
        Checklogin();
    });
});

