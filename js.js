function indextasks(){
    fetch('http://localhost:3000/auth/cookie/tasks', {
        credentials : 'include',
        headers: {
            'Content-Type' : 'application/json'
        }
    }).then ((response) => response.json())
    .then ((data) => rendertask(data))
}