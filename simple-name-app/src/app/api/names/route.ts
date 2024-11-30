import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// Handle GET requests
export async function GET() {
  const client = await clientPromise;
  const db = client.db("simple-name-app");
  const names = await db.collection("names").find().toArray();
  return NextResponse.json(names);
}

// Handle POST requests
export async function POST(req: Request) {
  const client = await clientPromise;
  const db = client.db("simple-name-app");

  const { name } = await req.json();
  if (!name) {
    return NextResponse.json({ message: "Name is required" }, { status: 400 });
  }

  await db.collection("names").insertOne({ name });
  return NextResponse.json({ message: "Name added successfully" }, { status: 201 });
}
