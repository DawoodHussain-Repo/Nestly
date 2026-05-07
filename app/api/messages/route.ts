import { NextResponse } from "next/server";
import { MessageQuerySchema, MessageCreateSchema } from "@/lib/validators";

const mockConversations = [
  {
    id: "sarah",
    name: "Sarah Jenkins",
    property: "Modern Loft in Downtown",
    time: "10:42 AM",
    message: "Yes, the keys will be in the lockbox. Let me know...",
    unread: true,
    status: "online",
  },
  {
    id: "michael",
    name: "Michael Chen",
    property: "Beachfront Villa",
    time: "Yesterday",
    message: "Thanks for confirming the booking dates.",
    unread: false,
    status: "offline",
  },
  {
    id: "elena",
    name: "Elena Rodriguez",
    property: "Mountain Cabin",
    time: "Oct 12",
    message: "Is the parking spot included with the rental?",
    unread: false,
    status: "offline",
  },
];

const mockThreadMessages = [
  {
    id: "msg-1",
    senderId: "user-2",
    senderName: "Sarah Jenkins",
    content:
      "Hi there! I'm really looking forward to my stay next week. I just wanted to confirm if the check-in time is still 3:00 PM?",
    timestamp: "2026-05-07T10:30:00Z",
    isOwn: false,
  },
  {
    id: "msg-2",
    senderId: "user-1",
    senderName: "You",
    content:
      "Hello Sarah! Yes, check-in is at 3:00 PM. I'll send you the lockbox code the morning of your arrival.",
    timestamp: "2026-05-07T10:35:00Z",
    isOwn: true,
  },
  {
    id: "msg-3",
    senderId: "user-2",
    senderName: "Sarah Jenkins",
    content:
      "Perfect, thank you! One more question: is there a grocery store within walking distance?",
    timestamp: "2026-05-07T10:38:00Z",
    isOwn: false,
  },
  {
    id: "msg-4",
    senderId: "user-1",
    senderName: "You",
    content:
      "Yes, there's a Whole Foods about 3 blocks away down Main St. Very convenient.",
    timestamp: "2026-05-07T10:40:00Z",
    isOwn: true,
  },
];

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const raw = {
      conversationId: searchParams.get("conversationId") ?? undefined,
    };

    const parsed = MessageQuerySchema.safeParse(raw);
    const { conversationId } = parsed.success
      ? parsed.data
      : { conversationId: undefined };

    if (conversationId) {
      return NextResponse.json({ data: mockThreadMessages });
    }

    return NextResponse.json({ data: mockConversations });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    console.error("[messages/GET]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = MessageCreateSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.errors[0]?.message ?? "Invalid input";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { content } = parsed.data;

    const message = {
      id: `msg-${Date.now()}`,
      senderId: "user-1",
      senderName: "You",
      content,
      timestamp: new Date().toISOString(),
      isOwn: true,
    };

    return NextResponse.json({ data: message }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    console.error("[messages/POST]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
