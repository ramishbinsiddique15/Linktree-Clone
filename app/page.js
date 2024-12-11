"use client"
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [text, setText] = useState("")
  const createTree = () => {
    router.push(`/generate?handle=${text}`)
  }
  
  return (
    <main>
      <section className="bg-[#254f1a] min-h-screen grid grid-cols-2">
        <div className="text-[#d2e823] flex gap-5  items-start relative top-32 flex-col ml-[10vw]">
          <div>
          <p className="font-bold text-5xl">Everything you</p>
          <p className="font-bold text-5xl">are. In one,</p>
          <p className="font-bold text-5xl">simple link in bio.</p>
          </div>
          <p className="text-lg">
            Join 50M+ people using Linktree for their link in bio. One link to
            help you share everything you create, curate and sell from your
            Instagram, TikTok, Twitter, YouTube and other social media profiles.
          </p>
          <div className="input flex gap-2 text-black">
            <input value={text} onChange={(e)=>setText(e.target.value)} type="text" placeholder="Enter your handle" className="bg-gray-200 p-4 rounded-lg font-semibold focus:outline-green-800"/>
            <button onClick={createTree} className="bg-pink-300 p-4 rounded-full font-semibold">Claim your linktree</button>
          </div>
        </div>
        <div className="mr-[10vw] flex items-end justify-center">
          <img src="/home.png" alt="home" />
        </div>
      </section>
    </main>
  );
}
