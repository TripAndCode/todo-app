import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(request: NextRequest, context: { params: any }) {
  try {
    const parsedId = parseInt(context.params.id);
    await prisma.todo.delete({
      where: { id: parsedId },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting todo:', error);
    return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 });
  }
}

export async function PATCH(request: Request, context: { params: any }) {
  try {
    // Use routeParams in your logic
    const parsedId = parseInt(context.params.id);
    const { completed, value } = await request.json();
    const updatedTodo = await prisma.todo.update({
      where: { id: parsedId },
      data: {
        ...(completed !== undefined && { completed }),
        ...(value !== undefined && { value }),
      },
    });
    return NextResponse.json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 });
  }
}
