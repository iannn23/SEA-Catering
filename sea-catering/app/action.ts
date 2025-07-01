'use server';

import { db } from '@/db/drizzle';
import { subscriptions } from '@/db/schema';

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
      name,
      phoneNumber,
      plan,
      mealTypes,
      deliveryDays,
      allergies,
      totalPrice,
    });
    
    return { success: true, message: 'Subscription successful! Thank you.' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Subscription failed. Please try again.' };
  }
}