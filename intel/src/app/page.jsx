"use client";
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from "next/link";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; 

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
    Country: '',
    Residence: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, PhoneNumber: value });
  };

  const validate = () => {
    const newErrors = {};

    if (formData.FirstName.length < 3 || formData.FirstName.length > 20) {
      newErrors.FirstName = "Firstname must be between 3 and 20 characters.";
    }
    if (formData.LastName.length < 3 || formData.LastName.length > 20) {
      newErrors.LastName = "Lastname must be between 3 and 20 characters.";
    }
    if (!formData.PhoneNumber || formData.PhoneNumber.length < 12) {
      newErrors.PhoneNumber = "Enter a valid phone number.";
    }
    if (!formData.Email.includes('@') || !formData.Email.includes('.')) {
      newErrors.Email = "Please enter a valid email address.";
    }

    const now = new Date();
    const birthDate = new Date(formData.DOB);
    let age = now.getFullYear() - birthDate.getFullYear();
    const monthDiff = now.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthDate.getDate())) {
      age--;
    }

    if (!formData.DOB || age < 18 || age > 80) {
      newErrors.DOB = "You must be between 18 and 80 years old.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validate()) {
      localStorage.setItem('personalData', JSON.stringify(formData));
      router.push('/education');
    }
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
              {errors.FirstName && <p className="text-red-500">{errors.FirstName}</p>}
            </div>
            <div>
              <label className="block text-gray-700">Lastname</label>
              <input
                type="text"
                name="LastName"
                className="w-full p-2 border rounded-md"
                onChange={handleChange}
              />
              {errors.LastName && <p className="text-red-500">{errors.LastName}</p>}
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
              {errors.DOB && <p className="text-red-500">{errors.DOB}</p>}
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
              {errors.Email && <p className="text-red-500">{errors.Email}</p>}
            </div>
            <div>
              <label className=" text-gray-700">Phone number</label>
              <PhoneInput 
                country={'rw'}
                value={formData.PhoneNumber}
                onChange={handlePhoneChange}
                inputProps={{
                  name: 'PhoneNumber',
                  required: true,
                  className:"mx-6 ",
                  autofocus:false
                  
                }}
              />
              {errors.PhoneNumber && <p className="text-red-500">{errors.PhoneNumber}</p>}
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
              disabled={Object.keys(errors).length > 0}
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
