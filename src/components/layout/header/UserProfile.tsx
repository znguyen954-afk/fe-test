"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function UserProfile() {
  const [profile, setProfile] = useState<{ name: string; department: string }>({
    name: "Giảng viên A",
    department: "Khoa CNTT"
  });

  const loadProfile = () => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("user_profile");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setProfile({
            name: parsed.name,
            department: parsed.department
          });
        } catch (e) {
          console.error(e);
        }
      }
    }
  };

  useEffect(() => {
    loadProfile();

    if (typeof window !== "undefined") {
      window.addEventListener("profile_updated", loadProfile);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("profile_updated", loadProfile);
      }
    };
  }, []);

  return (
    <Link href="/profile" className="flex items-center gap-2 cursor-pointer hover:bg-surface-container py-1.5 px-2.5 rounded-full border border-transparent hover:border-border-light/50 transition-all select-none group">
      <div className="w-8 h-8 rounded-full border border-border-light/80 overflow-hidden relative shrink-0 shadow-sm transition-transform group-hover:scale-105">
        <Image
          alt="Lecturer Profile"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKuYjWiSF7_K7DWEMhOu0_G3WH0jdLBcCl1JUXjJ9iUXEWy_nfOVbC-fFcSo3MFEvHkkwdXMaDoeF1HM3asU4x5haJ9L6RnyZLVZShFCdWx4T0Rv4r8O1oqmJiRj95o3WxrzxsW1KUaoEKk020LRbmM4viBPaTiWdAUvAw8d7EMWlgEEAFw2sPHFsTDUcFRSTwtcrsgh3NXICPy8UFUeKMawX8I01I_4sPY7nrRi20Ond2Kqy4L2ngRvBkoJ3mo_spL_GxNwpP_js"
          fill
          sizes="32px"
          className="object-cover"
        />
      </div>
      <div className="hidden md:flex flex-col text-left">
        <span className="font-body-std text-xs font-semibold text-text-primary group-hover:text-primary transition-colors leading-none">
          {profile.name}
        </span>
        <span className="text-[10px] text-outline leading-tight mt-0.5">
          {profile.department}
        </span>
      </div>
      <span className="material-symbols-outlined text-[18px] text-outline group-hover:text-primary transition-colors pointer-events-none">
        expand_more
      </span>
    </Link>
  );
}
