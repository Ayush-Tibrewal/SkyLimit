import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("success");
      setMessage("Thank you for subscribing!");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h2>
        <p className="text-xl text-gray-600 mb-8">Get the latest travel tips and exclusive offers</p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] flex-grow bg-white max-w-md"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-[#2A9D8F] hover:bg-[#248277] text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "loading" ? (
              "Subscribing..."
            ) : (
              <>
                Subscribe <ArrowRight className="ml-2 w-5 h-5" />
              </>
            )}
          </button>
        </form>
        {message && (
          <p className={`mt-4 text-sm ${status === "success" ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
