"use client";

import { useState } from "react";

export default function Home() {
  const [city, setCity] = useState("");
  const [place, setPlace] = useState("");
  const [count, setCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "success" | "partial" | "error"
  >("idle");
  const [uploadedCount, setUploadedCount] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  async function submit() {
    if (!city || !place) return;

    setLoading(true);
    setStatus("idle");
    setErrorMsg("");

    try {
      const res = await fetch("/api/ingest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ city, place, count }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed");
      }

      setUploadedCount(data.uploaded);
      setStatus(data.status === "SUCCESS" ? "success" : "partial");
    } catch (e: any) {
      console.error(e);
      setErrorMsg(e.message || "Something went wrong");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white border border-gray-200 rounded-xl max-w-md w-full p-8 shadow-sm text-neutral-900">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-2">Media Ingestor</h1>
          <p className="text-gray-500 text-sm">
            Download optimized images for your location.
          </p>
        </div>

        <div className="space-y-4">
          <input
            placeholder="City (e.g. Haridwar)"
            className="w-full px-3 py-2 border rounded-lg"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <input
            placeholder="Place (e.g. Har Ki Pauri)"
            className="w-full px-3 py-2 border rounded-lg"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />

          <input
            type="number"
            min={1}
            max={50}
            className="w-full px-3 py-2 border rounded-lg"
            value={count}
            onChange={(e) => setCount(Math.max(1, +e.target.value))}
          />

          <button
            onClick={submit}
            disabled={loading || !city || !place}
            className="w-full bg-black text-white py-2.5 rounded-lg disabled:opacity-50"
          >
            {loading ? "Downloading..." : "Start Download"}
          </button>
        </div>

        {status !== "idle" && (
          <div
            className={`mt-6 p-4 rounded-lg text-sm ${status === "success"
                ? "bg-green-50 text-green-700"
                : status === "partial"
                  ? "bg-yellow-50 text-yellow-700"
                  : "bg-red-50 text-red-700"
              }`}
          >
            {status === "success" && (
              <p>✅ Downloaded {uploadedCount} images successfully.</p>
            )}

            {status === "partial" && (
              <p>⚠️ Downloaded {uploadedCount} images (partial).</p>
            )}

            {status === "error" && (
              <p>❌ Error: {errorMsg || "Something went wrong"}</p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
