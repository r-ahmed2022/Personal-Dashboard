class Tasks {
    tasklist = [];

     addTasks = () => {
       let id = this.tasklist.length + 1;
       const desc = document.getElementById('input-item').value;
       let completed = false;
       this.tasklist.push({
         index: id,
         description: desc,
         completed,
       });
       localStorage.setItem('tasks', JSON.stringify(this.tasklist));
       location.reload();
     }
}

export default Tasks;