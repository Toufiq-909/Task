'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';
import { tasksAPI } from '@/lib/api';
import { TaskForm } from '@/components/task-form';
import { TaskList } from '@/components/task-list';
import { ProtectedRoute } from '@/components/protected-route';
import { LogOut } from 'lucide-react';

interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, logout } = useAuth();
  const router = useRouter();

  // Fetch tasks on mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await tasksAPI.getTasks();
        setTasks(response.data);
        setError('');
      } catch (err: any) {
        setError('Failed to load tasks');
        console.error('Failed to fetch tasks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleCreateTask = async (title: string, description: string) => {
    try {
      const response = await tasksAPI.createTask(title, description);
      setTasks([response.data, ...tasks]);
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to create task');
    }
  };

  const handleToggleTask = async (id: string, completed: boolean) => {
    try {
      const response = await tasksAPI.updateTask(id, { completed });
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to update task');
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await tasksAPI.deleteTask(id);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to delete task');
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-background via-blue-50/20 to-accent/5">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/50 backdrop-blur-xl border-b border-border/30 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
            <div className="animate-slide-down">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/30"></div>
                <h1 className="text-3xl font-bold text-foreground">My Tasks</h1>
              </div>
              <p className="text-sm text-muted-foreground">Welcome, {user?.username}</p>
            </div>
            <Button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-medium bg-white border border-border/40 text-foreground hover:bg-muted/50 rounded-xl h-10 transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-12">
          {error && (
            <div className="mb-8 p-5 bg-destructive/8 border border-destructive/20 rounded-xl text-destructive text-sm font-medium animate-slide-up">
              {error}
            </div>
          )}

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Create Task Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <TaskForm onSubmit={handleCreateTask} loading={loading} />
              </div>
            </div>

            {/* Task List */}
            <div className="lg:col-span-2">
              {loading ? (
                <div className="flex items-center justify-center p-20 animate-fade-in">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-full border-3 border-primary/20 border-t-primary animate-spin"></div>
                    <p className="text-muted-foreground text-sm font-medium">Loading your tasks...</p>
                  </div>
                </div>
              ) : (
                <div className="animate-fade-in">
                  <TaskList
                    tasks={tasks}
                    onToggle={handleToggleTask}
                    onDelete={handleDeleteTask}
                  />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
