import { Metadata } from 'next';
import ScheduleClient from './ScheduleClient';

export const metadata: Metadata = {
  title: 'Lịch trình & Giám sát | CMC-DATN',
  description: 'Quản lý lịch học và giám sát lớp học',
};

export default function SchedulePage() {
  return <ScheduleClient />;
}
