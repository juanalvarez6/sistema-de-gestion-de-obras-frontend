import ProjectsList from "./ProjectList";
import UsersList from "./UsersList";

const  Dashboard = () => {
    return (
        <>
        <h1>Dashboard</h1>
        <UsersList />
        <ProjectsList />
        </>
    );
}

export default Dashboard