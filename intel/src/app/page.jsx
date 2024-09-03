"use client";
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from "next/link"

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    Gender: 'Male',
    DOB: '',
    PersonalWebsite: '',
    Email: '',
    PhoneNumber: '',
    country: '',
    Residence: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContinue = () => {
    localStorage.setItem('personalData', JSON.stringify(formData));
    router.push('/education');
  };

  return (
    <main className="min-h-screen bg-green-100">
      <Navbar />
      <div className="max-w-4xl mx-auto py-10 px-5">
      
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700">Firstname</label>
              <input
                type="text"
                name="FirstName"
                className="w-full p-2 border rounded-md"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-gray-700">Lastname</label>
              <input
                type="text"
                name="LastName"
                className="w-full p-2 border rounded-md"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700">Gender</label>
              <select
                name="Gender"
                className="w-full p-2 border rounded-md"
                onChange={handleChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Date of Birth</label>
              <input
                type="date"
                name="DOB"
                className="w-full p-2 border rounded-md"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-1">
            <div>
              <label className="block text-gray-700">Personal website</label>
              <input
                type="text"
                placeholder="LinkedIn, Twitter, Etc"
                name="PersonalWebsite"
                className="w-full p-2 border rounded-md"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700">Email address</label>
              <input
                type="email"
                name="Email"
                className="w-full p-2 border rounded-md"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-gray-700">Phone number</label>
              <input
                type="number"
                name="PhoneNumber"
                className="w-full p-2 border rounded-md"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700">Country</label>
              <input
                type="text"
                name="Country"
                className="w-full p-2 border rounded-md"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-gray-700">Residential address</label>
              <input
                type="text"
                name="Residence"
                className="w-full p-2 border rounded-md"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex justify-between py-4">
            <Link href="#" className="text-submain underline">← Return</Link>
            <button
              type="button"
              className="bg-main text-white px-10 py-2 rounded-md"
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
