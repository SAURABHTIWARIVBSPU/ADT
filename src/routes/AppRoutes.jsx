import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { SignedIn, SignedOut, SignIn, SignUp } from '@clerk/clerk-react';
import React from 'react';

// Landing Page Components
import Header from '../components/layout/Header';
import Hero from '../components/layout/Hero';
import AdventuresStats from '../pages/Home/AdventureStats';
import Partner from '../pages/Home/Partner';
import AutoHoverTriangle from '../pages/Home/Triangle1';
import Check from '../components/common/Check';
import WhatsNew from '../components/common/New';
import AdventureContactForm from '../pages/Home/AdventureContactForm';
import Footer from '../components/layout/Footer';
import ParadoxAdventure from '../pages/Home/ParadoxAdventure';
import ParadoxBackground from '../pages/Home/ParadoxBackground';

// Lazy-loaded pages
const AboutUs = lazy(() => import('../pages/About/AboutUs'));
const ContactUs = lazy(() => import('../pages/About/ContactUs'));
const Partner1 = lazy(() => import('../pages/Partner/Partner1'));
const Onboarding1 = lazy(() => import('../pages/Onboarding/Onboarding1'));
const Onboarding2 = lazy(() => import('../pages/Onboarding/Onboarding2'));
const Welcome = lazy(() => import('../pages/Onboarding/Welcome'));
const Step1 = lazy(() => import('../pages/Onboarding/Step1'));
const Step2 = lazy(() => import('../pages/Onboarding/Step2'));
const Step3 = lazy(() => import('../pages/Onboarding/Step3'));
const Step4 = lazy(() => import('../pages/Onboarding/Step4'));
const Step5 = lazy(() => import('../pages/Onboarding/Step5'));
const Step6 = lazy(() => import('../pages/Onboarding/Step6'));
const Step7 = lazy(() => import('../pages/Onboarding/Step7'));
const Step8 = lazy(() => import('../pages/Onboarding/Step8'));
const Step9 = lazy(() => import('../pages/Onboarding/Step9'));

const PartnerSignup = lazy(() => import('../pages/Partner/signup'));
const PartnerDashboard = lazy(() => import('../pages/Partner/dashboard'));
const AdminDashboard = lazy(() => import('../pages/Partner/AdminDashboard'));

const BookingPage = lazy(() => import('../pages/Booking/BookingPage'));
const AdventureDetail = lazy(() => import('../pages/Booking/AdventureDetail'));
const Login = lazy(() => import('../pages/Booking/Login'));
const ReviewPayment = lazy(() => import('../pages/Booking/ReviewPayment'));
const MyBookings = lazy(() => import('../pages/Booking/MyBookings'));
const Wishlist = lazy(() => import('../pages/Booking/Wishlist'));

const SuperAdminOnboarding = lazy(() => import('../pages/Onboarding/SuperAdminOnboarding'));
const SuperAdminDashboard = lazy(() => import('../pages/SuperAdmin/SuperAdminDashboard'));

const CertificationGrid = lazy(() => import('../pages/Certification/CertificationGrid'));
const CertificationDetailPage = lazy(() => import('../pages/Certification/CertificationDetailPage'));
const MyCertifications = lazy(() => import('../pages/Certification/MyCertifications'));
const CertificationPayment = lazy(() => import('../pages/Certification/CertificationPayment'));
import { CertificationProvider } from '../context/CertificationContext'; // Updated path



// Spinner for lazy load
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

export default function MainRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={
          <div className="relative">
            <ParadoxBackground />
            <Header />
            <Hero />
            <AdventuresStats />
            <Partner />
            <AutoHoverTriangle />
            <ParadoxAdventure />
            <Check />
            <WhatsNew />
            <AdventureContactForm />
            <Footer />
          </div>
        } />

        {/* Static Pages */}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/partner" element={<Partner1 />} />

        {/* Booking & Auth */}
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/adventures/:id" element={<AdventureDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/review-payment" element={<ReviewPayment />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/wishlist" element={<Wishlist />} />

        {/* Partner Dashboard */}
        <Route path="/dashboard" element={<PartnerDashboard />} />
        <Route path="/partner/dashboard" element={<PartnerDashboard />} />
        <Route path="/partner-signup" element={<PartnerSignup />} />

        {/* Onboarding Flow */}
        <Route path="/onboarding1" element={<Onboarding1 />} />
        <Route path="/onboarding2" element={<Onboarding2 />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/step-1" element={<Step1 />} />
        <Route path="/step-2" element={<Step2 />} />
        <Route path="/step-3" element={<Step3 />} />
        <Route path="/step-4" element={<Step4 />} />
        <Route path="/step-5" element={<Step5 />} />
        <Route path="/step-6" element={<Step6 />} />
        <Route path="/step-7" element={<Step7 />} />
        <Route path="/step-8" element={<Step8 />} />
        <Route path="/step-9" element={<Step9 />} />
        <Route path="/onboarding2/sign-up" element={<SignUp routing="path" path="/onboarding2/sign-up" />} />

        {/* Super Admin Dashboard */}
        <Route path="/superadmin/dashboard" element={<SuperAdminDashboard />} />
        <Route path="/superadmin/onboarding" element={<SuperAdminOnboarding />} />

        {/* Certification Routes */}
        <Route path="/certifications" element={
          <SignedIn>
            <CertificationProvider>
              <CertificationGrid />
            </CertificationProvider>
          </SignedIn>
        } />
        <Route path="/certifications/:id" element={
          <SignedIn>
            <CertificationProvider>
              <CertificationDetailPage />
            </CertificationProvider>
          </SignedIn>
        } />
        <Route path="/my-certifications" element={
          <SignedIn>
            <CertificationProvider>
              <MyCertifications />
            </CertificationProvider>
          </SignedIn>
        } />
        <Route path="/certification-payment" element={<CertificationPayment />} />

        {/* Show SignIn if not signed in */}
        <Route path="/certifications" element={
          <SignedOut>
            <SignIn />
          </SignedOut>
        } />
        <Route path="/certifications/:id" element={
          <SignedOut>
            <SignIn />
          </SignedOut>
        } />
        <Route path="/my-certifications" element={
          <SignedOut>
            <SignIn />
          </SignedOut>
        } />
      </Routes>
    </Suspense>
  );
}
