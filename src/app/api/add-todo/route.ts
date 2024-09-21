import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();
  try {
    if (!data.title || !data.description) {
      return { message: "title and description are required" };
    } else {
      const newTodo = await db.lists.create({
        data: {
          title: data.title,
          description: data.description,
        },
      });
      return NextResponse.json(newTodo, { status: 201 });
    }
  } catch (err) {
    console.log(err, "Api route error");
  }
  return new Response("Success", { status: 200 });
}
