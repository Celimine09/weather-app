import React from "react";
import { IoIosPartlySunny } from "react-icons/io";
import { FaLocationCrosshairs, FaLocationDot } from "react-icons/fa6";
import SearchBox from "./SearchBox";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <nav className="shadow-sm sticky top-0 left-0  z-50 bg-white">
      <div className="h-[80px] w-full flex justify-between items-center max0w07xl px-3 mx-auto">
        <div className="flex items-center justify-center gap-2">
          <h2 className="text-gray-500 text-3xl">Weather</h2>
          <IoIosPartlySunny className="text-4xl mt-1 text-yellow-400" />
        </div>

        <section className="flex gap-2 items-center">
          <FaLocationCrosshairs className="text-3xl text-gray-500 hover:opacity-80 cursor-pointer" />
          <FaLocationDot className="text-4xl " />
          <p className="text-slate-900/80 text-sm">Bangkok</p>
          <div>
            {/* */}
            <SearchBox />
          </div>
        </section>
      </div>
    </nav>
  );
}
