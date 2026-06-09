"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import DashboardLayout from "@/components/layout/DashboardLayout";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  bio: string;
  avatar: string;
}

export default function ProfilePage() {
  const defaultProfile = {
    id: "GV001",
    name: "Giảng viên A",
    email: "giangvien.a@cmc.edu.vn",
    phone: "0987 654 321",
    department: "Khoa CNTT",
    role: "Giảng viên cơ hữu",
    bio: "Hơn 5 năm giảng dạy trong lĩnh vực Kỹ thuật Phần mềm và Khoa học Máy tính. Hướng nghiên cứu chính bao gồm Phát triển ứng dụng Web, Cloud Computing và ứng dụng AI trong Giáo dục.",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKuYjWiSF7_K7DWEMhOu0_G3WH0jdLBcCl1JUXjJ9iUXEWy_nfOVbC-fFcSo3MFEvHkkwdXMaDoeF1HM3asU4x5haJ9L6RnyZLVZShFCdWx4T0Rv4r8O1oqmJiRj95o3WxrzxsW1KUaoEKk020LRbmM4viBPaTiWdAUvAw8d7EMWlgEEAFw2sPHFsTDUcFRSTwtcrsgh3NXICPy8UFUeKMawX8I01I_4sPY7nrRi20Ond2Kqy4L2ngRvBkoJ3mo_spL_GxNwpP_js"
  };

  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState<UserProfile>(defaultProfile);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("user_profile");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setProfile(parsed);
          setTempProfile(parsed);
        } catch (e) {
          console.error("Failed to load user profile", e);
        }
      }
    }
  }, []);

  const handleEditClick = () => {
    setTempProfile({ ...profile });
    setIsEditing(true);
    setShowSuccessAlert(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTempProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile({ ...tempProfile });
    if (typeof window !== "undefined") {
      localStorage.setItem("user_profile", JSON.stringify(tempProfile));
      // Notify Header and other components to update profile info
      window.dispatchEvent(new Event("profile_updated"));
    }
    setIsEditing(false);
    setShowSuccessAlert(true);
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 4000);
  };

  return (
    <DashboardLayout>
      <div className="flex-1 p-margin-mobile md:p-margin-desktop mx-auto w-full flex flex-col gap-6">
        {/* Breadcrumb Header */}
        <div className="flex items-center gap-2 font-body-std text-body-std text-outline">
          <span className="hover:text-primary transition-colors cursor-pointer">Hệ thống</span>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="font-semibold text-text-primary text-body-std">Hồ sơ cá nhân</span>
        </div>

        {/* Success Alert */}
        {showSuccessAlert && (
          <div className="bg-success-green/10 border border-success-green/30 text-success-green px-4 py-3 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
            <span className="text-sm font-medium">Cập nhật thông tin hồ sơ thành công!</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column: Avatar & Quick summary */}
          <div className="bg-white rounded-3xl p-6 border border-border-light/80 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] flex flex-col items-center text-center h-fit">
            <div className="relative w-32 h-32 rounded-full border-4 border-surface-dim overflow-hidden shadow-sm mb-4">
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                sizes="128px"
                className="object-cover"
              />
            </div>
            <h2 className="font-headline-md text-headline-md text-text-primary">{profile.name}</h2>
            <p className="font-body-sm text-body-sm text-outline mt-1">{profile.role}</p>
            <div className="mt-2 px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20">
              {profile.department}
            </div>

            <div className="w-full border-t border-border-light/60 my-6"></div>

            <div className="w-full flex flex-col gap-3 text-left">
              <div className="flex items-center gap-3 text-on-surface-variant">
                <span className="material-symbols-outlined text-outline text-[20px]">badge</span>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-outline">Mã giảng viên</span>
                  <span className="text-sm font-semibold text-text-primary">{profile.id}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-on-surface-variant">
                <span className="material-symbols-outlined text-outline text-[20px]">mail</span>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-outline">Email</span>
                  <span className="text-sm font-semibold text-text-primary break-all">{profile.email}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-on-surface-variant">
                <span className="material-symbols-outlined text-outline text-[20px]">call</span>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-outline">Số điện thoại</span>
                  <span className="text-sm font-semibold text-text-primary">{profile.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Profile Form / Viewer */}
          <div className="md:col-span-2 bg-white rounded-3xl p-6 md:p-8 border border-border-light/80 shadow-[0px_4px_20px_rgba(0,0,0,0.03)]">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-border-light/50">
              <h3 className="font-headline-md text-headline-md text-text-primary">Thông tin chi tiết</h3>
              {!isEditing && (
                <button
                  type="button"
                  onClick={handleEditClick}
                  className="bg-primary-container hover:bg-primary text-white font-semibold px-4 py-2 rounded-xl flex items-center gap-2 text-xs transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">edit</span>
                  Chỉnh sửa
                </button>
              )}
            </div>

            {!isEditing ? (
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <span className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Họ và Tên</span>
                    <p className="text-sm font-semibold text-text-primary bg-surface-bright/50 border border-transparent p-3 rounded-xl">
                      {profile.name}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Khoa / Bộ môn</span>
                    <p className="text-sm font-semibold text-text-primary bg-surface-bright/50 border border-transparent p-3 rounded-xl">
                      {profile.department}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Số điện thoại</span>
                    <p className="text-sm font-semibold text-text-primary bg-surface-bright/50 border border-transparent p-3 rounded-xl">
                      {profile.phone}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Email liên lạc</span>
                    <p className="text-sm font-semibold text-text-primary bg-surface-bright/50 border border-transparent p-3 rounded-xl">
                      {profile.email}
                    </p>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Giới thiệu bản thân</span>
                  <p className="text-sm font-medium text-on-surface-variant leading-relaxed bg-surface-bright/50 p-4 rounded-2xl">
                    {profile.bio || "Chưa có thông tin giới thiệu."}
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSaveClick} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name-input" className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Họ và Tên</label>
                    <input
                      id="name-input"
                      type="text"
                      name="name"
                      value={tempProfile.name}
                      onChange={handleInputChange}
                      required
                      className="w-full text-sm font-semibold text-text-primary bg-surface-bright border border-border-light/80 focus:border-primary-container focus:ring-2 focus:ring-primary-container/10 outline-none p-3 rounded-xl transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="department-input" className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Khoa / Bộ môn</label>
                    <input
                      id="department-input"
                      type="text"
                      name="department"
                      value={tempProfile.department}
                      onChange={handleInputChange}
                      required
                      className="w-full text-sm font-semibold text-text-primary bg-surface-bright border border-border-light/80 focus:border-primary-container focus:ring-2 focus:ring-primary-container/10 outline-none p-3 rounded-xl transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone-input" className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Số điện thoại</label>
                    <input
                      id="phone-input"
                      type="text"
                      name="phone"
                      value={tempProfile.phone}
                      onChange={handleInputChange}
                      className="w-full text-sm font-semibold text-text-primary bg-surface-bright border border-border-light/80 focus:border-primary-container focus:ring-2 focus:ring-primary-container/10 outline-none p-3 rounded-xl transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="email-input" className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Email liên lạc</label>
                    <input
                      id="email-input"
                      type="email"
                      name="email"
                      value={tempProfile.email}
                      onChange={handleInputChange}
                      required
                      className="w-full text-sm font-semibold text-text-primary bg-surface-bright border border-border-light/80 focus:border-primary-container focus:ring-2 focus:ring-primary-container/10 outline-none p-3 rounded-xl transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="bio-input" className="text-xs font-bold text-outline uppercase tracking-wider block mb-1">Giới thiệu bản thân</label>
                  <textarea
                    id="bio-input"
                    name="bio"
                    value={tempProfile.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full text-sm font-medium text-on-surface-variant bg-surface-bright border border-border-light/80 focus:border-primary-container focus:ring-2 focus:ring-primary-container/10 outline-none p-4 rounded-2xl transition-all resize-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-border-light/40">
                  <button
                    type="button"
                    onClick={handleCancelClick}
                    className="border border-border-light hover:bg-surface-bright text-text-primary font-semibold px-5 py-2.5 rounded-xl transition-colors cursor-pointer text-xs"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="bg-primary hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-sm transition-colors cursor-pointer text-xs"
                  >
                    Lưu thay đổi
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
        <div className="h-12"></div>
      </div>
    </DashboardLayout>
  );
}
