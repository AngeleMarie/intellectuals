"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaFilter } from "react-icons/fa"; // Assuming you're using react-icons for the filter icon

export default function IntellectualList() {
  const [intellectuals, setIntellectuals] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    gender: "",
    country: "",
    fieldOfStudy: "",
  });
  const router = useRouter();

  // Function to fetch intellectuals based on filters
  const fetchIntellectuals = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found. Please log in.");
        router.push("/login");
        return;
      }

      // Build query parameters from filters
      const queryParams = new URLSearchParams({
        Gender: filters.gender,
        Country: filters.country,
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

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Handle filter button click
  const handleFilterClick = () => {
    setLoading(true); // Show loading state while fetching
    fetchIntellectuals(); // Call the fetch function
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
            <label htmlFor="country" className="block font-medium">
              Residence:
            </label>
            <select
              id="residence"
              name="residence"
              value={filters.residence}
              onChange={handleFilterChange}
              className="border p-2 rounded w-full"
            >
              <option value="">All</option>
              <option value="Nyarugenge">Nyarugenge</option>
              <option value="Gasabo">Gasabo</option>
              <option value="Kicukiro">Kicukiro</option>

              <option value="Nyagatare">Nyagatare</option>
              <option value="Gatsibo">Gatsibo</option>
              <option value="Kayonza">Kayonza</option>
              <option value="Kirehe">Kirehe</option>
              <option value="Ngoma">Ngoma</option>
              <option value="Rwamagana">Rwamagana</option>
              <option value="Bugesera">Bugesera</option>

              <option value="Musanze">Musanze</option>
              <option value="Rulindo">Rulindo</option>
              <option value="Gakenke">Gakenke</option>
              <option value="Gicumbi">Gicumbi</option>
              <option value="Burera">Burera</option>

              <option value="Kamonyi">Kamonyi</option>
              <option value="Muhanga">Muhanga</option>
              <option value="Ruhango">Ruhango</option>
              <option value="Nyanza">Nyanza</option>
              <option value="Huye">Huye</option>
              <option value="Gisagara">Gisagara</option>
              <option value="Nyaruguru">Nyaruguru</option>
              <option value="Nyamagabe">Nyamagabe</option>

              <option value="Karongi">Karongi</option>
              <option value="Rusizi">Rusizi</option>
              <option value="Ngororero">Ngororero</option>
              <option value="Rubavu">Rubavu</option>
              <option value="Nyamasheke">Nyamasheke</option>
              <option value="Nyabihu">Nyabihu</option>
              <option value="Rutsiro">Rutsiro</option>
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
              <option value="">All</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Business analysis">Business analysis</option>
              <option value="Engineering">Engineering</option>
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
                <strong>Residence:</strong> 
                <span>
                {intellectual.Residence}
                  </span>
                  <span>,</span>
                  <span>
                    {intellectual.Country}
                    </span>
              </p>
              
              <p>
                <strong>Field of Study:</strong> {intellectual.FieldOfStudy}
              </p>
              <p>
                <strong>Age:</strong> {calculateAge(intellectual.DOB)}
              </p>
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
                <strong>Field of Study:</strong>{" "}
                {intellectual.FieldOfStudy || "N/A"}
              </p>
              <p>
                <strong>Degree:</strong> {intellectual.Degree || "N/A"}
              </p>
              <p>
                <strong>Graduation Year:</strong>{" "}
                {new Date(intellectual.GraduationYear).getFullYear()}
              </p>
              <p className="text-main text-2xl py-2 font-bold">
                <strong>Current Career</strong>
              </p>
              <p>
                <strong>Organization:</strong>{" "}
                {intellectual.Organization || "N/A"}
              </p>
              <p>
                <strong>Position:</strong> {intellectual.Position || "N/A"}
              </p>
              <p>
                <strong>Location:</strong> {intellectual.Location || "N/A"}
              </p>
              <p>
                <strong>Role:</strong> {intellectual.Role || "N/A"}
              </p>
              <p>
                <strong>Short Description:</strong>{" "}
                {intellectual.MoreInformation || "N/A"}
              </p>
            </div>
          ))
        ) : (
          <p>No intellectuals found based on selected filters.</p>
        )}
      </div>
    </div>
  );
}
