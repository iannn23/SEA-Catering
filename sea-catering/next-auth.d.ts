import { type DefaultSession } from 'next-auth';

// Augment (perluas) tipe data bawaan dari NextAuth
declare module 'next-auth' {
  /**
   * Mendefinisikan ulang tipe User dan Session untuk menyertakan `role`.
   */
  interface Session {
    user: {
      /** Properti role yang kita tambahkan */
      role?: string | null;
    } & DefaultSession['user']; // Tetap pertahankan properti user bawaan
  }

  interface User {
    /** Properti role yang kita tambahkan */
    role?: string | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    /** Properti role yang kita tambahkan */
    role?: string | null;
  }
}