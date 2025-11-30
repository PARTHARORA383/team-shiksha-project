
// components/HeroSection.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <div className="flex flex-col text-center items-center justify-center  ">
      <h1 className="text-lg md:text-3xl font-medium mb-6">
        Team Shiksha Assignment by{" "}
        <a
          href="https://discord.com/users/partharora6109" 
          target="_blank"
          rel="noopener noreferrer"
          className=" hover:underline hover:text-sky-500"
        >
          Parth Arora
        </a>
      </h1>

      <div className="flex gap-4">
        <Link href="/Signup">
          <Button variant="default">Get Started</Button>
        </Link>
        <Link href="/Login">
          <Button variant="outline">Login</Button>
        </Link>
      </div>
    </div>
  );
}
