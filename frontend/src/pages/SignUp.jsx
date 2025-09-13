// RegisterForm.jsx
import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

// 1. Schema validate với Zod
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

// 2. Component RegisterForm
export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = (data) => {
    console.log("Form Data:", data)
  }

  return (
   <div className = "min-h-screen w-screen flex items-center justify-center pb-16">
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 bg-white rounded-xl shadow"
    >
        <h2 className="text-2xl font-bold mb-4">Đăng ký</h2>

        {/* Username */}
        <div className="mb-4">
            <label className="block mb-1 font-medium">Tên đăng nhập</label>
            <input
            {...register("username")}
            className="w-full border p-2 rounded focus:outline-blue-500"
            placeholder="Tên của bạn"
            />
            {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
        </div>

        {/* Email */}
        <div className="mb-4">
            <label className="block mb-1 font-medium">Email</label>
            <input
            {...register("email")}
            className="w-full border p-2 rounded focus:outline-blue-500"
            placeholder="example@gmail.com"
            />
            {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
        </div>

        {/* Password */}
        <div className="mb-4">
            <label className="block mb-1 font-medium">Mật khẩu</label>
            <input
            type="password"
            {...register("password")}
            className="w-full border p-2 rounded focus:outline-blue-500"
            placeholder="******"
            />
            {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
            <label className="block mb-1 font-medium">Xác nhận mật khẩu</label>
            <input
            type="password"
            {...register("confirmPassword")}
            className="w-full border p-2 rounded focus:outline-blue-500"
            placeholder="******"
            />
            {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
            </p>
            )}
        </div>

        <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
            Đăng ký
        </button>
    </form>
   </div>
  )
}
