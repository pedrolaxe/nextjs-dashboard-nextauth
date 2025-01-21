import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl mt-4">Page Not Found</p>
      <Link href="/" className="mt-6 text-blue-500 underline">
        Go back to Home
      </Link>
    </div>
  );
};

export default Custom404;
