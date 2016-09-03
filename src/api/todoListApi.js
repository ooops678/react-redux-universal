
const delay = 500;

const todoList = [
  {
    id: '1',
    level: 'high',
    target: 'setup dev env'
  },
  {
    id: '2',
    level: 'medium',
    target: 'build example of react universal'
  },
  {
    id: '3',
    level: 'low',
    target: 'git my example'
  }
];

//This would be performed on the server in a real app. Just stubbing in.
const generateId = () => {
    return Number(todoList[todoList.length - 1].id)  + 1 + '';
};

class todoListApi {
  static getAllTodo() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], todoList));
      }, delay);
    });
  }

  static saveTodo(todo) {
    todo = Object.assign({}, todo);  
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (todo.target === '') {
          reject(`No target for todo.`);
        }
        if (todo.id) {
          const existIndex = todoList.findIndex(a => a.id == todo.id);
          todoList.splice(existIndex, 1, todo);
        } else {
          todo.id = generateId(todo);
          todoList.push(todo);
        }
        resolve(todo);
      }, delay);
    });
  }

  static deleteTodo(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfTodoToDelete = todoList.findIndex(todo => {
          todo.id == id;
        });
        todoList.splice(indexOfTodoToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default todoListApi;