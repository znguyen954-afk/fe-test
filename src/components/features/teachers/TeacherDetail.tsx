"use client";

import React from "react";
import Image from "next/image";
import type { TeacherUI } from "@/types/teacher";

interface TeacherDetailProps {
  teacher: TeacherUI;
  onBack: () => void;
}

export default function TeacherDetail({ teacher, onBack }: TeacherDetailProps) {
  return (
    <div className="mx-auto p-margin-mobile md:p-section w-full animate-in fade-in slide-in-from-bottom-4 duration-300 text-left">
      {/* Nút quay lại */}
      <button
        type="button"
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-outline hover:text-primary transition-colors font-medium bg-surface-white px-4 py-2 rounded-xl border border-border-light shadow-sm w-fit cursor-pointer"
      >
        <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        Quay lại danh sách
      </button>

      {/* Header Section */}
      <section className="bg-surface-white rounded-2xl shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] p-lg md:p-xl mb-section flex flex-col md:flex-row items-center md:items-start gap-lg relative overflow-hidden border border-border-light">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-fixed-dim to-transparent opacity-20 rounded-full -translate-y-1/2 translate-x-1/3" />

        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-surface-white shadow-md overflow-hidden shrink-0 z-10 relative">
          {teacher.avatar_url ? (
            <Image alt={teacher.full_name} src={teacher.avatar_url} fill className="object-cover" />
          ) : (
            <div className="w-full h-full bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-[56px]">person</span>
            </div>
          )}
        </div>

        <div className="flex-1 text-center md:text-left z-10">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-1">
                {teacher.full_name}
              </h1>
              <p className="font-body-std text-body-std text-outline mb-lg">
                {[teacher.academic_rank, teacher.degree].filter(Boolean).join(' • ') || '—'}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-md">
                {teacher.email && (
                  <button
                    type="button"
                    onClick={() => { window.location.href = `mailto:${teacher.email}`; }}
                    className="text-white font-semibold px-6 py-2 rounded-xl shadow-sm hover:bg-blue-700 transition-colors flex items-center gap-2 bg-primary cursor-pointer active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[20px]">mail</span>
                    Gửi Email
                  </button>
                )}
              </div>
            </div>
            {teacher.department && (
              <div className="flex items-center gap-2 bg-surface-dim px-4 py-2 rounded-xl border border-border-light self-center md:self-start">
                <span className="material-symbols-outlined text-outline">domain</span>
                <span className="font-medium text-text-primary">{teacher.department}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {/* Left Column */}
        <div className="md:col-span-5 flex flex-col gap-gutter">
          {/* Thông tin liên hệ */}
          <div className="bg-surface-white rounded-2xl border border-border-light shadow-[0px_0px_10px_0px_rgba(0,0,0,0.05)] p-lg">
            <div className="flex items-center gap-2 mb-md border-b border-surface-variant pb-3">
              <span className="material-symbols-outlined text-primary">contact_page</span>
              <h2 className="font-headline-md text-headline-md text-on-surface">Thông tin liên hệ</h2>
            </div>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-3 text-sm">
                <span className="material-symbols-outlined text-outline text-[18px]">mail</span>
                <span className="text-on-surface-variant">{teacher.email ?? '—'}</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <span className="material-symbols-outlined text-outline text-[18px]">phone</span>
                <span className="text-on-surface-variant">{teacher.phone ?? '—'}</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <span className="material-symbols-outlined text-outline text-[18px]">work</span>
                <span className="text-on-surface-variant">{teacher.status ?? '—'}</span>
              </li>
            </ul>
          </div>

          {/* Chuyên môn */}
          {teacher.specialization && (
            <div className="bg-surface-white rounded-2xl border border-border-light shadow-[0px_0px_10px_0px_rgba(0,0,0,0.05)] p-lg">
              <div className="flex items-center gap-2 mb-md border-b border-surface-variant pb-3">
                <span className="material-symbols-outlined text-primary">psychology</span>
                <h2 className="font-headline-md text-headline-md text-on-surface">Chuyên môn</h2>
              </div>
              <p className="font-body-std text-body-std text-on-surface-variant leading-relaxed">
                {teacher.specialization}
              </p>
            </div>
          )}
        </div>

        {/* Right Column - AI Metrics */}
        <div className="md:col-span-7 flex flex-col gap-gutter">
          <div className="bg-surface-white rounded-2xl border-2 border-primary/20 shadow-[0px_0px_15px_0px_rgba(56,88,233,0.1)] p-lg relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(56,88,233,1)_1px,transparent_1px),linear-gradient(90deg,rgba(56,88,233,1)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4 border-b border-surface-variant pb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">smart_toy</span>
                  <h2 className="font-headline-md text-headline-md text-on-surface">Chỉ số tương tác (Model AI)</h2>
                </div>
                <div className="bg-surface-dim text-outline px-2 py-1 rounded text-xs font-bold tracking-wider uppercase border border-border-light">
                  Chưa có dữ liệu
                </div>
              </div>

              <div className="flex flex-col items-center justify-center py-10 gap-3 text-outline">
                <span className="material-symbols-outlined text-[48px] opacity-40">query_stats</span>
                <p className="text-sm font-medium">Dữ liệu AI sẽ được tổng hợp sau khi có tiết học hoàn thành</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-12" />
    </div>
  );
}