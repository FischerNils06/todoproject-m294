function createCell (text){
    const cell = document.createElement('td')
    cell.innerText = text;
    return cell;
}


const deleteButton = document.createElement('button')
deleteButton.innerText = "Delete"

function rendertask(tasks) {

const tablebody = document.querySelector('tbody');
    tasks.forEach((task) => {
        const tableRow = document.createElement('tr');
        tableRow.appendChild(createCell(task.id));
        tableRow.appendChild(createCell(task.title));
        tableRow.appendChild(createCell(task.completed));
        tableRow.appendChild(deleteButton);
        tablebody.appendChild(tableRow);
    });
}


    let tasksData;
function indextasks() {
    fetch('http://Localhost:3000/tasks')
    .then((response) => 
    response.json()
    )
    .then((data) => {
        rendertask(data);
    })


}

function createTask(task) {
    
        fetch('http://Localhost:3000/tasks', {
        method: 'Post',
        headers: {
            'Content-Type' : 'application/json'
        } ,
        body: JSON.stringify({
            title : tasktitle
        })
        
    });
    
    
    
    
};



document.addEventListener("DOMContentLoaded", () => {
indextasks();
    document.getElementById('addButton').addEventListener('click', () => {
    
        tasktitle = document.getElementById('tasktext').value;
    
        createTask(tasktitle);

    });
});

