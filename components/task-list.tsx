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
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardContent className="pt-16 pb-16">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Circle className="w-8 h-8 text-accent/40" />
            </div>
            <p className="text-muted-foreground">No tasks yet. Create one to get started!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-lg font-semibold text-foreground">Your tasks</h2>
        <span className="text-sm text-muted-foreground">{tasks.length} task{tasks.length !== 1 ? 's' : ''}</span>
      </div>
      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="group flex items-start gap-3 p-4 bg-card border border-border/40 rounded-lg hover:border-border hover:shadow-sm transition-all duration-200"
          >
            <button
              onClick={() => handleToggle(task)}
              disabled={togglingId === task._id}
              className="mt-1 text-muted-foreground hover:text-primary transition-colors disabled:opacity-50 flex-shrink-0"
            >
              {task.completed ? (
                <CheckCircle2 className="w-5 h-5 text-accent" />
              ) : (
                <Circle className="w-5 h-5" />
              )}
            </button>

            <div className="flex-1 min-w-0">
              <h3
                className={`font-medium transition-all ${
                  task.completed
                    ? 'line-through text-muted-foreground'
                    : 'text-foreground'
                }`}
              >
                {task.title}
              </h3>
              {task.description && (
                <p
                  className={`text-sm mt-1 transition-all ${
                    task.completed
                      ? 'line-through text-muted-foreground/60'
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
              className="text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50 flex-shrink-0 opacity-0 group-hover:opacity-100"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
