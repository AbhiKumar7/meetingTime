import { useState } from "react";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import useAuthUser from "./hooks/useAuthUserHook";
import PageLoader from "./components/pageLoader";
import SignupPage from "./pages/SignUppage";
import LoginPage from "./pages/LoginPage";
import OnboardPage from "./pages/OnboardPage";
import Layout from "./components/Layout";
import { useThemeStore } from "./hooks/useThemeHook";
import NotificationsPage from "./pages/NotificationsPage";
import ChatPage from "./pages/ChatPage";

function App() {
  const { isLoading, authUser } = useAuthUser();
  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;
  const { theme } = useThemeStore();
  if (isLoading) return <PageLoader />;
  return (
    <>
      <div data-theme={theme}>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated && isOnboarded ? (
                <Layout showSidebar={true}>
                  <Home />
                </Layout>
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboard"} />
              )
            }
          />

          <Route
            path="/signup"
            element={
              !isAuthenticated ? (
                <SignupPage />
              ) : (
                <Navigate to={isOnboarded ? "/" : "/onboard"} />
              )
            }
          />
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <LoginPage />
              ) : (
                <Navigate to={isOnboarded ? "/" : "/onboard"} />
              )
            }
          />
          <Route
            path="/notifications"
            element={
              isAuthenticated && isOnboarded ? (
                <Layout showSidebar={true}>
                  <NotificationsPage />
                </Layout>
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
              )
            }
          />
          <Route
            path="/chat/:id"
            element={
              isAuthenticated && isOnboarded ? (
                <Layout showSidebar={false}>
                  <ChatPage />
                </Layout>
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
              )
            }
          />
          <Route
            path="/onboard"
            element={
              isAuthenticated ? (
                !isOnboarded ? (
                  <OnboardPage />
                ) : (
                  <Navigate to="/" />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
