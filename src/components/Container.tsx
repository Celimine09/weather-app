import React from "react";
import { cn } from "@/utils/cn";

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export default function Container({
  children,
  className,
  ...rest
}: ContainerProps) {
  return (
    <div
      className={cn(
        "w-full bg-white border rounded-xl flex py-4 shadow-sm",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
