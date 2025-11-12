import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
        <input
          className={`
            w-full px-4 py-2.5 bg-gray-100 border-2 border-transparent rounded-xl
            text-sm text-gray-800 placeholder:text-gray-400
            outline-none transition-all duration-200
            focus:bg-white focus:border-primary-start
            disabled:opacity-50 disabled:cursor-not-allowed
            ${rightIcon ? 'pr-11' : ''}
            ${leftIcon ? 'pl-11' : ''}
            ${error ? 'border-red-500 bg-red-50' : ''}
            ${className}
          `}
          {...props}
        />
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
};
