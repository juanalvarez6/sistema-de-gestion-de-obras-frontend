import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row bg-white max-w-4xl w-full rounded-lg shadow-lg overflow-hidden">
        
        {/* Sección izquierda - Formulario */}
        <div className="w-full md:w-1/2 p-6 md:p-8">
          <div className="flex justify-center mb-4">
            <img src="/logo.png" alt="Logo" className="w-20 h-20" />
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            We are The Lotus Team
          </h2>
          <p className="text-center text-gray-600 mb-6">Please login to your account</p>

          <form className="space-y-4">
            <input 
              type="text" 
              placeholder="Username"
              className="w-full max-w-sm p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            />
            <input 
              type="password" 
              placeholder="Password"
              className="w-full max-w-sm p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            />
            <button 
              className="w-full max-w-sm text-white py-2 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 hover:opacity-90 transition">
              LOG IN
            </button>
          </form>

          <p className="text-center text-gray-500 mt-3">Forgot password?</p>

          <div className="text-center mt-4">
            <p className="text-gray-600">Don’t have an account?</p>
            <button onClick={() => navigate ("/register")} className="border border-red-500 text-red-500 px-4 py-2 rounded-lg mt-2 hover:bg-red-500 hover:text-white transition">
              REGISTER
            </button>
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


 