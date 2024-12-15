import React, { useState } from 'react';
import { Task } from './types/task';
import { TaskCard } from './components/TaskCard';
import { TaskForm } from './components/TaskForm';
import { CheckCircle2, ClipboardList, LayoutDashboard } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (newTask: Omit<Task, 'id' | 'createdAt'>) => {
    setTasks([
      ...tasks,
      {
        ...newTask,
        id: crypto.randomUUID(),
        createdAt: new Date(),
      },
    ]);
  };

  const updateTaskStatus = (id: string, status: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const tasksByStatus = {
    todo: tasks.filter(task => task.status === 'todo'),
    'in-progress': tasks.filter(task => task.status === 'in-progress'),
    completed: tasks.filter(task => task.status === 'completed'),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="text-blue-500" size={24} />
            <h1 className="text-2xl font-bold text-gray-900">Task Management</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <TaskForm onSubmit={addTask} />
          </div>

          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Todo Column */}
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center gap-2 mb-4">
                  <ClipboardList className="text-gray-500" size={20} />
                  <h2 className="font-semibold text-gray-700">To Do</h2>
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                    {tasksByStatus.todo.length}
                  </span>
                </div>
                <div className="space-y-3">
                  {tasksByStatus.todo.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onStatusChange={updateTaskStatus}
                      onDelete={deleteTask}
                    />
                  ))}
                </div>
              </div>

              {/* In Progress Column */}
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center gap-2 mb-4">
                  <ClipboardList className="text-purple-500" size={20} />
                  <h2 className="font-semibold text-gray-700">In Progress</h2>
                  <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs">
                    {tasksByStatus['in-progress'].length}
                  </span>
                </div>
                <div className="space-y-3">
                  {tasksByStatus['in-progress'].map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onStatusChange={updateTaskStatus}
                      onDelete={deleteTask}
                    />
                  ))}
                </div>
              </div>

              {/* Completed Column */}
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="text-green-500" size={20} />
                  <h2 className="font-semibold text-gray-700">Completed</h2>
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
                    {tasksByStatus.completed.length}
                  </span>
                </div>
                <div className="space-y-3">
                  {tasksByStatus.completed.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onStatusChange={updateTaskStatus}
                      onDelete={deleteTask}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;