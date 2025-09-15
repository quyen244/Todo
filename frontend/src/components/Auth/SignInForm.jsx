// Signin Form .jsx
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {CheckCircle } from "lucide-react"
import EmailField from "./EmailField"
import PassField from "./PassField"
import { NavLink } from "react-router-dom"
import { Login } from "../../api/userApi"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../AuthProvider"

const registerSchema = z
  .object({
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự")
  })

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(registerSchema),
  })

  const { login } = useAuth();
  const navigate = useNavigate();
  
  const onSubmit = async (data) => {
    try {
      const res = await Login(data);

      console.log(res)
  
      // Lưu token vào context + localStorage
      login(res.data);

      navigate("/signup");
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl p-6">
      <div className="relative bg-white/95  p-6 border border-white/20">
        <NavLink to = '/home'  className="absolute top-4 left-4 font-black text-5xl text-amber-900 hover:text-amber-800 transition-colors duration-300 z-20 -mt-30 ml-2"
    >     Easy Frontend </NavLink>
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-4xl font-bold mb-10">
            Sign in
          </h2>
        </div>

        {/* Form Fields */}
        <form  className="space-y-4">
          <EmailField register={register} errors={errors} name = "email" />
          <PassField
            showPassword={showPassword}
            onClick={() => setShowPassword(prev => !prev)}
            register={register}
            errors={errors}
            name = "password"
            text="Mật khẩu" 
          />
       
          {/* Submit Button */}
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:shadow-xl'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Đang xử lý...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Đăng nhập</span>
              </div>
            )}
          </button>
        </form>
        <div className="w-48 border-b-2 border-gray-300 mx-auto my-4"></div>
        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Chưa tạo tài khoản ?{' '}
            <NavLink to="/signup"
                className="text-purple-600 underline hover:text-purple-800 cursor-pointer font-medium transition-colors duration-200 z-10 relative"
            >
                Đăng kí ngay
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  )
}
