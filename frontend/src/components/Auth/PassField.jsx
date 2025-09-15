import React from 'react'
import { Eye, EyeOff, Lock } from "lucide-react"


export default function PassField({showPassword , setShowPassword, register , errors , name , text}) {
    return (
      <div>
        <label className="block text-sm font-semibold text-gray-700 ml-1">{text}</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            {...register(name)}
            type={showPassword ? "text" : "password"}
            className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 bg-gray-50/50 ${
              errors[name] ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={setShowPassword}
            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-purple-600 transition-colors"
          >
            {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
          </button>
        </div>
        {errors[name] && (
          <p className="text-red-500 text-sm flex items-center gap-1">
            <span className="w-1 h-1 bg-red-500 rounded-full"></span>
            {errors[name]?.message}
          </p>
        )}
      </div>
    )
  }
  