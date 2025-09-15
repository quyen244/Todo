// SignUp.jsx
import React from "react"
import RegisterForm from "../components/Auth/RegisterForm"

export default function SignUp() {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center p-4 bg-gradient-to-br from-white to-blue relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-6xl">
        {/* Cột bên trái (form) */}
        <div className="flex-1 flex items-center justify-center">
          <RegisterForm />
        </div>

        {/* Cột bên phải (ảnh + quote) */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <img
              src="https://blog.advantageclub.co/wp-content/uploads/2023/01/ezgif.com-gif-maker-18.webp"
              alt="illustration"
              className="w-full max-w-xl h-64 sm:h-80 md:h-96 lg:h-[36rem] object-cover rounded-lg"
            />
            <p className="text-gray-700 italic">
              "Before Todoist, my to-do lists were scattered all around! Now,
              everything is in order and in one place."
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
