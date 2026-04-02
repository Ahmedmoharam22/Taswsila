import React from 'react';

export const FormInput = ({ 
  label, 
  icon: Icon, 
  type = 'text', 
  register, 
  name, 
  error, 
  placeholder,
  disabled = false 
}) => (
  <div className="space-y-2 text-right">
    {label && (
      <label className="text-sm font-black text-slate-500 mr-2 uppercase tracking-wide flex items-center gap-2">
        {Icon && <Icon size={14} />} {label}
      </label>
    )}
    <div className="relative">
      {Icon && (
        <Icon 
          className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-600 transition-colors" 
          size={20} 
        />
      )}
      <input
        {...(register && register(name))}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full ${Icon ? 'pr-14' : 'pr-6'} pl-6 py-4 bg-slate-50 border-2 rounded-[1.5rem] outline-none transition-all font-bold
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${error 
            ? 'border-red-400 focus:border-red-500 text-red-900 placeholder:text-red-300 bg-red-50' 
            : 'border-transparent focus:border-brand-600 text-slate-900'
          }`}
      />
    </div>
    {error && (
      <span className="text-red-500 text-xs font-bold px-2 block mt-1">
        {error.message}
      </span>
    )}
  </div>
);