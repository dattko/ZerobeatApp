import { AuthState } from '@/store/slice/authSlice';

declare module 'react-redux' {
  interface DefaultRootState extends AuthState {}
}