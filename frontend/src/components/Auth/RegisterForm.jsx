// RegisterForm.jsx - Fixed Version
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import UserField from "./UserField"
import EmailField from "./EmailField"
import PassField from "./PassField"
import { NavLink , Navigate} from "react-router-dom"
import { SignUp } from "../../api/userApi"
import { useAuth } from "../AuthProvider"
import { useNavigate } from "react-router-dom";

const registerSchema = z
  .object({
    username: z.string().min(3, "Tên phải có ít nhất 3 ký tự"),
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  })

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(registerSchema),
  })


  const { login } = useAuth(); // lấy hàm login từ context

  const onSubmit = async (data) => {
    try {
      const res = await SignUp({ 
        username: data.username,
        email: data.email,
        password: data.password
      });

      // Đăng nhập sau khi đăng ký thành công
      navigate('/home')

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl p-6">
      <div className="relative  bg-white/95 p-6 border border-white/20">
        <NavLink to = '/home'  className="absolute top-4 left-4 font-black text-5xl text-amber-900 hover:text-amber-800 transition-colors duration-300 z-20 -mt-30 ml-2"
  >     Easy Frontend </NavLink>
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-4xl font-bold mb-10">
            Sign up 
          </h2>
        </div>

        {/* Form Fields */}
        <form className="space-y-4" onSubmit={handleSubmit((data) => {
                console.log("onSubmit called", data);
                onSubmit(data);
            })}>
          <UserField register={register} errors={errors} />
          <EmailField register={register} errors={errors} />
          <PassField
            showPassword={showPassword}
            setShowPassword={() => setShowPassword(prev => !prev)}
            register={register}
            errors={errors}
            name="password"
            text="Mật khẩu"
            />
            <PassField
            showPassword={showConfirmPassword}
            setShowPassword={() => setShowConfirmPassword(prev => !prev)}
            register={register}
            errors={errors}
            name="confirmPassword"
            text="Xác nhận mật khẩu"
            />


          <button
            type="submit"   
            disabled={isSubmitting}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg relative z-10 hover:cursor-pointer ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:shadow-xl'
              }`}
              
          >
            {isSubmitting ? "Đang xử lý..." : "Tạo Tài Khoản"}
          </button>
        </form>

        <div className="w-48 border-b-2 border-gray-300 mx-auto my-4"></div>
        
        {/* Footer - Fixed */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Đã có tài khoản?{' '}
          
            <NavLink 
              to="/signin"
              className="text-purple-600 underline hover:text-purple-800 cursor-pointer font-medium transition-colors duration-200 z-10 relative"
            >
              Đăng nhập ngay
            </NavLink> 
          </p>
        </div>
      </div>
    </div>
  )
}