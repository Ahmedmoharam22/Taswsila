import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  // التعديل هنا: استبدال primary بـ brand-600
  const variants = {
    primary: 'bg-brand-600 text-white hover:bg-brand-700 shadow-md shadow-brand-600/20',
    secondary: 'bg-accent text-white hover:bg-amber-600 shadow-md shadow-accent/20',
    outline: 'border-2 border-brand-600 text-brand-600 hover:bg-brand-600 hover:text-white',
    ghost: 'text-slate-600 hover:bg-slate-100',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -2 }} // حركة صعود خفيفة احترافية
      whileTap={{ scale: 0.97 }}
      className={`px-6 py-2.5 rounded-xl font-bold transition-all duration-300 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;