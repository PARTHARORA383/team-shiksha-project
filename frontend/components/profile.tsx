"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { CheckCheck, Edit } from "lucide-react";
import { EditableField } from "./editable-field";
import { AnimatePresence, motion } from 'motion/react'
import { Skeleton } from "./ui/skelaton";

export function Profile() {
  const [userData, setUserData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);


  const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${backend_url}/user/profile`, {
        headers: { Authorization: `Bearer ${token}`},
      });

      if (response.status == 200) {
        setUserData(response.data.user);
        console.log(response.data.user)
      }
    } catch (e) {
      alert("Error fetching data");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // React Hook Form
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      city: "",
      country: "",
      email: "",
      phone: "",
      bio: "",
    },
  });


  useEffect(() => {
    if (userData) {
      reset({
        firstName: userData.name || "",
        lastName: userData.lastName || "",
        city: userData.city || "",
        country: userData.country || "",
        email: userData.email || "",
        phone: userData.phone || "",
        bio: userData.profile || "",
      });
    }
  }, [userData, reset]);


  const onSubmit = async (data: any) => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${backend_url}/user/profile`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setUserData(response.data.user);
        setIsEditing(false);
        setShowSuccessOverlay(true);
        setTimeout(() => {
          setShowSuccessOverlay(false);
        }, 1000)

      }
    } catch (e) {
      alert("Error updating profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (!userData) {
    return (
      <div className="p-6 space-y-8">

        {/* Profile Section Skeleton */}
        <div className="flex items-center gap-4">
          <Skeleton className="w-16 h-16 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="w-32 h-5" />
            <Skeleton className="w-40 h-4" />
          </div>
        </div>

        {/* Form Skeleton */}
        <div className="border rounded-xl p-4 space-y-6">
          <Skeleton className="w-40 h-6" />

          <div className="flex items-center gap-16">
            <div className="flex flex-col gap-2 w-full">
              <Skeleton className="w-24 h-4" />
              <Skeleton className="w-full h-10" />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <Skeleton className="w-24 h-4" />
              <Skeleton className="w-full h-10" />
            </div>
          </div>

          <div className="flex items-center gap-16">
            <div className="flex flex-col gap-2 w-full">
              <Skeleton className="w-24 h-4" />
              <Skeleton className="w-full h-10" />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <Skeleton className="w-24 h-4" />
              <Skeleton className="w-full h-10" />
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="w-24 h-4" />
            <Skeleton className="w-full h-24" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>

      <div className=" w-full mt-8 rounded-xl border p-3 relative">
        <ProfileImageSection name={userData.name} email={userData.email} />
      </div>

      <AnimatePresence>
        {showSuccessOverlay && (
          <div className="fixed z-50 inset-0 bg-black/40 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="bg-white rounded-xl p-6 flex items-center gap-2 shadow-lg">

              <CheckCheck />

              <span className="text-gray-900 font-medium text-lg">
                Profile updated successfully!
              </span>
            </motion.div>
          </div>
        )}

      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="relative border mt-8  p-3 w-full  rounded-xl flex flex-col gap-4">
        <Button
          className=" absolute right-4 max-w-[200px]"
          onClick={() => setIsEditing(true)}>

          <Edit className="w-5 h-5 mr-2" />
          Edit Profile
        </Button>

        <h2 className="text-lg font-medium">Personal Information</h2>
        <form className="space-y-4 mt-4 lg:mt-0 w-full lg:max-w-lg" onSubmit={handleSubmit(onSubmit)}>
          {/* First Name & Last Name */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16 gap-4">
            <EditableField
              label="First Name"
              name="firstName"
              control={control}
              isEditing={isEditing}
              rules={{ required: "First name is required" }}
            />
            <EditableField
              label="Last Name"
              name="lastName"
              control={control}
              isEditing={isEditing}
            />
          </div>

          {/* City & Country */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16 gap-4">
            <EditableField
              label="City/State"
              name="city"
              control={control}
              isEditing={isEditing}
            />
            <EditableField
              label="Country"
              name="country"
              control={control}
              isEditing={isEditing}
            />
          </div>

          {/* Email & Phone */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16 gap-4">
            <EditableField
              label="Email"
              name="email"
              control={control}
              isEditing={isEditing}
              rules={{
                required: "Email is required",
                pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
              }}
            />
            <EditableField
              label="Phone"
              name="phone"
              control={control}
              isEditing={isEditing}
            />
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-2 w-full">
            <Label>Bio</Label>
            {isEditing ? (
              <Controller
                name="bio"
                control={control}
                render={({ field }) => <Textarea {...field} />}
              />
            ) : (
              <p className="font-medium text-lg">{userData.profile || "Add the user bio"}</p>
            )}
          </div>

          {/* Buttons */}
          {isEditing && (
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button
                type="button"
                className="bg-red-500 hover:bg-red-700 w-full sm:w-auto"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-neutral-900 hover:bg-neutral-800 cursor-pointer flex items-center justify-center gap-2 w-full sm:w-auto"
                disabled={isSaving}
              >
                {isSaving ? (
                  <div className="w-4 h-4 animate-spin rounded-full border border-t-transparent"></div>
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          )}
        </form>

      </motion.div>
    </>
  );
}

// Profile Image Section
interface ProfileImageSectionProps {
  profilePic?: string;
  email: string;
  name: string;
}
// Profile Image Section
export function ProfileImageSection({
  profilePic,
  name,
  email,
}: ProfileImageSectionProps) {
  const firstLetter = name.charAt(0).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="flex items-center gap-4"
    >
      {profilePic ? (
        <img
          src={profilePic}
          alt={name}
          className="w-16 h-16 sm:w-16 sm:h-16 rounded-full object-cover"
        />
      ) : (
        <div className="w-16 h-16 sm:w-16 sm:h-16 rounded-full bg-neutral-900 flex items-center justify-center text-white text-xl font-bold">
          {firstLetter}
        </div>
      )}

      <div className="flex flex-col">
        <span className="font-medium text-lg">{name}</span>
        <span className="text-gray-500 text-sm">{email}</span>
      </div>
    </motion.div>
  );
}
