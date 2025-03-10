import React from "react";
import Image from "next/image";
import { cn } from "@/utils/cn";

type Props = {
  iconName: string; // Define iconName as a separate prop
} & React.HTMLProps<HTMLDivElement>; // Use intersection type for clarity

export default function WeatherIcon({ iconName, ...rest }: Props) {
  return (
    <div title={iconName} {...rest} className={cn("relative h-20 w-20")}>
      <Image
        width={128}
        height={128}
        alt="weather-icon"
        className="object-contain"
        src={`https://openweathermap.org/img/wn/${iconName}@4x.png`}
      />
    </div>
  );
}
