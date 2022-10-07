function createCell (text){
    const cell = document.createElement('td')
    cell.innerText = text;
    return cell;
}




function rendertask(tasks) {

const tablebody = document.querySelector('#tbody');
    tasks.forEach((task) => {
        const deleteButton = document.createElement('button')
        const trash = 'Delete'
        deleteButton.innerHTML = trash
        deleteButton.className ="deleteButton"
        const updateButton = document.createElement('button')
        updateButton.innerText = "Update"
        updateButton.className ="updateButton"
        const checkbox = document.createElement('input')
        checkbox.type = "checkbox"
        checkbox.className = "checkbox"
        checkbox.checked = task.completed;
        const searchButton = document.getElementById('searchButton');
        
       
        
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
    searchButton.addEventListener('click', () => {
            const searchid = document.getElementById('searchid').value;
            
            searchTask(searchid);
            
            
        });
};


    let tasksData;

function indextasks() {
    fetch('http://127.0.0.1:3000/auth/cookie/tasks', {
        credentials:'include'
    })
    .then((response) => 
    response.json()
    )
    .then((data) => {
        rendertask(data);
    })


};

function deleteTask(id) {
    fetch(`http://127.0.0.1:3000/auth/cookie/task/${id}`, {
        method: 'DELETE', 
        credentials: 'include'
        
        
    
    
    }).then((response) => 
    alert(`Task ${id} has been deleted`)
    
    )
};


function addTask(tasktitle) {
        if (tasktitle == '') {
            alert("No can't add an empty task")
        } else {
        fetch('http://127.0.0.1:3000/auth/cookie/tasks', {
        method: 'POST',
        credentials: 'include',
        headers: {
            
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            title: tasktitle
        })
        
    });  
    }
};

function searchTask (searchid) {              
    fetch(`http://127.0.0.1:3000/auth/cookie/task/${searchid}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            
         'Content-Type' : 'application/json'
         }
               
   }).then((response) => {
    if (response.status === 404) {
        alert("Diesen Eintrag gibt es nicht")
    }else {
       alert("Diesen Task gibt es")
    }
   })
};

function searchtaskshow (task) {
    const tbody = document.getElementById('tbody')

}

function updateTask (id,completed) {
    const taskupdatetitle = prompt("New Title");
    fetch('http://127.0.0.1:3000/auth/cookie/tasks', {
       method: 'PUT',
       credentials: 'include',
       headers: {
        
        'Content-Type' : 'application/json'
        },
       body: JSON.stringify({
        id : id,
        title : taskupdatetitle,
        completed : completed
       })
       
    });
};

function updateCheckbox(id,title,taskcompleted) {
        
    if (taskcompleted == true) {
        fetch('http://127.0.0.1:3000/auth/cookie/tasks', {
        method: 'PUT',
        credentials: 'include',
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
        fetch('http://127.0.0.1:3000/auth/cookie/tasks', {
            method: 'PUT',
            credentials: 'include',
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
        addTask(tasktitle);
    });

    

    
    
});

