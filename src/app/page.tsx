"use client";

import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import WeatherDetails from "@/components/WeatherDetail";
import WeatherIcon from "@/components/WeatherIcon";
import { convertWindSpeed } from "@/utils/convertWindSpeed";
import { convertKelvinToCelsius } from "@/utils/covertKelvinToCelsius";
import { getDayOrNightIcon } from "@/utils/getDayOrNightIcon";
import { metersToKilometers } from "@/utils/metersToKilometers";
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
  const { isPending, error, data } = useQuery<WeatherData>({
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
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        <section className="space-y-4 ">
          <div className="space-y-2">
            <h2 className="flex gap-1 text-2xl  items-end ">
              <p>{format(parseISO(firstData?.dt_txt ?? ""), "EEEE")}</p>
              <p className="text-lg">
                ({format(parseISO(firstData?.dt_txt ?? ""), "dd.MM.yyyy")})
              </p>
            </h2>
            <div className=" gap-10 px-6 items-center containerbox">
              <div className=" flex flex-col px-4 ">
                <span className="text-5xl">
                  {convertKelvinToCelsius(firstData?.main.temp ?? 0)}°
                </span>
                <p className="text-xs space-x-1 whitespace-nowrap">
                  <span> Feels like</span>
                  <span>
                    {convertKelvinToCelsius(firstData?.main.feels_like ?? 0)}°
                  </span>
                </p>
                <p className="text-xs space-x-2">
                  <span>
                    {convertKelvinToCelsius(firstData?.main.temp_min ?? 0)}
                    °↓{" "}
                  </span>
                  <span>
                    {" "}
                    {convertKelvinToCelsius(firstData?.main.temp_max ?? 0)}
                    °↑
                  </span>
                </p>
              </div>

              <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                {data?.list.map((d, i) => (
                  <div
                    key={i}
                    className="flex flex-col justify-between gap-2 items-center text-xs font-semibold "
                  >
                    <p className="whitespace-nowrap">
                      {format(parseISO(d.dt_txt), "h:mm a")}
                    </p>

                    {/* <WeatherIcon iconName={d.weather[0].icon} /> */}
                    <WeatherIcon
                      iconName={getDayOrNightIcon(d.weather[0].icon, d.dt_txt)}
                    />
                    <p>{convertKelvinToCelsius(d?.main.temp ?? 0)}°</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-fit justify-center flex-col px-4 items-center containerbox">
              <p className=" capitalize text-center">
                {firstData?.weather[0].description}{" "}
              </p>
              <WeatherIcon
                iconName={getDayOrNightIcon(
                  firstData?.weather[0].icon ?? "",
                  firstData?.dt_txt ?? ""
                )}
              />
            </div>
            <div className="bg-yellow-300/80 px-6 gap-4 flex items-center overflow-x-auto containerbox justify-between">
              <WeatherDetails
                visability={metersToKilometers(firstData?.visibility ?? 10000)}
                airPressure={`${firstData?.main.pressure} hPa`}
                humidity={`${firstData?.main.humidity}%`}
                sunrise={format(data?.city.sunrise ?? 1702949452, "H:mm")}
                // sunrise={}
                sunset={format(data?.city.sunset ?? 1702517657, "H:mm")}
                windSpeed={convertWindSpeed(firstData?.wind.speed ?? 1.64)}
              />
            </div>
          </div>
        </section>

        <section className="flex w-full flex-col gap-4">
          <p className="text-2xl">Forecast(7 days)</p>
        </section>
      </main>
    </div>
  );
}
