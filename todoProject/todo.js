
//element secmece
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();


function eventListeners(){ //event listeners

form.addEventListener("submit",addTodo);
document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
secondCardBody.addEventListener("click",deleteTodo);
filter.addEventListener("keyup",filterTodos);
clearButton.addEventListener("click",clearAllTodos);

}
function clearAllTodos(e){
    if(confirm("Emin misin ?")){

        //arayuzden todolari silme
        //todoList.innerHTML = ""; // yavas yol
       while(todoList.firstElementChild != null){
           todoList.removeChild(todoList.firstElementChild);

       }

       localStorage.removeItem("todos");

    }





}

function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLocaleLowerCase();
        if(text.indexOf(filterValue) === -1){
            //bulamazsa

            listItem.setAttribute("style","display: none !important");
        }
        else{
            listItem.setAttribute("style","display : block");
        }


    })


}

function deleteTodo(e){

    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent)
        showAlert("success","todo silindi..");
    }

}

function deleteTodoFromStorage(deletetodo){

    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index){
        if(todo === deletetodo){
            todos.splice(index,1); // element delete from array
        }
    })

    localStorage.setItem("todos",JSON.stringify(todos));
}

function loadAllTodosToUI(){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}



function addTodo(e){

    const newTodo = todoInput.value.trim();
    console.log(newTodo);
    console.log(JSON.parse(localStorage.getItem("todos")));

    if(JSON.parse(localStorage.getItem("todos")).includes(newTodo)){
        showAlert("danger","farkli bir todo girin !");
    }

    else if(newTodo === ""){
       
        showAlert("danger","todo girin !");
    }
    else{
    addTodoToUI(newTodo);
    addTodoToStorage(newTodo);
    showAlert("success","todo eklendi !");
    }



e.preventDefault();
}

function getTodosFromStorage(){ // storagedan todos


    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    return todos;

}


function addTodoToStorage(newTodo){

    let todos = getTodosFromStorage();

    todos.push(newTodo);
   
    localStorage.setItem("todos",JSON.stringify(todos));

}



function showAlert(type,message){
    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    firstCardBody.appendChild(alert);
    //setTimeout

    setTimeout(function(){
        alert.remove();
    },2000)


}



function addTodoToUI(newTodo){//string degerini list item olarak ui olarak eklicek

/*

<li class="list-group-item d-flex justify-content-between">
                            Todo 1
                            <a href = "#" class ="delete-item">
                                <i class = "fa fa-remove"></i>
                            </a>

                        </li>


*/
//list olusturma
const listItem = document.createElement("li");
//link olusturma
const link = document.createElement("a");
link.href = "#";
link.className = "delete-item";
link.innerHTML = "<i class = 'fa fa-remove'></i>";



listItem.className = "list-group-item d-flex justify-content-between";

//textNode ekleme
listItem.appendChild(document.createTextNode(newTodo));
listItem.appendChild(link);

//todolist e list item i ekleme

todoList.appendChild(listItem);


todoInput.value = "";


}