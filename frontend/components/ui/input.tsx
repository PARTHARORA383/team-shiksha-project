import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface InputProps extends React.ComponentProps<"input"> {
  icon?: ReactNode; // Optional icon
}

export function Input({ className, type, icon, ...props }: InputProps) {
  return (
    <div className="relative w-full">
      {icon && (
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          {icon}
        </div>
      )}
      <input
        type={type}
        className={cn(
          "w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-400 outline-none focus:outline-none  focus:ring-1  shadow-sm transition-colors",
          icon ? "" : "", 
          className
        )}
        {...props}
      />
    </div>
  );
}
