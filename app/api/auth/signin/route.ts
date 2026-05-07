import { NextResponse } from "next/server";
import { SigninSchema } from "@/lib/validators";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = SigninSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.errors[0]?.message ?? "Invalid input";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { email } = parsed.data;

    // Simulate authentication
    const user = {
      id: "user-1",
      name: "Sarah Johnson",
      email,
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      verified: true,
      token: "mock-jwt-token",
    };

    return NextResponse.json({ data: user }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    console.error("[auth/signin]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
