import { createBrowserRouter } from 'react-router-dom';
import { DashboardPage } from '@/features/dashboard';
import { LoginPage, ForgotPasswordPage } from '@/features/auth';
import { NotFoundPage } from '@/features/common';
import { MainLayout, AuthLayout } from '@/components/layout';

export const router = createBrowserRouter([
  {
    path: '*',
    element: <NotFoundPage />,
  },
  // Auth routes
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPasswordPage />,
      },
    ],
  },
  // Main routes
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
    ],
  },
]);
