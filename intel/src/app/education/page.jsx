"use client";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Education() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    SchoolName: "",
    GraduationYear: "",
    Combination: "",
    educationLevels: [
      { FieldOfStudy: "", Degree: "Bachelors" }
    ],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const personalData = JSON.parse(localStorage.getItem("personalData"));
    if (personalData) {
      setFormData((prev) => ({ ...prev, ...personalData }));
    }
  }, []);

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;

    if (index !== null) {
      const updatedEducationLevels = formData.educationLevels.map((level, i) =>
        i === index ? { ...level, [name]: value } : level
      );
      setFormData({ ...formData, educationLevels: updatedEducationLevels });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (formData.SchoolName.trim() === "") {
      newErrors.SchoolName = "School Name is required.";
    }
    if (
      formData.GraduationYear.trim() === "" ||
      new Date(formData.GraduationYear).getFullYear() > new Date().getFullYear()
    ) {
      newErrors.GraduationYear = "Valid Graduation Year is required.";
    }
    if (formData.Combination.trim() === "") {
      newErrors.Combination = "Combination is required.";
    }

    formData.educationLevels.forEach((level, index) => {
      if (level.FieldOfStudy.trim() === "") {
        newErrors[`FieldOfStudy${index}`] = "Field of Study is required.";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validate()) {
      localStorage.setItem("educationData", JSON.stringify(formData));
      router.push("/professional");
    }
  };

  const addMoreFields = () => {
    setFormData((prev) => ({
      ...prev,
      educationLevels: [
        ...prev.educationLevels,
        { FieldOfStudy: "", Degree: "Bachelors" },
      ],
    }));
  };

  return (
    <main className="relative min-h-screen bg-green-100">
      <Navbar />
      <div className="max-w-4xl mx-auto py-10 px-5">
        <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="text-xl font-semibold mb-6 text-left">
              High School Level
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-1">School Name</label>
              <input
                type="text"
                name="SchoolName"
                value={formData.SchoolName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
              {errors.SchoolName && <p className="text-red-500">{errors.SchoolName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Graduation Year</label>
              <input
                type="date"
                name="GraduationYear"
                value={formData.GraduationYear}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
              {errors.GraduationYear && <p className="text-red-500">{errors.GraduationYear}</p>}
            </div>
          </div>
          <div className="mb-4 items-center">
            <div>
              <label className="block text-sm font-medium mb-1">Combination</label>
              <input
                type="text"
                name="Combination"
                value={formData.Combination}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
              {errors.Combination && <p className="text-red-500">{errors.Combination}</p>}
            </div>
          </div>

          <div className="text-xl font-semibold mb-6 text-left">
            Other Education Levels
          </div>

          {formData.educationLevels.map((level, index) => (
            <div className="grid gap-6 md:grid-cols-2 mb-4" key={index}>
              <div>
                <label className="block text-sm font-medium mb-1">Field of Study</label>
                <input
                  type="text"
                  name="FieldOfStudy"
                  value={level.FieldOfStudy}
                  onChange={(e) => handleChange(e, index)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
                {errors[`FieldOfStudy${index}`] && (
                  <p className="text-red-500">{errors[`FieldOfStudy${index}`]}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Degree Obtained</label>
                <select
                  name="Degree"
                  value={level.Degree}
                  onChange={(e) => handleChange(e, index)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="Bachelors">Bachelors</option>
                  <option value="Masters">Masters</option>
                  <option value="PHD">PHD</option>
                </select>
              </div>
            </div>
          ))}

          <button
            type="button"
            className="text-green-500 underline"
            onClick={addMoreFields}
          >
            Add More Education
          </button>

          <div className="flex justify-between py-4">
            <Link href="/" className="text-submain underline">
              ← Return
            </Link>
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
