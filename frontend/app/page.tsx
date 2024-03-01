"use client";
import React, { useState } from "react";

async function fetchStockData({
  stocksTicker,
  multiplier,
  timespan,
  from,
  to,
  apiKey,
}: {
  stocksTicker: string;
  multiplier: string;
  timespan: string;
  from: string;
  to: string;
  apiKey: string;
}) {
  const res = await fetch(
    `https://api.polygon.io/v2/aggs/ticker/${stocksTicker}/range/${multiplier}/${timespan}/${from}/${to}?adjusted=true&sort=asc&limit=120&apiKey=${apiKey}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default function Home() {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [stocksTicker, setStocksTicker] = useState("");
  const [multiplier, setMultiplier] = useState("");
  const [timespan, setTimespan] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const apiKey = process.env.NEXT_PUBLIC_API;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    const stockData = await fetchStockData({
      stocksTicker,
      multiplier,
      timespan,
      from,
      to,
      apiKey: apiKey ?? "",
    });
    setData(stockData);
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <main className="flex flex-row justify-center space-x-10 items-center min-h-screen bg-gray-100 p-4">
        <div className="max-w-md w-full space-y-8 p-6 bg-white rounded shadow-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Enter Stock Information
            </h2>
          </div>
          <form onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-gray-700">
              Stocks Ticker (Symbol)
              <input
                type="text"
                value={stocksTicker}
                onChange={(e) => setStocksTicker(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="e.g. AAPL"
              />
            </label>
            <label className="block text-sm font-medium text-gray-700">
              Multiplier
              <input
                type="text"
                value={multiplier}
                onChange={(e) => setMultiplier(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="e.g. 1"
              />
            </label>
            <label className="block text-sm font-medium text-gray-700">
              Timespan
              <input
                type="text"
                value={timespan}
                onChange={(e) => setTimespan(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="e.g. day"
              />
            </label>
            <label className="block text-sm font-medium text-gray-700">
              From
              <input
                type="text"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="e.g. 2023-01-09"
              />
            </label>
            <label className="block text-sm font-medium text-gray-700">
              To
              <input
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="e.g. 2023-01-09"
              />
            </label>
            <button
              type="submit"
              className="w-full px-6 py-3 mt-3 text-lg text-black bg-blue-600 hover:bg-blue-700 transition-all duration-150 ease-linear rounded-lg shadow outline-none focus:outline-none"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Get"}{" "}
            </button>
          </form>
        </div>
        <div className="max-w-md w-full mt-8 p-6 text-black bg-white rounded shadow-lg">
          <p className="mb-2">
            <strong>Ticker:</strong> {data.ticker}
          </p>
          {data.results.map((result, index) => (
            <div key={index}>
              <strong>Results:</strong>
              {Object.entries(result).map(([key, value], i) => (
                <p key={i}>
                  {key}: {value}
                </p>
              ))}
            </div>
          ))}
        </div>
      </main>
    </React.Fragment>
  );
}
