import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import { useAuthStore } from "./store/authStore"
import Register from "./pages/Register";
import Home from "./pages/UserPages/Home";

const GuestRoute=({children}: {children: React.ReactNode})=>{
    const {authUser}=useAuthStore();
    if(authUser){
      if(authUser.role==="Admin") return <Navigate to="/admin/dashboard"/>;
      if(authUser.role==="User") return <Navigate to="/user/dashboard"/>;
    }
    return <>{children}</>;
}

const ProtectedRoute=({children,allowedRoles}: {children: React.ReactNode; allowedRoles: string[]})=>{
    const {authUser}=useAuthStore();
    if(!authUser){
      return <Navigate to="/"/>;
    }
    if(allowedRoles && !allowedRoles.includes(authUser.role)){
      return <Navigate to="/"/>;
    }
    return <>{children}</>;
  }

function App() {

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Routes>
        <Route path="/" element={
          <GuestRoute>
            <Login/>
          </GuestRoute>
        }></Route>
        <Route path="/register" element={
          <GuestRoute>
            <Register/>
          </GuestRoute>
        }></Route>

        <Route path="/admin/dashboard" element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          </ProtectedRoute>
        }></Route>

        <Route path="/user/dashboard" element={
          <ProtectedRoute allowedRoles={["User"]}>
            <Home/>
          </ProtectedRoute>
        }></Route>
      </Routes>
    </div>
  )
}

export default App
