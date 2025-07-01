import { signOutAction } from "@/app/action";

export function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
      >
        Sign Out
      </button>
    </form>
  );
}
