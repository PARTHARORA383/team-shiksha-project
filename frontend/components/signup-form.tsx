"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Label } from "./ui/label";


const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupFormData = z.infer<typeof signupSchema>;

export function SignupForm() {
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const router = useRouter();

  const handleFormSubmit = async (data: SignupFormData) => {
    setFormError(""); 

    const requestBody = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    try {
      const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL 

      const response = await axios.post(
        `${backend_url}/auth/signup`,
        requestBody
      );

      if (response.status === 201) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        router.push("/Dashboard");
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        setFormError(error.response.data.message);
      } else {
        setFormError("Error signing up. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-md min-w-md mx-auto font-sans">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="relative z-10 p-6 bg-white rounded-3xl space-y-6 shadow overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-20 rounded-full bg-gradient-to-br from-amber-100 to-amber-300 opacity-30 blur-3xl pointer-events-none z-0" />

        <Heading />

        {/* General form error block */}
        {formError && (
          <div className="bg-red-100 text-red-700 p-2 rounded-md text-center">
            {formError}
          </div>
        )}

        <div>
          <Label className="block mb-1 text-gray-700 text-base font-medium">Name</Label>
          <Input
            className="text-base"
            type="text" placeholder="Your name" {...register("name")} />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label className="block mb-1 text-gray-700 text-base font-medium">Email</Label>
          <Input
            className="text-base"
            type="email"
            placeholder="you@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="relative">
          <Label className="block mb-1 text-gray-700 text-base font-medium">Password</Label>
          <Input
            className="text-base"
            type={showPassword ? "text" : "password"}
            placeholder="********"
            {...register("password")}
          />
          <span
            className="absolute right-3 top-9 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(prev => !prev)}
          >
            {showPassword ? <Eye /> : <EyeOff />}
          </span>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md hover:opacity-80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-2"
        >
          {isSubmitting && (
            <div className="border animate-spin w-4 h-4 rounded-full border-t-transparent"></div>
          )}
          {isSubmitting ? "" : "Get Started"}
        </button>



        <p className="text-center text-gray-500 mt-2">
          Already have an account?{" "}
          <span
            className="text-sky-600 cursor-pointer hover:underline"
            onClick={() => router.push("/Login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}


function Heading() {
  return (
    <div>
      <h2 className="text-xl font-medium text-center">Welcome To Team Shishka</h2>
      <p className="text-center text-gray-500">
        Signup to create your Team Shishka account
      </p>
    </div>
  );
}
