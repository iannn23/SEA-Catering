import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { db } from "@/db/drizzle"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        
        if (!credentials.email || !credentials.password) {
          console.log("LOG 1: Email atau password tidak ada.");
          return null;
        }
        
        const email = (credentials.email as string).toLowerCase();
        const password = credentials.password as string;

        console.log(`LOG 2: Mencari user dengan email: ${email}`);

        const user = await db.query.users.findFirst({
          where: eq(users.email, email),
        });
        
        if (!user) {
          console.log("LOG 3: User tidak ditemukan di database.");
          return null;
        }

        console.log("LOG 4: User ditemukan:", { id: user.id, name: user.name, email: user.email });
        
        if (!user.password) {
          console.log("LOG 5: User ditemukan, tetapi tidak memiliki password di database.");
          return null;
        }

        console.log("LOG 6: Membandingkan password yang diinput dengan hash di database...");

        const isPasswordValid = await bcrypt.compare(
          password,
          user.password
        );

        console.log(`LOG 7: Hasil perbandingan password: ${isPasswordValid}`);

        if (!isPasswordValid) {
          console.log("LOG 8: Password tidak cocok.");
          return null;
        }

        console.log("--- LOGIN BERHASIL ---");
        return user;
      },
    }),
  ],
   callbacks: {
      async jwt({ token, user }) {
         if (user) {
         token.id = user.id;
         token.role = user.role; 
         }
         return token;
      },
      async session({ session, token }) {
         if (session.user) {
         session.user.id = token.id as string;
         session.user.role = token.role as string; 
         }
         return session;
      },
   },
  pages: {
    signIn: '/login',
  },
});