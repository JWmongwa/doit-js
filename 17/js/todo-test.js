//addTodo와 getLocal 사이 중복 부분을 displayTool로 대체하는 테스트 코드const todoInput = document.querySelector("#todo-input")
const todoInput = document.querySelector("#todo-input")
const addButton = document.querySelector("#add-button");
const todoList = document.querySelector("#todo-list")

//로컬 스토리지에 저장된 내용을 자동으로 불러오는 이벤트 처리기
document.addEventListener("DOMContentLoaded", getLocal);
//추가 버튼 누를시 todoList에 내용 올리고 LS(Local Storage)에 저장하는 이벤트 처리기
addButton.addEventListener("click", addTodo); 
//버튼 클릭시 처리하는 이벤트 리스너
todoList.addEventListener("click", manageTodo);

//form에 존재하는 todo-input에 넣을 데이터 처리하기
function addTodo(e){
    e.preventDefault();

    displayTool(todoInput.value);
    saveToLocal(todoInput.value);
    todoInput.value = "";

}

//3. Local Storage에 todo 목록을 저장하는 함수
function saveToLocal(todo){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

//로컬 저장소에 있는 내용이 존재하면 긁어와서 화면에 띄우기
function getLocal(){
    let todos;
    if(localStorage.getItem('todos') == null){
        todos=[];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function (todo){
        displayTool(todo);
        todoInput.value = "";
    });
}

//큰 줄기인 todo라는 div안에 있는 두 버튼 중 뭐가 눌렸는지 -> 스타일 토글 또는 로컬 스토리지 & 웹 화면에서 삭제하기
function manageTodo(e){
    const whichButton = e.target.classList[0];//클릭한 버튼 클래스명 가져오기
    if(whichButton === 'complete-button'){
        const todo = e.target.parentElement;
        todo.children[0].classList.toggle('completed');
    } else if(whichButton === 'delete-button'){
        const todo = e.target.parentElement;
        removeLocal(todo);
        todo.remove();
    }

}

//로컬 저장소에서 지우는 함수
function removeLocal(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos=[];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    
    //삭제하고싶은 일의 인덱스 알아내기
    const index = todos.indexOf(todo.children[0].innerText);
    //삭제부
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function displayTool(todoText){
    const newDiv = document.createElement('div');
    newDiv.classList.add('todo');
    const newTodo = document.createElement('li');
    newTodo.innerText = todoText;
    newTodo.classList.add('todo-content');
    newDiv.appendChild(newTodo);

    const completeButton = document.createElement('button');
    completeButton.innerText = '완료';
    completeButton.classList.add('complete-button');
    newDiv.appendChild(completeButton);

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "삭제";
    deleteButton.classList.add('delete-button');
    newDiv.appendChild(deleteButton);
    todoList.appendChild(newDiv);
}