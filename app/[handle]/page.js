import Link from "next/link";
import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const handle = (await params).handle;
  const client = await clientPromise;
  const db = client.db("lintree");
  const collection = db.collection("links");

  const item = await collection.findOne({ handle });
  if(!item){
    return notFound();
  }
  const item2 = {
    _id: {
      $oid: "67599995c4aebfc4f73002fc",
    },
    links: [
      {
        link: "https://www.facebook.com/ramish.abubakar",
        linkText: "Facebook",
      },
      {
        link: "https://www.linkedin.com/in/ramish15/",
        linkText: "LinkedIn",
      },
    ],
    handle: "rbstech",
    pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBOl84Xjg4fmSnTA9I08I-eZzlEMMJ3ow8Fw&s",
  };
  return (
    <div className="bg-purple-400 min-h-screen flex justify-center ">
      {item && (
        <div className="photo flex flex-col  items-center py-10 gap-4">
          <img src={item.pic} className="rounded-full h-32 w-32" alt="" />
          <span className="font-bold text-xl">@{item.handle}</span>
          <span className="desc w-80 text-center">{item.desc}</span>
          <div className="links">
            {item.links.map((link, index) => {
              return (
                <Link key={index} target="_blank" href={link.link}>
                  {" "}
                  <div className="py-4 px-2 bg-purple-200 min-w-96 flex justify-center rounded-md my-3 shadow-lg">
                    {link.linkText}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
