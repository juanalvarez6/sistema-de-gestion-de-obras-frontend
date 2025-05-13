import {Routes, Route } from 'react-router-dom';
import Login from '../views/Login/Login';
import WorkerPanel from '../views/WorkerPanel/WorkerPanel';
import MaterialRequests from '../views/MaterialRequests/MaterialRequests';
import TaskManagement from '../views/TaskManagement/TaskManagement';
import PasswordRecovery from '../views/Login/PasswordRecovery';
import Reports from '../views/Reports/Reports';
import Register from '../views/Login/register/Register';
import App from '../App';
import AdminView from '../views/admin/AdminView';



const AppRoutes = () => {
    return (
            <Routes>
                <Route path='/' element={<App/>}></Route>
                <Route path='/login' element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<AdminView />} />
                <Route path="/worker-panel" element={<WorkerPanel />} />
                <Route path="/material-requests" element={<MaterialRequests />} />
                <Route path="/task-management" element={<TaskManagement />} />
                <Route path="/reports" element={<Reports />} />
                <Route path= "/password-recovery" element={<PasswordRecovery />} />
            </Routes>
    );
}

export default AppRoutes;