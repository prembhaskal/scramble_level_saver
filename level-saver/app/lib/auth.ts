import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth.config';

/**
 * Validates that the current session belongs to the authorized user
 * @returns session if valid, null if invalid
 */
export async function validateSession() {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user?.email !== 'pbhaskal@gmail.com') {
    return null;
  }
  
  return session;
}

/**
 * Returns an unauthorized response for API endpoints
 */
export function unauthorizedResponse() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

/**
 * Middleware function to check authentication for API routes
 * Usage: const session = await requireAuth(); if (!session) return unauthorizedResponse();
 */
export async function requireAuth() {
  const session = await validateSession();
  return session;
}
