import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';

interface DBUser {
    id: number
    email: string
    password: string
  }
 
async function getUser(email: string): Promise<DBUser | null> {
  try {
    const user = await sql<DBUser>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          throw new Error('Invalid credentials');
        }

        const { email, password } = parsedCredentials.data;

        const dbUser: DBUser | null = await getUser(email);

        if (!dbUser) {
          throw new Error('No user found');
        }

        const isValidPassword = await bcrypt.compare(password, dbUser.password);

        if (!isValidPassword) {
          throw new Error('Invalid password');
        }

        // Transform DBUser to User
        const user: User = {
          id: dbUser.id.toString(),
          email: dbUser.email,
        };

        return user;
      }}),
  ],
});