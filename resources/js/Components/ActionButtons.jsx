import React from 'react';
import { Link } from '@inertiajs/react';

const ActionButtons = ({ editRoute, onDelete }) => (
  <div className="flex items-center justify-end gap-3">
    <Link
      href={editRoute}
      className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-150 ease-in-out"
    >
      Edit
    </Link>
    <span className="text-gray-300 dark:text-gray-600">|</span>
    <button
      onClick={onDelete}
      className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-150 ease-in-out"
    >
      Delete
    </button>
  </div>
);

export default ActionButtons;