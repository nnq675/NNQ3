    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const categories = JSON.parse(localStorage.getItem('categories')) || [];

    function addTask() {
      const taskName = document.getElementById('task-name').value;
      const taskCategory = document.getElementById('task-category').value;

      if (taskName.trim() === '' || taskCategory.trim() === '') {
        alert('Please fill in all the required fields.');
        return;
      }

      const task = {
        name: taskName,
        category: taskCategory,
        status: 'Pending'
      };

      tasks.push(task);
      renderTasks();
      document.getElementById('task-name').value = '';
      document.getElementById('task-category').value = '';
      
      saveTasks();
    }

    function addCategory() {
      const categoryName = document.getElementById('category-name').value.trim();

      if (categoryName === '' || categories.includes(categoryName)) {
        alert('Please enter a unique category name.');
        return;
      }

      categories.push(categoryName);
      renderCategories();
      document.getElementById('category-name').value = '';

      saveCategory();
    }

    function renderTasks() {
      const taskList = document.getElementById('task-list');
      taskList.innerHTML = '<h2>Tasks</h2>';

      tasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task', task.status.toLowerCase().replace(' ', '-'));
        taskDiv.innerHTML = `
          <h3>${task.name}</h3>
          <p>Category: ${task.category}</p>
          <p>Status: ${task.status}</p>
          <button onclick="updateTaskStatus(${index})">Update Status</button>
        `;
        taskList.appendChild(taskDiv);
      });
    }

    function updateTaskStatus(index) {
      const task = tasks[index];
      switch (task.status) {
        case 'Pending':
          task.status = 'In Progress';
          break;
        case 'In Progress':
          task.status = 'Completed';
          break;
        case 'Completed':
          task.status = 'Pending';
          break;
      }
      renderTasks();

      saveTasks();
    }

    function renderCategories() {
      const categorySelect = document.getElementById('task-category');
      categorySelect.innerHTML = '<option value="">Select a category</option>';

      categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
      });
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function saveCategories() {
        localStorage.setItem('categories', JSON.stringify(categories));
    }
  
    renderTasks();
    renderCategories();