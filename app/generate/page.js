"use client";

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";

const Page = () => {
  // const [link, setLink] = useState("");
  // const [linkText, setLinkText] = useState("");
  const searchParams = useSearchParams();

  const [links, setLinks] = useState([{ link: "", linkText: "" }]);
  const [handle, setHandle] = useState(searchParams.get("handle"));
  const [pic, setPic] = useState("");
  const [desc, setDesc] = useState("");


  const setLink = (index, link, linkText) => {
    setLinks((initialLinks) =>
      initialLinks.map((item, i) => {
        if (i === index) {
          return { link, linkText };
        } else {
          return item;
        }
      })
    );
  };

  const addLink = () => {
    setLinks(links.concat([{ link: "", linkText: "" }]));
  };
  const submitLinks = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      links: links,
      handle: handle,
      pic: pic,
      desc: desc,
    });
    console.log(raw);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const r = await fetch("http://localhost:3000/api/add", requestOptions);
    const result = await r.json();
    if (result.success) {
      toast.success(result.message);
      setLinks([{ link: "", linkText: "" }]);
      setHandle("");
      setPic("");
      setDesc("");
    } else toast.error(result.message);
  };
  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 min-h-screen flex items-center justify-center">
      {/* Main Content */}
      <ToastContainer />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 w-full max-w-5xl px-4">
        {/* Left Section */}
        <div className="flex flex-col items-center justify-center">
          <div className="bg-white p-8 mt-32 rounded-lg shadow-lg w-full max-w-md">
            <h1 className="font-bold text-3xl text-gray-800 mb-6 text-center">
              Create Your Linktree
            </h1>
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="font-semibold text-xl text-gray-700 mb-2">
                  Step 1: Claim your handle
                </h2>
                <input
                  value={handle || ""}
                  onChange={(e) => setHandle(e.target.value)}
                  className="px-4 py-3  border-slate-500 w-full border rounded-md focus:ring-2 focus:ring-blue-400 shadow-sm"
                  type="text"
                  placeholder="Choose a handle"
                />
              </div>
              <h2 className="font-semibold text-xl text-gray-700 mb-2">
                Step 2: Add your links
              </h2>
              {links &&
                links.map((item, index) => {
                  return (
                    <div key={index}>
                      <div>
                        <input
                          value={item.linkText || ""}
                          onChange={(e) =>
                            setLink(index, item.link, e.target.value)
                          }
                          className="px-4 py-3  border-slate-500 w-full border rounded-md focus:ring-2 focus:ring-blue-400 shadow-sm mb-4"
                          type="text"
                          placeholder="Enter link text"
                        />
                        <input
                          value={item.link || ""}
                          onChange={(e) =>
                            setLink(index, e.target.value, item.linkText)
                          }
                          className="px-4 py-3  border-slate-500 w-full border rounded-md focus:ring-2 focus:ring-blue-400 shadow-sm"
                          type="text"
                          placeholder="Enter link"
                        />
                      </div>
                    </div>
                  );
                })}

              <button
                onClick={() => addLink()}
                className="px-5 py-3 bg-blue-500 text-white font-semibold w-full rounded-md mt-4 hover:bg-blue-600 shadow-md transition-all"
              >
                + Add Link
              </button>
              <div>
                <h2 className="font-semibold text-xl text-gray-700 mb-2">
                  Step 3: Add picture and description
                </h2>
                <input
                  value={pic || ""}
                  onChange={(e) => setPic(e.target.value)}
                  className="px-4 py-3  border-slate-500 w-full border rounded-md focus:ring-2 focus:ring-blue-400 shadow-sm"
                  type="text"
                  placeholder="Add your picture"
                />
                <input
                  value={desc || ""}
                  onChange={(e) => setDesc(e.target.value)}
                  className="px-4 py-3 my-4 border-slate-500 w-full border rounded-md focus:ring-2 focus:ring-blue-400 shadow-sm"
                  type="text"
                  placeholder="Enter description"
                />
                <button
                  disabled={
                    pic === "" ||
                    handle === "" ||
                    links[0].linkText === "" ||
                    links[0].link === ""
                  }
                  onClick={submitLinks}
                  className="px-5 py-3 disabled:bg-slate-400 bg-green-500 text-white font-semibold w-full rounded-md mt-4 hover:bg-green-600 shadow-md transition-all"
                >
                  Create Your Linktree
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex ">
          <img
            src="/generate.png"
            alt="Generate Preview"
            className="w-full h-auto mt-32 max-h-[90%] rounded-md shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
