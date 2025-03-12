import { useState } from "react";

const formFields = [
  { name: "name", type: "text", placeholder: "Name" },
  { name: "lastname", type: "text", placeholder: "Lastname" },
  { name: "phone", type: "text", placeholder: "Phone" },
  { name: "identification", type: "text", placeholder: "Identification" },
  { name: "email", type: "email", placeholder: "Email" },
  { name: "password", type: "password", placeholder: "Password" },
];

const InputField = ({ name, type, placeholder, onChange }: { name: string; type: string; placeholder: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    onChange={onChange}
  />
);

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    lastname: "",
    phone: "",
    identification: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted", form);
  };

  return (
    <div className="flex h-screen">
      {/* Sección izquierda - Formulario */}
      <div className="w-1/2 bg-white flex flex-col justify-center p-12">
        <h2 className="text-2xl font-bold text-center text-gray-800">Create an Account</h2>
        <p className="text-gray-500 text-center mb-6">Join us and start your journey</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {formFields.map((field) => (
            <InputField key={field.name} {...field} onChange={handleChange} />
          ))}

          <button
            type="submit"
            className="w-full text-white py-3 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 hover:opacity-90"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-500 mt-4">
          Already have an account? 
          <a href="/login" className="text-pink-500 font-semibold"> Log in</a>
        </p>
      </div>

      {/* Sección derecha - Información */}
      <div className="w-1/2 bg-gradient-to-r from-orange-500 to-pink-500 flex flex-col justify-center text-white p-12">
        <h2 className="text-2xl font-bold">Welcome to Our Community</h2>
        <p className="mt-4 text-lg">Join thousands of people who are already growing with us.</p>
      </div>
    </div>
  );
}
