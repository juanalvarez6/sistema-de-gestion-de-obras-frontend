import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthProvider";
import { ArrowLeft } from "lucide-react";

const formFields = [
  { name: "fullName", type: "text", placeholder: "Full Name" },
  { name: "email", type: "email", placeholder: "Email" },
  { name: "password", type: "password", placeholder: "Password" },
  { name: "numberID", type: "text", placeholder: "ID Number" },
];

const roles = ["ADMINISTRADOR", "SUPERVISOR", "OPERADOR"];

const InputField = ({
  name,
  type,
  placeholder,
  onChange,
}: {
  name: string;
  type: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    onChange={onChange}
    required
  />
);

export default function Register() {
  const API_URL = import.meta.env.VITE_USERS_URL;
  const { token } = useAuth();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    numberID: "",
    role: roles[0],
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!token) {
      setError("You must be logged in as ADMINISTRADOR to register a user.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.detail || "An unexpected error occurred.";
        throw new Error(`Error ${response.status}: ${errorMessage}`);
      }

      setSuccess("User registered successfully!");
      setForm({ fullName: "", email: "", password: "", numberID: "", role: roles[0] });

    } catch (err) {
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 p-4">

      <div className="flex flex-col md:flex-row bg-white max-w-4xl w-full rounded-lg shadow-lg overflow-hidden">
        {/* Mensaje de error flotante */}
        {error && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
            {error}
          </div>
        )}

        {/* Sección derecha visible primero en móviles */}
        <div className="w-full md:w-1/2 bg-gradient-to-r from-orange-500 to-pink-500 flex flex-col justify-center text-white p-8 md:p-12">
          <h2 className="text-2xl font-bold">Welcome to Our Community</h2>
          <p className="mt-4 text-lg">Join thousands of people who are already growing with us.</p>
        </div>

        {/* Sección izquierda - Formulario */}
        <div className="relative w-full md:w-1/2 bg-white flex flex-col justify-center p-8 md:p-12">
          <a
            href="/admin"
            className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-2 bg-white/80 hover:bg-white text-pink-600 hover:text-pink-700 font-medium rounded-lg border border-pink-100 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
          </a>
          <h2 className="text-2xl font-bold text-center text-gray-800">Create an Account</h2>
          <p className="text-gray-500 text-center mb-6">Join us and start your journey</p>

          {success && <p className="text-green-500 text-center">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {formFields.map((field) => (
              <InputField key={field.name} {...field} onChange={handleChange} />
            ))}

            {/* Selector de ROL */}
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="w-full text-white py-3 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 hover:opacity-90"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}