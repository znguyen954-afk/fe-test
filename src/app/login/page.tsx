import { Metadata } from 'next';
import LoginClient from './LoginClient';

export const metadata: Metadata = {
  title: 'Đăng nhập | CMC-DATN',
  description: 'Đăng nhập vào hệ thống',
};

export default function LoginPage() {
  return <LoginClient />;
}
