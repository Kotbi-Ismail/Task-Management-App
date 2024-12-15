import React from 'react';
import { Task } from '../types/task';
import { Clock, Flag, User } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onStatusChange: (id: string, status: Task['status']) => void;
  onDelete: (id: string) => void;
}

const priorityColors = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

const statusColors = {
  'todo': 'bg-gray-100',
  'in-progress': 'bg-purple-100',
  'completed': 'bg-green-100',
};

export function TaskCard({ task, onStatusChange, onDelete }: TaskCardProps) {
  return (
    <div className={`p-4 rounded-lg shadow-sm border ${statusColors[task.status]} transition-all`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-800">{task.title}</h3>
        <button
          onClick={() => onDelete(task.id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          ×
        </button>
      </div>
      
      <p className="text-gray-600 text-sm mb-3">{task.description}</p>
      
      <div className="flex items-center gap-4 text-sm">
        <div className={`px-2 py-1 rounded-full ${priorityColors[task.priority]} text-xs font-medium flex items-center gap-1`}>
          <Flag size={12} />
          {task.priority}
        </div>
        
        {task.assignee && (
          <div className="flex items-center gap-1 text-gray-600">
            <User size={14} />
            <span>{task.assignee}</span>
          </div>
        )}
        
        <div className="flex items-center gap-1 text-gray-600">
          <Clock size={14} />
          <span>{new Date(task.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
      
      <div className="mt-3">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value as Task['status'])}
          className="w-full p-2 rounded border bg-white text-sm"
        >
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
}