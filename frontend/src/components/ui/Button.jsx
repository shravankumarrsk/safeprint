import React from 'react';

const variants = {
  default: 'bg-blue-600 text-white hover:bg-blue-700',
  destructive: 'bg-red-600 text-white hover:bg-red-700',
  outline: 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-800',
  ghost: 'hover:bg-gray-100 text-gray-800',
};

export const Button = React.forwardRef(({ className, variant = 'default', asChild = false, ...props }, ref) => {
  const Comp = asChild ? 'span' : 'button';
  return (
    <Comp
      className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${className}`}
      ref__={ref}
      {...props}
    />
  );
});

