import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  const body = await request.json();
  const client = await clientPromise;
  const db = client.db("lintree");
  const collection = db.collection("links");

  const doc = await collection.findOne({ handle: body.handle})
  if (doc) {
    return Response.json({
      message: "Linktree already exists. Please choose another one.",
      success: false,
      error: true,
    });
  }

  const result = await collection.insertOne(body);
  return Response.json({
    message: "Your linktree has been generated. Enjoy!",
    success: true,
    result: result,
    error: false,
  });
}
