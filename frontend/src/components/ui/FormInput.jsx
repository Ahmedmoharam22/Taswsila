import React from 'react';

export const FormInput = ({ label, icon: Icon, type = 'text', register, name, error, placeholder }) => (
  <div className="space-y-1">
    <div className="relative">
      {Icon && (
        <Icon 
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" 
          size={18} 
        />
      )}
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className={`w-full ${Icon ? 'pr-12' : 'pr-4'} pl-4 py-4 bg-slate-50 border-2 rounded-2xl outline-none transition-all font-medium
          ${error 
            ? 'border-red-400 focus:border-red-500 text-red-900 placeholder:text-red-300' 
            : 'border-transparent focus:border-brand-600 text-slate-900'
          }`}
      />
    </div>
    {error && (
      <span className="text-red-500 text-xs font-bold px-2">
        {error.message}
      </span>
    )}
  </div>
);