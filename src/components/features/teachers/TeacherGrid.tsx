"use client";

import React from "react";
import Image from "next/image";
import type { TeacherUI } from "@/types/teacher";

interface TeacherGridProps {
  teachers: TeacherUI[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onSelectTeacher: (teacher: TeacherUI) => void;
}

export default function TeacherGrid({
  teachers,
  loading,
  error,
  searchQuery,
  setSearchQuery,
  page,
  totalPages,
  onPageChange,
  onSelectTeacher,
}: TeacherGridProps) {
  return (
    <div className="flex-1 p-margin-mobile md:p-margin-desktop mx-auto w-full flex flex-col gap-section relative text-left">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
        <div>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-text-primary">
            Danh sách Giảng viên
          </h1>
          <p className="font-body-std text-body-std text-on-surface-variant mt-1">
            Quản lý và xem thống kê tương tác giảng dạy của đội ngũ giảng viên.
          </p>
        </div>
        <div className="flex items-center bg-surface-white rounded-2xl border border-border-light px-4 py-2 shadow-sm">
          <span className="material-symbols-outlined text-outline mr-2 text-[20px]">search</span>
          <input
            type="text"
            placeholder="Tìm giảng viên, khoa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none focus:ring-0 font-body-std text-body-std text-text-primary outline-none"
          />
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-surface-white rounded-2xl border border-border-light p-6 animate-pulse">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-surface-dim shrink-0" />
                <div className="flex-1 flex flex-col gap-2">
                  <div className="h-4 bg-surface-dim rounded w-3/4" />
                  <div className="h-3 bg-surface-dim rounded w-1/2" />
                </div>
              </div>
              <div className="h-3 bg-surface-dim rounded w-full mt-4" />
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="flex flex-col items-center justify-center py-20 gap-3 bg-surface-white rounded-3xl border border-border-light">
          <span className="material-symbols-outlined text-[48px] text-error">error</span>
          <p className="font-semibold text-sm text-error">{error}</p>
        </div>
      )}

      {/* Grid */}
      {!loading && !error && (
        <>
          {teachers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter">
              {teachers.map((teacher) => (
                <div
                  key={teacher.id}
                  onClick={() => onSelectTeacher(teacher)}
                  className="bg-surface-white rounded-2xl shadow-[0px_0px_10px_0px_rgba(0,0,0,0.05)] hover:shadow-[0px_5px_30px_0px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 p-6 cursor-pointer border border-border-light flex flex-col group"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-surface-dim shrink-0 group-hover:border-primary transition-colors">
                      {teacher.avatar_url ? (
                        <Image src={teacher.avatar_url} alt={teacher.full_name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                          <span className="material-symbols-outlined text-primary text-[28px]">person</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-headline-sm text-headline-sm text-text-primary truncate">{teacher.full_name}</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant truncate">{teacher.department ?? '—'}</p>
                      <p className="text-xs text-outline mt-1 truncate">{teacher.degree ?? ''} {teacher.academic_rank ?? ''}</p>
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-border-light flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs text-on-surface-variant font-medium">Chỉ số tương tác</span>
                      {teacher.interactionScore !== null ? (
                        <div className="flex items-baseline gap-1 mt-0.5">
                          <span className={`font-headline-sm text-headline-sm ${teacher.interactionScore >= 90 ? 'text-success-green' : teacher.interactionScore >= 80 ? 'text-primary' : 'text-orange-500'}`}>
                            {teacher.interactionScore}
                          </span>
                          <span className="text-xs text-outline">/100</span>
                        </div>
                      ) : (
                        <span className="text-xs text-outline mt-0.5">Chưa có dữ liệu</span>
                      )}
                    </div>
                    {teacher.interactionStatus && (
                      <div className={`px-2.5 py-1 rounded-md text-xs font-medium border ${
                        (teacher.interactionScore ?? 0) >= 90
                          ? 'bg-success-green/10 text-success-green border-success-green/20'
                          : (teacher.interactionScore ?? 0) >= 80
                          ? 'bg-primary/10 text-primary border-primary/20'
                          : 'bg-orange-500/10 text-orange-600 border-orange-500/20'
                      }`}>
                        {teacher.interactionStatus}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-outline gap-3 bg-surface-white rounded-3xl border border-border-light shadow-sm">
              <span className="material-symbols-outlined text-[48px] text-outline/50">person_off</span>
              <p className="font-semibold text-sm">Không tìm thấy giảng viên nào khớp với tìm kiếm</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <button
                type="button"
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
                className="p-2 rounded-xl border border-border-light bg-surface-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-dim transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
              </button>
              <span className="font-body-std text-body-std text-on-surface-variant px-2">
                {page} / {totalPages}
              </span>
              <button
                type="button"
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
                className="p-2 rounded-xl border border-border-light bg-surface-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-dim transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}