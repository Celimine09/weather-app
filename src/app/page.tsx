"use client";

import Navbar from "@/components/Navbar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { parseISO, format } from "date-fns";
import Image from "next/image";

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherDetail[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

interface WeatherDetail {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export default function Home() {
  const { isPending, error, data } = useQuery<weatherData>({
    queryKey: ["repoData"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://pro.openweathermap.org/data/2.5/forecast?q=Bangkok,th&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
      );
      return data;
    },

    // fetch(
    //   "https://pro.openweathermap.org/data/2.5/weather?q=Bangkok,th&APPID=44bb530b8d20879012e8766fd0decff5"
    // ).then((res) => res.json()),
  });

  const firstData = data?.list[0];
  console.log("data", data);

  if (isPending)
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="animate-bounce">Loading...</p>
      </div>
    );

  return (
    <div className="flex flex-col gap-4 bg-gray-200 min-h-screen">
      <Navbar />
      <main className="px-3 max-w-7xl mx-auto flex flex=col gap-9 w-full pb-10 pt-4">
        <section>
          <div>
            <h2 className="flex gap-1 text-2xl items-end">
              <p>{format(parseISO(firstData?.dt_txt ?? ""), "EEEE")}</p>
              <p className="text-lg">
                ({format(parseISO(firstData?.dt_txt ?? ""), "dd.MM.yyyy")})
              </p>
            </h2>
            <div></div>
          </div>
        </section>

        <section></section>
      </main>
    </div>
  );
}
