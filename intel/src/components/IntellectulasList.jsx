"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaFilter } from "react-icons/fa";

export default function IntellectualList() {
  const [intellectuals, setIntellectuals] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    gender: "",
    residence: "",
    fieldOfStudy: "",
  });
  const router = useRouter();

  const fetchIntellectuals = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found. Please log in.");
        router.push("/login");
        return;
      }

      const queryParams = new URLSearchParams({
        Gender: filters.gender,
        Residence: filters.residence,
        FieldOfStudy: filters.fieldOfStudy,
      }).toString();

      const response = await fetch(
        `https://intellectuals.vercel.app/intellectuals/filter?${queryParams}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setIntellectuals(data);
      } else {
        if (response.status === 401) {
          setError("Unauthorized. Please log in.");
          router.push("/login");
        } else {
          const errorText = await response.text();
          setError(`Failed to fetch intellectuals: ${errorText}`);
        }
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleFilterClick = () => {
    setLoading(true);
    fetchIntellectuals();
  };

  const calculateAge = (birthdate) => {
    if (!birthdate) return "N/A";
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  useEffect(() => {
    fetchIntellectuals();
  }, []);

  if (loading) {
    return <p>Loading intellectuals...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Filter fields */}
          <div>
            <label htmlFor="gender" className="block font-medium">
              Gender:
            </label>
            <select
              id="gender"
              name="gender"
              value={filters.gender}
              onChange={handleFilterChange}
              className="border p-2 rounded w-full"
            >
              <option value="">All</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
          </div>

          <div>
            <label htmlFor="residence" className="block font-medium">
              Residence:
            </label>
            <select
              id="residence"
              name="residence"
              value={filters.residence}
              onChange={handleFilterChange}
              className="border p-2 rounded w-full"
            >
              {/* Add residence options */}
            </select>
          </div>

          <div>
            <label htmlFor="fieldOfStudy" className="block font-medium">
              Field of Study:
            </label>
            <select
              id="fieldOfStudy"
              name="fieldOfStudy"
              value={filters.fieldOfStudy}
              onChange={handleFilterChange}
              className="border p-2 rounded w-full"
            >
              {/* Add field of study options */}
            </select>
          </div>

          <div className="flex items-center">
            <button
              onClick={handleFilterClick}
              className="flex items-center bg-main text-white p-2 rounded hover:bg-green-500"
            >
              <FaFilter className="mr-2" />
              Filter
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {intellectuals.length > 0 ? (
          intellectuals.map((intellectual) => (
            <div
              key={intellectual._id}
              className="bg-white shadow-md p-6 rounded-lg"
            >
              {/* General Information */}
              <p className="text-main text-2xl py-2 font-bold">
                <strong>General Information</strong>
              </p>
              <p>
                <strong>Names:</strong> {intellectual.FirstName}{" "}
                {intellectual.LastName}
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
                <strong>Residence:</strong> {intellectual.Residence},{" "}
                {intellectual.Country}
              </p>
              <p>
                <strong>Field of Study:</strong>
                {intellectual.FieldOfStudy?.length > 0 ? (
                  <ul>
                    {intellectual.FieldOfStudy.map((field, index) => (
                      <li key={index}>{field}</li>
                    ))}
                  </ul>
                ) : (
                  "N/A"
                )}
              </p>
              <p>
                <strong>Age:</strong> {calculateAge(intellectual.DOB)}
              </p>

              {/* Educational Background */}
              <p className="text-main text-2xl py-2 font-bold">
                <strong>Educational Background</strong>
              </p>
              <p>
                <strong>High School:</strong> {intellectual.SchoolName || "N/A"}
              </p>
              <p>
                <strong>Combination:</strong>{" "}
                {intellectual.Combination || "N/A"}
              </p>
              <p>
                <strong>Degree:</strong>
                {intellectual.Degree?.length > 0 ? (
                  <ul>
                    {intellectual.Degree.map((degree, index) => (
                      <li key={index}>{degree}</li>
                    ))}
                  </ul>
                ) : (
                  "N/A"
                )}
              </p>
              <p>
                <strong>Graduation Year:</strong>
                {intellectual.GraduationYear}
              </p>

              {/* Work Experience */}
              <p className="text-main text-2xl py-2 font-bold">
                <strong>Work Experience</strong>
              </p>
              <p>
                <strong>Organization:</strong>
                {intellectual.Organization?.length > 0 ? (
                  <ul>
                    {intellectual.Organization.map((org, index) => (
                      <li key={index}>{org}</li>
                    ))}
                  </ul>
                ) : (
                  "N/A"
                )}
              </p>
              <p>
                <strong>Position:</strong>
                {intellectual.Position?.length > 0 ? (
                  <ul>
                    {intellectual.Position.map((pos, index) => (
                      <li key={index}>{pos}</li>
                    ))}
                  </ul>
                ) : (
                  "N/A"
                )}
              </p>
              <p>
                <strong>Location:</strong>
                {intellectual.Location?.length > 0 ? (
                  <ul>
                    {intellectual.Location.map((loc, index) => (
                      <li key={index}>{loc}</li>
                    ))}
                  </ul>
                ) : (
                  "N/A"
                )}
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
