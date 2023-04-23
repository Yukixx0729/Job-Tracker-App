const deleteToDo = (id) => {
    return axios.delete(`/todos/${id}`)
      .then(res => {
        console.log(res);
        renderToDoList();
      })
      .catch(err => {
        console.error(err);
      });
  }
  