function createCell (text){
    const cell = document.createElement('td')
    cell.innerText = text;
    return cell;
}




function rendertask(tasks) {

const tablebody = document.querySelector('#tbody');
    tasks.forEach((task) => {
        const deleteButton = document.createElement('button')
        deleteButton.innerText = "Delete"
        deleteButton.className ="deleteButton"
        const updateButton = document.createElement('button')
        updateButton.innerText = "Update"
        updateButton.className ="updateButton"
        const checkbox = document.createElement('input')
        checkbox.type = "checkbox"
        checkbox.className = "checkbox"
        checkbox.checked = task.completed;
        
       
        
        const tableRow = document.createElement('tr');
        tableRow.className = 'tableRow'
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
            updateTask(task.id, task.completed); 
        });

        checkbox.addEventListener('change', () => {
            updateCheckbox(task.id, task.title, task.completed);
        });
        
    });
    
};


    let tasksData;
function indextasks() {
    fetch('http://127.0.0.1:3000/tasks')
    .then((response) => 
    response.json()
    )
    .then((data) => {
        rendertask(data);
    })


};

function deleteTask(id) {
    fetch(`http://127.0.0.1:3000/task/${id}`, {
        method: 'DELETE',
    
    
    }).then((response) => 
    alert(`Task ${id} has been deleted`)
    
    )
};


function createTask(tasktitle) {
    
        fetch('http://127.0.0.1:3000/tasks', {
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
    fetch(`http://127.0.0.1:3000/task/${id}`, {
        method: 'GET',
        headers: {
         'Content-Type' : 'application/json'
         }
               
   });
};

function updateTask (id,completedtask) {
    const taskupdatetitle = prompt("New Title");
    fetch('http://127.0.0.1:3000/tasks', {
       method: 'PUT',
       headers: {
        'Content-Type' : 'application/json'
        },
       body: JSON.stringify({
        id : id,
        title : taskupdatetitle,
        completed : completedtask
       })
       
    });
};

function updateCheckbox(id,title,taskcompleted) {
        
    if (taskcompleted == true) {
        fetch('http://127.0.0.1:3000/tasks', {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json'
            },
        body: JSON.stringify({
            id : id,
            title : title,
            completed : false
        })
    
        }).then(window.location.reload())
    } else {
        fetch('http://127.0.0.1:3000/tasks', {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json'
                },
            body: JSON.stringify({
                id : id,
                title : title,
                completed : true
            })
        
            }).then(window.location.reload())
    }
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

