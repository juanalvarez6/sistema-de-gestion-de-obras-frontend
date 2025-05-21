import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

const API_URL = import.meta.env.VITE_USERS_URL;

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      const token = data.token;

      const userRes = await fetch(`${API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = await userRes.json();

      login(token, user);

      if (user.role === "ADMINISTRADOR") navigate("/admin");
      else if (user.role === "SUPERVISOR") navigate("/supervisor");
      else if (user.role === "OPERADOR") navigate("/operator");

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row bg-white max-w-4xl w-full rounded-lg shadow-lg overflow-hidden">
        {error && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
            {error}
          </div>
        )}
        {/* Sección izquierda - Formulario */}
        <div className="w-full md:w-1/2 p-6 md:p-8">
          <div className="flex justify-center mb-4">
            <img src="/logo.png" alt="Logo" className="w-20 h-20" />
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            We are The Lotus Team
          </h2>
          <p className="text-center text-gray-600 mb-6">Please login to your account</p>

          {error && <p className="text-red-500 text-center">{error}</p>} {/* Mensaje de error */}

          <form className="space-y-4" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={email}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full max-w-sm p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full max-w-sm p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              required
            />
            <button
              type="submit"
              className="w-full max-w-sm text-white py-2 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 hover:opacity-90 transition">
              LOG IN
            </button>
          </form>

          <div className="text-center mt-3">
            <p className="text-gray-500 mt-3">Forgot password?</p>
            <a href="/password-recovery" className="text-pink-500 font-semibold">Reset it</a>
          </div>

        </div>

        {/* Sección derecha - Texto con gradiente */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-8 text-white bg-gradient-to-r from-orange-500 to-pink-500">
          <h2 className="text-2xl font-bold mb-4">We are more than just a company</h2>
          <div className="space-y-6">
            <Feature title="Get started quickly" description="Integrate with developer-friendly APIs or choose low-code." />
            <Feature title="Support any business model" description="Host code that you don’t want to share with the world in private." />
            <Feature title="Join millions of businesses" description="Flowbite is trusted by ambitious startups and enterprises of every size." />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;

function Feature({ title, description }: { title: string, description: string }) {
  return (
    <div className="flex items-start space-x-3">
      <CheckCircle className="text-white-500 w-6 h-6 mt-1" />
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-300 text-sm">{description}</p>
      </div>
    </div>
  );
}