'use server';

export async function sendResetCode(email: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/forgotPasswords`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
    cache: 'no-store',
  });
const data = await res.json();

  console.log("DEBUG: ForgotPassword error response:", data);

  if (!res.ok) {
    throw new Error(data?.message || 'Failed To Send Code');
  }

  return data;
}


export async function verifyResetCode(resetCode: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/verifyResetCode`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resetCode }),
    cache: 'no-store',
  });

 const data = await res.json();

  console.log("DEBUG: ForgotPassword error response:", data);

  if (!res.ok) {
    throw new Error(data?.message || 'Failed To Send Code');
  }

  return data;
}


export async function resetPassword(email: string, resetCode: string, password: string) {
  const res = await fetch(`${process.env.API_URL}/api/v1/auth/resetPassword`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, resetCode, newPassword: password }),
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Failed to change password");
  }

  return data;
}
