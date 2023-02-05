
function showNotification(msg, type) {
  let bgColor;

  switch (type) {
    case "success":
      bgColor = "green";
      break
    case "error":
      bgColor = "red";
      break
    default:
      bgColor = "#000"
      break;

  }



  Toastify({
    text: msg,
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: bgColor,
    },

  }).showToast();
}

function getFieldValue(fieldId) {
  return document.getElementById(fieldId).value
}

function showOutput(output) {
  document.getElementById('output').innerHTML = output
}

function getRandomId() {
  return Math.random().toString(36).slice(2);
}

function setFieldValue(fieldId, value) {
  document.getElementById(fieldId).value = value
}

// -------------------------------------------------------------------------------


const handleSubmit = () => {
  event.preventDefault();

  let title = getFieldValue('title');
  let location = getFieldValue('location');
  let description = getFieldValue('description');

  title = title.trim();
  location = location.trim();
  description = description.trim();

  if (title.length < 3) {
    showNotification("Please Enter your Title", "error")
    return;
  }

  if (location.length < 3) {
    showNotification("Please Enter your Location", "error")
    return;
  }

  if (description.length < 3) {
    showNotification("Please Enter your Description", "error")
    return;
  }

  let todo = { title, location, description }

  todo.id = getRandomId()
  todo.dateCreated = new Date().getTime();
  todo.status = 'active'

  const todos = JSON.parse(localStorage.getItem('todos')) || [];

  todos.push(todo)

  localStorage.setItem("todos", JSON.stringify(todos))

  showNotification("A New todo has been successfully added.", "success")
  showTodos()
  emptyFieldValues();
  
}

function showTodos() {
  //  clearoutput()

  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  if (!todos.length) {
    showOutput('<h5 class=p-3>HURRAY! NO Task Available, Add a Task Button To Add Task.</h5>')
    return;
  }

  let tableStartingCode = '<div class = "table-responsive text-white"><table class="table">'
  let tableEndingCode = '</table></div>'

  let tableHead = '<thead class="text-white"><tr><th>#</th><th>Title</th><th>Location</th><th>Description</th><th>Action</th></tr></thead>'

  let tableBody = ''
  for (let i = 0; i < todos.length; i++) {
    let todo = todos[i];

    //  console.log(todo)

    // use back tik to right templatetiteral 
    tableBody += `<tr class = 'text-white'><th scope = 'row'>${i + 1}</th><td>${todo.title}</td><td>${todo.location}</td><td>${todo.description}</td><td><button class = 'btn btn-sm btn-info' data-value = "${todo.id}" onclick='editTodo(event)'>Edit</button><button class = 'btn btn-sm btn-danger ms-2' data-value = "${todo.id}" onclick='deleteTodo(event)'>Delete</button></td></tr>`
    // tableBody += '<tr><th>'+ (i+1) +'</th><td>'+todos[i].title+'</td></tr>'
  }

  let table = tableStartingCode + tableHead + "<tbody class = 'text-white'>" + tableBody + "</tbody>" + tableEndingCode
  showOutput(table)
}



// Empty field values

const emptyFieldValues = () => {
  document.getElementById('title').value = ''
  document.getElementById('location').value = ''
  document.getElementById('description').value = ''
}


// delete output

function deleteTodo(event) {
  let todoId = event.target.getAttribute('data-value')
  //  console.log(todoId)
  //  return
  const todos = JSON.parse(localStorage.getItem('todos'));
  let todoAfterDelete = todos.filter((todo) => {
    return todo.id !== todoId
  })

  localStorage.setItem("todos", JSON.stringify(todoAfterDelete));
  showNotification('A todo has been Deleted', 'success')
  showTodos()
}

// Edit todo

const editTodo = (event) => {

  let todoId = event.target.getAttribute('data-value')
  const todos = JSON.parse(localStorage.getItem('todos'))

  let todo = todos.find((todo) => {
    return todo.id === todoId
  })
  // console.log(todo)
  // return

  const { title, location, description } = todo

  setFieldValue('title', title)
  setFieldValue('location', location)
  setFieldValue('description', description)

  localStorage.setItem('todoForEdit', JSON.stringify(todo))

  document.getElementById('addtask').style.display = 'none'
  document.getElementById('edittask').style.display = 'block'
}

// const handleUpdated = () => {
   
//   const todoForEdit = JSON.parse(localStorage.getItem('todoForEdit'))
//   console.log(todoForEdit)
//   let updateTitle = getFieldValue('title')
//   let updateLocation = getFieldValue('location')
//   let updateDescription = getFieldValue('description')

//   const updatedTodo = {...todoForEdit, title:updateTitle, location:updateLocation, description:updateDescription
//   , dateModified: new Date().getDate()}
// }

const handleUpdated = todoList.map(todo => {
  if (todo.id === updatedTodo.id) {
    return updatedTodo;
  }
  return todo;
});
localStorage.setItem("todoList", JSON.stringify(updatedTodoList));