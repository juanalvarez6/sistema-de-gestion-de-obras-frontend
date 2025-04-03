import ProjectsList from "./projects/ProjectList";
import UsersList from "./UsersList";
import WorkZonesList from "./workZone/WorkZoneList";

const Dashboard = () => {
    return (
        <>
            <h1>Dashboard</h1>
            <UsersList />
            <ProjectsList />
            <WorkZonesList />
        </>
    );
}

export default Dashboard