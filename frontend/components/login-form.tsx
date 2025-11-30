"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

// Login validation schema
const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  const handleLoginSubmit = async (data: LoginFormData) => {
    setFormError("");

    try {
      const response = await axios.post("http://localhost:8000/auth/login", data);

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        router.push("/Dashboard");
      }
    } catch (error: any) {
      setFormError(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="max-w-md min-w-md mx-auto font-sans">
      <form
        onSubmit={handleSubmit(handleLoginSubmit)}
        className="relative z-10 p-6 bg-white rounded-3xl space-y-6 shadow overflow-hidden"
      >
        <Heading title="Welcome Back" subtitle="Login to your account" />

        {/* General form error block */}
        {formError && (
          <div className="bg-red-100 text-red-700 p-2 rounded-md text-center">
            {formError}
          </div>
        )}

        <div>
          <label className="block mb-1 text-gray-700 text-[15px] font-medium">Email</label>
          <Input type="email" placeholder="you@example.com" {...register("email")} />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div className="relative">
          <label className="block mb-1 text-gray-700 text-[15px] font-medium">Password</label>
          <Input
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
          {isSubmitting && <div className="border animate-spin w-4 h-4 rounded-full border-t-transparent"></div>}
          {isSubmitting ? "" : "Login"}
        </button>

        <p className="text-center text-gray-500 mt-2">
          Don't have an account?{" "}
          <span
            className="text-sky-600 cursor-pointer hover:underline"
            onClick={() => router.push("/Signup")}
          >
            Signup
          </span>
        </p>
      </form>
    </div>
  );
}

function Heading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h2 className="text-xl font-medium text-center">{title}</h2>
      <p className="text-center text-gray-500">{subtitle}</p>
    </div>
  );
}
