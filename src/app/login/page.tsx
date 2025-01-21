/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Login = () => {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  const [toast, setToast] = useState<{ message: string; type: string } | null>(
    null
  );

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.push("/dashboard");
    }
  }, [sessionStatus, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const username = (form.elements.namedItem("username") as HTMLInputElement)
      .value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    if (!username || !password) {
      return setToast({ message: "Please fill all fields.", type: "error" });
    }

    try {
      const res = await signIn("credentials", {
        redirect: false,
        username,
        password,
      });

      if (res?.status === 200) {
        setToast({ message: "Successfully logged in.", type: "success" });
      } else if (res?.status === 403) {
        setToast({ message: "User could not be found.", type: "error" });
      } else if (res?.status === 401) {
        setToast({ message: "Incorrect password provided.", type: "error" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    sessionStatus !== "authenticated" && (
      <div className="flex min-h-screen bg-gray-100 justify-center items-center">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

          {toast && (
            <div
              className={`p-3 mb-4 rounded text-center text-white ${
                toast.type === "success" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {toast.message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="p-3 border rounded w-full"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="p-3 border rounded w-full"
              />
            </div>

            <button
              type="submit"
              className="mt-6 w-full py-3 bg-black text-white rounded hover:bg-gray-800"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-sm">
            Dont have an account?{" "}
            <Link href="/register" className="text-blue-500 underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    )
  );
};

export default Login;
