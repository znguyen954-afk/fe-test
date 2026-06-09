"use client";

import React, { useCallback, useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import TeacherGrid from "@/components/features/teachers/TeacherGrid";
import TeacherDetail from "@/components/features/teachers/TeacherDetail";
import { teacherService } from "@/services/Teacher.service.fe ";
import { mapToTeacherUI } from "@/types/teacher";
import type { Teacher, TeacherUI } from "@/types/teacher";

const LIMIT = 9;

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<TeacherUI[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherUI | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTeachers = useCallback(async (search: string, currentPage: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await teacherService.getAll({
        page: currentPage,
        limit: LIMIT,
        search: search || undefined,
      });
      setTeachers(res.data.map((t: Teacher) => mapToTeacherUI(t)));
      setTotalPages(res.meta.totalPages);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounce search 400ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      fetchTeachers(searchQuery, 1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery, fetchTeachers]);

  useEffect(() => {
    fetchTeachers(searchQuery, page);
  }, [page, fetchTeachers]);

  if (selectedTeacher) {
    return (
      <DashboardLayout>
        <TeacherDetail
          teacher={selectedTeacher}
          onBack={() => setSelectedTeacher(null)}
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <TeacherGrid
        teachers={teachers}
        loading={loading}
        error={error}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        onSelectTeacher={setSelectedTeacher}
      />
    </DashboardLayout>
  );
}