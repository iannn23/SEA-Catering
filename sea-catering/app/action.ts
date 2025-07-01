'use server';

import { db } from '@/db/drizzle';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { subscriptions, users } from '@/db/schema';
import { signIn } from "@/auth";
import { signOut } from "@/auth";

type FormState = {
  success: boolean;
  message: string;
};

export async function createSubscription(
  previousState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const name = formData.get('name') as string;
    const phoneNumber = formData.get('phone') as string;
    const plan = formData.get('plan') as string;
    const mealTypes = formData.getAll('mealType') as string[];
    const deliveryDays = formData.getAll('deliveryDay') as string[];
    const allergies = formData.get('allergies') as string | undefined;
    const totalPrice = Number(formData.get('totalPrice'));

    if (!name || !phoneNumber || !plan || mealTypes.length === 0 || deliveryDays.length === 0) {
      return { success: false, message: 'Please fill all required fields.' };
    }

    await db.insert(subscriptions).values({
      name, phoneNumber, plan, mealTypes, deliveryDays, allergies, totalPrice,
    });
    
    return { success: true, message: 'Subscription successful! Thank you.' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Subscription failed. Please try again.' };
  }
}

const RegisterSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters")
    .refine(pass => /[A-Z]/.test(pass), 'Password must contain an uppercase letter')
    .refine(pass => /[a-z]/.test(pass), 'Password must contain a lowercase letter')
    .refine(pass => /[0-9]/.test(pass), 'Password must contain a number')
    .refine(pass => /[^A-Za-z0-9]/.test(pass), 'Password must contain a special character'),
});

export async function registerUser(previousState: FormState, formData: FormData) {
  const data = Object.fromEntries(formData.entries());

  const validated = RegisterSchema.safeParse(data);

  if (!validated.success) {
    return { success: false, message: validated.error.errors.map(e => e.message).join(', ') };
  }
  
  const { name, email, password } = validated.data;
  
  try {
    const existingUser = await db.query.users.findFirst({ where: eq(users.email, email) });
    if (existingUser) {
      return { success: false, message: "Email already in use." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      id: crypto.randomUUID(),
      name,
      email,
      password: hashedPassword,
    });

    return { success: true, message: "Registration successful! You can now log in." };
  } catch (error) {
    console.error('Registration Error:', error);
    return { success: false, message: "Something went wrong." };
  }
}

export async function loginUser(previousState: FormState, formData: FormData): Promise<FormState> {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      return { success: false, message: "Email and password are required." };
    }
    await signIn('credentials', { email, password });

    return { success: true, message: "Login successful!" };
  } catch (error) {
    if ((error as Error).message.includes('CredentialsSignin')) {
        return { success: false, message: 'Invalid email or password.' };
    }
    console.error(error);
    return { success: false, message: 'Something went wrong.' };
  }
}

export async function signOutAction() {
  'use server';
  await signOut({ redirectTo: '/' });
}