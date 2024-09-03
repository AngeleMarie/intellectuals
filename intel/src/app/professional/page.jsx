"use client";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Professional() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    Organization: "",
    Location: "",
    Position: "",
    MoreInformation: "",
  });

  useEffect(() => {
    const personalData = JSON.parse(localStorage.getItem("personalData"));
    const educationData = JSON.parse(localStorage.getItem("educationData"));
    if (personalData && educationData) {
      setFormData((prev) => ({ ...prev, ...personalData, ...educationData }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://intellectuals.vercel.app/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        router.push("/success");
      } else {
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main className="min-h-screen bg-green-100 p-4">
      <Navbar />
    <div className="max-w-4xl mx-auto py-10 px-5">
      <form className="space-y-6 " onSubmit={handleSubmit}>
        <div className="text-main text-xl font-medium">Current Career</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>Organization</label>
            <input
              type="text"
              name="Organization"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-1"
            />
          </div>
          <div>
            <label>Location</label>
            <input
              type="text"
              placeholder="e.g: KG 297 ST"
              name="Location"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-1"
            />
          </div>
          <div>
            <label>Position</label>
            <input
              type="text"
              name="Position"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 mt-1"
            />
          </div>
        </div>
        <div>
          <label className="text-main text-xl font-medium mt-12 mb-4 block">
            Additional Information
          </label>
          <textarea
            placeholder="Enter extra information"
            className="w-full bg-transparent border-[1px] border-main rounded-md p-2"
            name="MoreInformation"
            onChange={handleChange}
          />
        </div>
        <label className="text-sm flex gap-3 mt-4">
          <input
            type="checkbox"
            className="w-4 h-4 mt-1"
            required
          />
          I hereby confirm that all the information provided is true and accurate
          to the best of my knowledge, and I agree to the terms and conditions of
          this platform.
        </label>
        <div className="flex justify-center py-4">
          <button
            type="submit"
            className="border border-main bg-main text-white px-10 py-2 rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
      </div>
    </main>
  );
}
