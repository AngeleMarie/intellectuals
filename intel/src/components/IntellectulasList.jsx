"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function IntellectualList() {
  const [intellectuals, setIntellectuals] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchIntellectuals = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token retrieved:", token);

        if (!token) {
          setError("No token found. Please log in.");
          router.push("/login");
          return;
        }

        console.log("Making fetch request to /intellectuals with token");

        const response = await fetch("https://intellectuals.vercel.app/intellectuals", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Data fetched successfully:", data);
          setIntellectuals(data);
        } else {
          console.error("Fetch failed with status:", response.status);
          if (response.status === 401) {
            setError("Unauthorized. Please log in.");
            router.push("/login");
          } else if (response.status === 403) {
            setError("Access denied. Admins only.");
          } else {
            const errorText = await response.text();
            setError(`Failed to fetch intellectuals: ${errorText}`);
          }
        }
      } catch (error) {
        console.error("Error during fetch:", error);
        setError("An error occurred. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchIntellectuals();
  }, [router]);

  const calculateAge = (birthdate) => {
    if (!birthdate) return 'N/A';
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (loading) {
    return <p>Loading intellectuals...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {intellectuals.length > 0 ? (
          intellectuals.map((intellectual) => (
            <div
              key={intellectual._id}
              className="bg-white shadow-md p-6 rounded-lg"
            >
              <p className="text-main text-2xl py-2 font-bold">
                <strong>General Information</strong> 
              </p>
              <p>
                <strong>Names:</strong> {intellectual.FirstName} {intellectual.LastName}
              </p>
              <p>
                <strong>Email:</strong> {intellectual.Email}
              </p>
              <p>
                <strong>Phone Number:</strong> {intellectual.PhoneNumber}
              </p>
              <p>
                <strong>Gender:</strong> {intellectual.Gender}
              </p>
              <p>
                <strong>Personal Website:</strong> {intellectual.PersonalWebsite || 'N/A'}
              </p>
              <p>
                <strong>Country:</strong> {intellectual.Country}
              </p>
              <p>
                <strong>Residence:</strong> {intellectual.Residence}
              </p>
              <p>
                <strong>Age:</strong> {calculateAge(intellectual.DOB)}
              </p>
              <p className="text-main text-2xl py-2 font-bold">
                <strong>Educational Background</strong> 
              </p>
              <p>
                <strong>High School:</strong> {intellectual.SchoolName || 'N/A'}
              </p>
              <p>
                <strong>Combination:</strong> {intellectual.Combination || 'N/A'}
              </p>
              <p>
                <strong>Field of Study:</strong> {intellectual.FieldOfStudy || 'N/A'}
              </p>
              <p>
                <strong>Degree:</strong> {intellectual.Degree || 'N/A'}
              </p>
              <p>
                <strong>Graduation Year:</strong> {new Date(intellectual.GraduationYear).getFullYear()}
              </p>
              <p className="text-main text-2xl py-2 font-bold">
                <strong>Current Career</strong> 
              </p>
              <p>
                <strong>Organization:</strong> {intellectual.Organization || 'N/A'}
              </p>
              <p>
                <strong>Position:</strong> {intellectual.Position || 'N/A'}
              </p>
              <p>
                <strong>Location:</strong> {intellectual.Location || 'N/A'}
              </p>
              <p>
                <strong>Role:</strong> {intellectual.Role || 'N/A'}
              </p>
              <p>
                <strong>Short Description:</strong> {intellectual.MoreInformation || 'N/A'}
              </p>
            </div>
          ))
        ) : (
          <p>No intellectuals found.</p>
        )}
      </div>
    </div>
  );
}
