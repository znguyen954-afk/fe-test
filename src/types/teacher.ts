// ─── Dữ liệu từ DB (API trả về) ──────────────────────────────────────────────

export interface TeacherUser {
  id: string;
  email: string;
  status: string;
}

export interface TeacherDepartment {
  id: string;
  name: string;
}

export interface Teacher {
  id: string;
  user_id: string | null;
  department_id: string | null;
  full_name: string;
  gender: string | null;
  date_of_birth: string | null;
  phone: string | null;
  avatar_url: string | null;
  academic_rank: string | null;
  degree: string | null;
  specialization: string | null;
  user: TeacherUser | null;
  department: TeacherDepartment | null;
}

export interface TeacherListResponse {
  data: Teacher[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface TeacherQuery {
  page?: number;
  limit?: number;
  search?: string;
  department_id?: string;
  gender?: string;
  degree?: string;
}

// ─── Dữ liệu UI (kết hợp DB + placeholder cho field AI chưa có) ──────────────

export interface TeacherUI {
  // Từ DB
  id: string;
  full_name: string;
  email: string | null;
  department: string | null;
  degree: string | null;
  academic_rank: string | null;
  specialization: string | null;
  phone: string | null;
  avatar_url: string | null;
  status: string | null;
  // Field AI — chưa tích hợp, để null
  interactionScore: number | null;
  interactionStatus: string | null;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Map Teacher từ DB sang TeacherUI để truyền vào component */
export function mapToTeacherUI(teacher: Teacher): TeacherUI {
  return {
    id: teacher.id,
    full_name: teacher.full_name,
    email: teacher.user?.email ?? null,
    department: teacher.department?.name ?? null,
    degree: teacher.degree,
    academic_rank: teacher.academic_rank,
    specialization: teacher.specialization,
    phone: teacher.phone,
    avatar_url: teacher.avatar_url,
    status: teacher.user?.status ?? null,
    interactionScore: null,
    interactionStatus: null,
  };
}