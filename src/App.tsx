import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./views/Login/Login";
import AdminView from "./views/admin/AdminView";
import SupervisorView from "./views/supervisor/SupervisorView";
import OperatorView from "./views/operator/OperatorView";
import LogoutButton from "./components/LogoutButton";
import Register from "./views/Login/register/Register";
import PasswordRecovery from "./views/Login/PasswordRecovery";

function App() {
  return (

    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/password-recovery" element={<PasswordRecovery />} />

          <Route
            path="register"
            element={
              <ProtectedRoute allowedRoles={["ADMINISTRADOR"]}>
                <Register />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["ADMINISTRADOR"]}>
                <>
                  <AdminView />
                  <LogoutButton />
                </>
              </ProtectedRoute>
            }
          />

          <Route
            path="/supervisor"
            element={
              <ProtectedRoute allowedRoles={["SUPERVISOR"]}>
                <>
                  <SupervisorView />
                  <LogoutButton />
                </>
              </ProtectedRoute>
            }
          />

          <Route
            path="/operator"
            element={
              <ProtectedRoute allowedRoles={["OPERADOR"]}>
                <>
                  <OperatorView />
                  <LogoutButton />
                </>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>

      {/*<div className='flex justify-around m-8'>
          <Link to='/login' className='bg-blue-500 rounded-full p-3 hover:bg-sky-300'>Login </Link>
          <Link to='/dashboard' className='bg-blue-500 rounded-full p-3 hover:bg-sky-300'>Dashboard </Link>
          <Link to='/supervisor' className='bg-blue-500 rounded-full p-3 hover:bg-sky-300'>Supervisor View </Link>
          <Link to='/worker-panel' className='bg-blue-500 rounded-full p-3 hover:bg-sky-300'>Worker-panel </Link>
          <Link to='/material-requests' className='bg-blue-500 rounded-full p-3 hover:bg-sky-300'>MaterialRequests </Link>
          <Link to='/task-management' className='bg-blue-500 rounded-full p-3 hover:bg-sky-300'>TaskManagement </Link>
          <Link to='/reports' className='bg-blue-500 rounded-full p-3 hover:bg-sky-300'>Reports</Link>
        </div>*/}
    </>
  );
}

export default App;