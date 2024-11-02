import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Trash2, Edit2, X, Save } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSubmit = () => {
    if (editText.trim()) {
      onUpdate(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-all"
    >
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-colors
          ${todo.completed 
            ? 'bg-emerald-500 border-emerald-500' 
            : 'border-gray-300 dark:border-gray-600'}`}
      >
        {todo.completed && <Check className="w-full h-full text-white p-0.5" />}
      </button>

      {isEditing ? (
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-1 bg-gray-50 dark:bg-gray-700 px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <button
            onClick={handleSubmit}
            className="p-2 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-full"
          >
            <Save className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="p-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <>
          <div className="flex-1">
            <p className={`text-gray-800 dark:text-gray-200 ${todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}>
              {todo.text}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {formatDistanceToNow(new Date(todo.updatedAt), { addSuffix: true })}
            </p>
          </div>

          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
}