import TodoList from '@/components/TodoList';
import { Suspense } from 'react';

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="container mx-auto p-4">
        <TodoList />
      </main>
    </Suspense>
  );
}
