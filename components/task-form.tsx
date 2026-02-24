'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TaskFormProps {
  onSubmit: (title: string, description: string) => Promise<void>;
  loading?: boolean;
}

export function TaskForm({ onSubmit, loading = false }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      await onSubmit(title, description);
      setTitle('');
      setDescription('');
    } catch (err: any) {
      setError(err.message || 'Failed to create task');
    }
  };

  return (
    <Card className="border border-border/40 bg-gradient-to-b from-white/90 to-white/80 backdrop-blur-xl shadow-lg shadow-primary/10 rounded-2xl sticky top-28">
      <CardHeader className="pb-5">
        <CardTitle className="text-2xl font-bold text-foreground">Create task</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-4 bg-destructive/8 border border-destructive/20 rounded-lg text-sm text-destructive font-medium animate-slide-up">
              {error}
            </div>
          )}

          <div className="space-y-3">
            <Label htmlFor="title" className="text-sm font-semibold text-foreground">Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="What's on your mind?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white border-border/60 rounded-xl h-11 text-sm placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
              required
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="description" className="text-sm font-semibold text-foreground">Details</Label>
            <Textarea
              id="description"
              placeholder="Add more context... (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-white border-border/60 rounded-xl resize-none text-sm placeholder:text-muted-foreground/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
              rows={4}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-primary to-primary/90 hover:shadow-lg hover:shadow-primary/20 text-primary-foreground font-semibold py-2.5 h-11 rounded-xl transition-all duration-200 text-base mt-6"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                Creating...
              </span>
            ) : 'Create task'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
