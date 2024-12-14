import React, { forwardRef } from 'react';

const StatusSelect = forwardRef(({ className = '', children, ...props }, ref) => {
  return (
    <div className="relative">
      <select
        {...props}
        ref={ref}
        className={
          'w-full rounded-md bg-gray-800 border-gray-700 text-white focus:border-indigo-500 focus:ring-indigo-500 shadow-sm ' +
          className
        }
        style={{
          // Force background color on options
          WebkitAppearance: 'none',
          MozAppearance: 'none',
          appearance: 'none',
          backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
          backgroundPosition: 'right 0.5rem center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1.5em 1.5em',
          paddingRight: '2.5rem'
        }}
      >
        {children}
      </select>
    </div>
  );
});

SelectInput.displayName = 'SelectInput';

export default StatusSelect;