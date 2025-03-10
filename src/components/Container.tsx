import React from "react";

type Props = {};

export default function Container(props: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      {...props}
      className="w-full bg-white bordeer rounded-xl flex py-4 shadow-sm"
    />
  );
}
