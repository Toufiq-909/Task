'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, CheckCircle2, Circle } from 'lucide-react';

interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string, completed: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  loading?: boolean;
}

export function TaskList({ tasks, onToggle, onDelete, loading = false }: TaskListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const handleToggle = async (task: Task) => {
    setTogglingId(task._id);
    try {
      await onToggle(task._id, !task.completed);
    } finally {
      setTogglingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setDeletingId(id);
      try {
        await onDelete(id);
      } finally {
        setDeletingId(null);
      }
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-20 animate-fade-in">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center mx-auto mb-6">
          <Circle className="w-10 h-10 text-accent/30" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">No tasks yet</h3>
        <p className="text-muted-foreground max-w-sm mx-auto">Start by creating a new task to organize your work and stay productive.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-2xl font-bold text-foreground">Tasks</h2>
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary font-semibold text-sm rounded-full">
          {tasks.filter(t => !t.completed).length} active
        </span>
      </div>
      <div className="space-y-3">
        {tasks.map((task, index) => (
          <div
            key={task._id}
            className="group flex items-start gap-4 p-5 bg-white border border-border/40 rounded-xl hover:border-primary/30 hover:shadow-md hover:shadow-primary/10 transition-all duration-300 animate-slide-up"
            style={{
              animationDelay: `${index * 50}ms`,
              animation: `slideInUp 0.3s ease-out ${index * 0.05}s both`
            }}
          >
            <button
              onClick={() => handleToggle(task)}
              disabled={togglingId === task._id}
              className="mt-0.5 text-muted-foreground hover:text-primary transition-all duration-200 disabled:opacity-50 flex-shrink-0"
            >
              {task.completed ? (
                <CheckCircle2 className="w-6 h-6 text-accent" />
              ) : (
                <Circle className="w-6 h-6 hover:scale-110 transition-transform" />
              )}
            </button>

            <div className="flex-1 min-w-0 py-1">
              <h3
                className={`font-semibold text-lg transition-all duration-200 ${
                  task.completed
                    ? 'line-through text-muted-foreground/60'
                    : 'text-foreground'
                }`}
              >
                {task.title}
              </h3>
              {task.description && (
                <p
                  className={`text-sm mt-2 transition-all duration-200 ${
                    task.completed
                      ? 'line-through text-muted-foreground/40'
                      : 'text-muted-foreground'
                  }`}
                >
                  {task.description}
                </p>
              )}
            </div>

            <button
              onClick={() => handleDelete(task._id)}
              disabled={deletingId === task._id}
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200 disabled:opacity-50 flex-shrink-0 opacity-0 group-hover:opacity-100 p-2 rounded-lg"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
