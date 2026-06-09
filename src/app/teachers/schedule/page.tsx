import { Metadata } from 'next';
import TeacherScheduleClient from './TeacherScheduleClient';

export const metadata: Metadata = {
  title: 'Lịch giảng dạy giảng viên | CMC-DATN',
  description: 'Quản lý và thống kê lịch dạy của giảng viên',
};

export default function TeacherSchedulePage() {
  return <TeacherScheduleClient />;
}
