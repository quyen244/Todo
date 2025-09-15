import React from 'react'
import {User } from "lucide-react"
export default function UserField({register , errors}) {
  return (
    <div>
       {/* Username Field */}
       <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 ml-1">
                Tên đăng nhập
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register("username")}
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 bg-gray-50/50 ${
                    errors.username ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="Tên của bạn"
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.username.message}
                </p>
              )}
            </div>
    </div>
  )
}
