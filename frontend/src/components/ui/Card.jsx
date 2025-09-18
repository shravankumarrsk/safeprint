import React from 'react';

export const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div ref__={ref} className={`rounded-xl border bg-white text-gray-900 shadow ${className}`} {...props} />
));

export const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref__={ref} className={`p-6 ${className}`} {...props} />
));