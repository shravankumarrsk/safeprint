import React from 'react';

export const Progress = React.forwardRef(({ className, value, ...props }, ref) => (
  <div ref__={ref} className={`relative h-2 w-full overflow-hidden rounded-full bg-gray-200 ${className}`} {...props}>
    <div
      className="h-full w-full flex-1 bg-blue-600 transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </div>
));