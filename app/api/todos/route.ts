import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const todos = await prisma.todo.findMany();
  return NextResponse.json(todos);
}

export async function POST(request: Request) {
  const { value } = await request.json();
  const todo = await prisma.todo.create({
    data: { value },
  });
  return NextResponse.json(todo);
}
