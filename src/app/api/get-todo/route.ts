import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const todoItems = await db.lists.findMany();
    console.log(todoItems, "items");
    return NextResponse.json(todoItems, { status: 200 });
  } catch (err) {
    console.log(err, "error");
  }
  return new Response("Success", { status: 200 });
}
