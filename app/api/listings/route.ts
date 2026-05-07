import { NextResponse } from "next/server";
import { ListingQuerySchema } from "@/lib/validators";

const mockListings = [
  {
    id: "1",
    name: "Modern Loft Downtown",
    location: "New York, NY",
    price: 185,
    rating: 4.92,
    reviews: 28,
    beds: 1,
    baths: 1,
    type: "Studio",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=400&fit=crop",
  },
  {
    id: "2",
    name: "Beachfront Villa",
    location: "Malibu, CA",
    price: 850,
    rating: 4.96,
    reviews: 45,
    beds: 4,
    baths: 3,
    type: "Villa",
    image:
      "https://images.unsplash.com/photo-1512917774080-9b274b3c4a7f?w=500&h=400&fit=crop",
  },
  {
    id: "3",
    name: "Mountain Cabin Retreat",
    location: "Aspen, CO",
    price: 210,
    rating: 4.85,
    reviews: 32,
    beds: 2,
    baths: 1,
    type: "Cabin",
    image:
      "https://images.unsplash.com/photo-1505873242700-f289a29e7e0a?w=500&h=400&fit=crop",
  },
  {
    id: "4",
    name: "Seaside Cottage",
    location: "Santorini, Greece",
    price: 320,
    rating: 4.88,
    reviews: 52,
    beds: 2,
    baths: 2,
    type: "Beach",
    image:
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=500&h=400&fit=crop",
  },
  {
    id: "5",
    name: "Urban Studio",
    location: "Los Angeles, CA",
    price: 155,
    rating: 4.79,
    reviews: 18,
    beds: 1,
    baths: 1,
    type: "Studio",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=400&fit=crop",
  },
  {
    id: "6",
    name: "Luxury Penthouse",
    location: "Miami, FL",
    price: 550,
    rating: 4.94,
    reviews: 67,
    beds: 3,
    baths: 3,
    type: "Penthouse",
    image:
      "https://images.unsplash.com/photo-1512917774080-9b274b3c4a7f?w=500&h=400&fit=crop",
  },
  {
    id: "7",
    name: "Forest Lodge",
    location: "Portland, OR",
    price: 225,
    rating: 4.87,
    reviews: 41,
    beds: 3,
    baths: 2,
    type: "Cabin",
    image:
      "https://images.unsplash.com/photo-1505873242700-f289a29e7e0a?w=500&h=400&fit=crop",
  },
  {
    id: "8",
    name: "Desert Villa",
    location: "Scottsdale, AZ",
    price: 380,
    rating: 4.91,
    reviews: 35,
    beds: 2,
    baths: 2,
    type: "Villa",
    image:
      "https://images.unsplash.com/photo-1512917774080-9b274b3c4a7f?w=500&h=400&fit=crop",
  },
];

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const raw = {
      type: searchParams.get("type") ?? undefined,
      location: searchParams.get("location") ?? undefined,
    };

    const parsed = ListingQuerySchema.safeParse(raw);
    const { type, location } = parsed.success
      ? parsed.data
      : { type: undefined, location: undefined };

    let results = [...mockListings];

    if (type && type !== "All Types") {
      results = results.filter((l) => l.type === type);
    }

    if (location) {
      results = results.filter((l) =>
        l.location.toLowerCase().includes(location.toLowerCase()),
      );
    }

    return NextResponse.json({ data: results });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    console.error("[listings/GET]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
