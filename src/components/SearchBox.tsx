import { cn } from "@/utils/cn";
import React from "react";
import { FaSearchLocation } from "react-icons/fa";

type Props = {
  className?: string;
  value: string;
  onchange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onsubmit: React.FormEventHandler<HTMLFormElement> | undefined;
};

export default function SearchBox(props: Props) {
  return (
    <form
      onSubmit={props.onsubmit}
      className={cn(
        "flex relative items-center justify-center h-10",
        props.className
      )}
    >
      <input
        type="text"
        value={props.value}
        onChange={props.onchange}
        placeholder="Search Location.."
        className="px-4 py-2 w-[230px] border border-gray-400 rounded-l-md focus:outline-none focus:border-blue-500 h-full"
      />
      <button className="px-4 py-[9px] bg-blue-500 text-white rounded-r-md focus:outline-none hover:bg-blue-600 h-full">
        <FaSearchLocation />
      </button>
    </form>
  );
}
