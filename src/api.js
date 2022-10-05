
document.addEventListener("DOMContentLoaded", () => {
fetch('http://localhost:3000/#tasksGet')
.then((response) => response.json())
.then((response) => {
    
    return response.json()
});

});
