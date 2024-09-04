"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoMdLogOut } from "react-icons/io";

const Logout = () => {
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("https://intellectuals.vercel.app/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      localStorage.removeItem("token");

      setShowPopup(true);

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
      <a
        onClick={handleLogout}
        className="absolute top-4 right-4 font-normal flex text-red-600 underline cursor-pointer"
      >
        <span>
          <IoMdLogOut className="m-1.5" />
        </span>
        Logout
      </a>
      {showPopup && (
        <div
          className={`absolute top-12 right-4 bg-green-500/40 shadow-md h-20 text-lg text-green-500 px-4 py-2 rounded flex items-center transition-all duration-500 transform  'translate-x-0' : 'translate-x-full'
          }`}
        >
          <span className="mr-2">Logged Out Successfully</span>
          <button
            onClick={() => handleClose("success")}
            className="ml-auto text-green-500 text-xl bg-white/40 rounded-full h-8 w-8 text-center hover:bg-green-500/40 hover:text-white"
          >
            &times;
          </button>
        </div>
      )}
    </>
  );
};

export default Logout;
