import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './layout/RootLayout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ContactPage from './pages/ContactPage'
import ErrorPage from './pages/ErrorPage'
import LandLordSignUpPage from './pages/LandLordSignUpPage'
import UserSignUpPage from './pages/UserSignUpPage'
import EmailVerificationPage from './pages/EmailVerificationPage'
import UserLoginPage from './pages/UserLoginPage'
import ForgetPasswordPage from './pages/ForgetPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'


const router = createBrowserRouter([
  {
    path: '/', element: <RootLayout />,
    children: [
      { path: '*', element: <ErrorPage /> },
      { path: '/', element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'login', element: <UserLoginPage /> },
      { path: 'signup', element: <UserSignUpPage /> },
      { path: 'landlord-registration', element: <LandLordSignUpPage /> },
      { path: 'forget-password', element: <ForgetPasswordPage /> },
      { path: 'reset-password/:verificationToken', element: <ResetPasswordPage /> },
    ]
  },
  {
    path: '/email-verification/:verificationToken', element: <EmailVerificationPage />
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
