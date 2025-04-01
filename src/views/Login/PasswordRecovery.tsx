import { useState } from "react";


const API_URL = import.meta.env.VITE_API_URL;


export default function PasswordRecovery() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1)

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/auth/send-reset-code?email=` + email, {
        method: "POST",
      });
  
      if (response.ok) {
        alert("Código enviado a tu correo");
        setStep(2);
      } else {
        alert("Error enviando el código");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un problema");
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const bodyData = JSON.stringify({
        email,
        verificationCode,
        newPassword, 
      });

  
      const resetResponse = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: bodyData,
      });
  
      
      if (resetResponse.ok) {
        alert("Contraseña restablecida con éxito");
        setStep(1);
      } else {
        alert("Error al restablecer la contraseña");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un problema");
    }
  };
  


  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        {step === 1 ? (
          <>
            <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
              Reset Password
            </h2>
            <p className="text-gray-500 text-center mb-6">
              Enter your email and we will send you a verification code.
            </p>
            <form onSubmit={handleSendCode} className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold py-3 rounded-lg transition hover:opacity-90"
              >
                Send Code
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
              Verify Code
            </h2>
            <p className="text-gray-500 text-center mb-6">
              Enter the code we sent to your email and set a new password.
            </p>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <input
                type="text"
                placeholder="Enter verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold py-3 rounded-lg transition hover:opacity-90"
              >
                Reset Password
              </button>
            </form>
          </>
        )}

        <div className="text-center mt-4">
          <a href="/login" className="text-pink-500 font-semibold">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}
