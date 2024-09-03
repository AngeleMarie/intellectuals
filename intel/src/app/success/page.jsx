import Head from 'next/head';
import Link from 'next/link'

export default function page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Head>
        <title>Thank You</title>
      </Head>

      <div className=" bg-white rounded-lg shadow-md p-10 items-center ">
        <h1 className="text-2xl font-bold text-main">Thank You 🙏🙏</h1>
        <p className="mt-4 mx-10 text-gray-600">
          We appreciate your contribution to Rwanda Muslim Community.
        </p>
     
        <Link
          href="/"
          className="inline-block mt-6 mx-56 px-5 py-2 text-white bg-main rounded-lg hover:bg-green-600 transition-colors duration-300"
        >
          Back to Form
        </Link>
      </div>
    </div>
  );
}
