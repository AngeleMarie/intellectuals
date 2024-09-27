import Head from "next/head";
import Link from "next/link";

export default function page() {
  return (
    <div className="flex justify-center items-center min-h-screen px-8">
      <div className="bg-white  rounded-lg shadow-md p-6 w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
        <div className="my-4">
          <p className="text-sm text-center md:text-xl font-bold text-main ">
            Thank You 🙏🙏
          </p>
          <p className="text-gray-600 text-sm md:text-base text-center">
            We appreciate your contribution to Rwanda Muslim Community.
          </p>
        </div>

        <div className="my-4 flex justify-center">
          <Link
            href="/"
            className="px-6 py-2 text-white bg-main rounded-md hover:bg-green-600 text-center"
          >
            Back to Form
          </Link>
        </div>
      </div>
    </div>
  );
}
