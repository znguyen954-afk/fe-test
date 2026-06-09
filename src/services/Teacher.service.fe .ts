import type { Teacher, TeacherListResponse, TeacherQuery } from '@/types/teacher';
import { authService } from '@/services/auth.service.fe';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

async function fetchWithAuth(path: string): Promise<Response> {
  const token = authService.getAccessToken();
  return fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
}

export const teacherService = {
  async getAll(query: TeacherQuery = {}): Promise<TeacherListResponse> {
    const params = new URLSearchParams();
    if (query.page) params.set('page', String(query.page));
    if (query.limit) params.set('limit', String(query.limit));
    if (query.search) params.set('search', query.search);
    if (query.department_id) params.set('department_id', query.department_id);
    if (query.gender) params.set('gender', query.gender);
    if (query.degree) params.set('degree', query.degree);

    const res = await fetchWithAuth(`/teachers?${params.toString()}`);
    if (!res.ok) throw new Error('Không thể tải danh sách giảng viên');
    return res.json();
  },

  async getOne(id: string): Promise<Teacher> {
    const res = await fetchWithAuth(`/teachers/${id}`);
    if (!res.ok) throw new Error('Không thể tải thông tin giảng viên');
    return res.json();
  },
};