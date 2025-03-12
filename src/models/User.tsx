interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    rol: "Supervisor" | "Trabajador";
}

export default User