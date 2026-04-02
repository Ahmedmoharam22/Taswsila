export const FormField = ({ label, error, children }) => (
  <div className="space-y-2">
    <label className="text-sm font-black text-slate-700 mr-2 uppercase tracking-wide">
      {label}
    </label>
    {children}
    {error && <p className="text-red-500 text-xs font-bold mr-2">{error.message}</p>}
  </div>
);