import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trang chủ | CMC-DATN',
  description: 'Hệ thống Quản lý Đào tạo',
};

export default function Home() {
  redirect('/dashboard');
}
