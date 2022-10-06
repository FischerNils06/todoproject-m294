function createCell (text){
    const cell = document.createElement('td')
    cell.innerText = text;
    return cell;
}




function rendertask(tasks) {

const tablebody = document.querySelector('tbody');
    tasks.forEach((task) => {
        const deleteButton = document.createElement('button')
        deleteButton.innerText = "Delete"
        deleteButton.className ="deleteButton"
        const updateButton = document.createElement('button')
        updateButton.innerText = "Update"
        updateButton.className ="updateButton"
        const checkbox = document.createElement('input')
        checkbox.type = "checkbox"
       
        
        const tableRow = document.createElement('tr');
        tableRow.appendChild(createCell(task.id));
        tableRow.appendChild(createCell(task.title));
        tableRow.appendChild(createCell(task.completed));
        tableRow.appendChild(checkbox)
        tableRow.appendChild(deleteButton);
        tableRow.appendChild(updateButton);
        
        tablebody.appendChild(tableRow);

        
        deleteButton.addEventListener('click', () => {
            deleteTask(task.id);
        });

        updateButton.addEventListener('click', () => {
            updateTask(task.id); 
        });

        checkbox.addEventListener('change', () => {
            updateCheckbox(task.id);
        });
        
    });
    
};


    let tasksData;
function indextasks() {
    fetch('http://Localhost:3000/tasks')
    .then((response) => 
    response.json()
    )
    .then((data) => {
        rendertask(data);
    })


};

function deleteTask(id) {
    fetch(`http://Localhost:3000/task/${id}`, {
        method: 'DELETE',
    
    
    }).then((response) => 
    alert(`Task ${id} has been deleted`)
    
    )
};


function createTask(tasktitle) {
    
        fetch('http://Localhost:3000/tasks', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            title: tasktitle
        })
        
    });  
    
};

function searchTask (id) {              
                
};

function updateTask (id) {
    const taskupdatetitle = prompt("New Title");
    fetch('http://Localhost:3000/tasks', {
       method: 'PUT',
       headers: {
        'Content-Type' : 'application/json'
        },
       body: JSON.stringify({
        id : id,
        title : taskupdatetitle
       })
       
    });
};

function updateCheckbox(id) {
    
    fetch('http://Localhost:3000/tasks', {
       method: 'PUT',
       headers: {
        'Content-Type' : 'application/json'
        },
       body: JSON.stringify({
        id : id,
        title : taskupdatecheckbox
       })
       
    });
};



document.addEventListener("DOMContentLoaded", () => {
indextasks();
    document.getElementById('addButton').addEventListener('click', () => {
        const tasktitle = document.getElementById('tasktext').value;
        createTask(tasktitle);
    });

    document.getElementById('searchButton').addEventListener('click', () => {
        const searchid = document.getElementById('searchid').value;
        searchTask(searchid);
    });

    
});

