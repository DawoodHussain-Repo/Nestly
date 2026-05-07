import { NextResponse } from "next/server";
import { SignupSchema } from "@/lib/validators";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = SignupSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.errors[0]?.message ?? "Invalid input";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { fullName, email, password } = parsed.data;

    // Simulate user creation
    const user = {
      id: `user-${Date.now()}`,
      name: fullName,
      email,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ data: user }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    console.error("[auth/signup]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
