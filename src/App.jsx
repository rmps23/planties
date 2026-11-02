import { Navigate, Outlet, Route, Routes } from "react-router-dom"
import { AuthProvider, useAuth } from "./context/AuthContext"
import { isConfigured } from "./lib/supabase"
import Intro from "./components/homepage/Intro"
import AppLayout from "./components/home/AppLayout"
import Feed from "./components/home/Feed"
import Profile from "./components/home/profile/Profile"
import SpeciesList from "./components/home/species/SpeciesList"
import SpeciesDetail from "./components/home/species/SpeciesDetail"
import QuestionList from "./components/home/questions/QuestionList"
import QuestionDetail from "./components/home/questions/QuestionDetail"
import ForgotPassword from "./components/homepage/forms/ForgotPassword"
import ResetPassword from "./components/homepage/forms/ResetPassword"
import NotFound from "./components/NotFound"

const Splash = ({ children }) => (
  <main className="min-h-screen flex items-center justify-center text-neutral-100 p-6 text-center">
    {children}
  </main>
)

const RequireAuth = () => {
  const { user, loading } = useAuth()
  if (loading) return <Splash>Loading…</Splash>
  return user ? <Outlet /> : <Navigate to="/" replace />
}

const PublicOnly = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return <Splash>Loading…</Splash>
  return user ? <Navigate to="/feed" replace /> : children
}

function App() {
  if (!isConfigured) {
    return (
      <Splash>
        <p>
          Missing Supabase configuration. Copy <code>.env.example</code> to{" "}
          <code>.env</code> and set <code>VITE_SUPABASE_URL</code> and{" "}
          <code>VITE_SUPABASE_PUBLISHABLE_KEY</code>.
        </p>
      </Splash>
    )
  }

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<PublicOnly><Intro /></PublicOnly>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route element={<RequireAuth />}>
          <Route element={<AppLayout />}>
            <Route path="/feed" element={<Feed />} />
            <Route path="/u/:username" element={<Profile />} />
            <Route path="/plants" element={<SpeciesList />} />
            <Route path="/plants/:slug" element={<SpeciesDetail />} />
            <Route path="/questions" element={<QuestionList />} />
            <Route path="/questions/:id" element={<QuestionDetail />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
