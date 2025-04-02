import { useState } from "react";

interface User {
  id: number;
  nombre: string;
  email: string;
  rol: "ADMIN" | "SUPERVISOR" | "TRABAJADOR";
}

// Datos de ejemplo
const usersData: User[] = [
  { id: 1, nombre: "Juan Pérez", email: "juan@example.com", rol: "ADMIN" },
  { id: 2, nombre: "María Gómez", email: "maria@example.com", rol: "SUPERVISOR" },
  { id: 3, nombre: "Carlos Ramírez", email: "carlos@example.com", rol: "TRABAJADOR" },
  { id: 4, nombre: "Laura Fernández", email: "laura@example.com", rol: "TRABAJADOR" },
];

const UsersList = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const filteredUsers = usersData
    .filter(user => user.nombre.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()))
    .filter(user => (roleFilter ? user.rol === roleFilter : true));

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Lista de Usuarios</h2>

      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre o email..."
          className="w-full px-3 py-2 border rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="px-3 py-2 border rounded-md"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="ADMIN">Admin</option>
          <option value="SUPERVISOR">Supervisor</option>
          <option value="TRABAJADOR">Trabajador</option>
        </select>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Rol</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length ? (
            filteredUsers.map((user) => (
              <tr key={user.id} className="text-center border">
                <td className="border p-2">{user.nombre}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.rol}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="p-4 text-gray-500 text-center">
                No hay usuarios que coincidan con la búsqueda.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UsersList;
