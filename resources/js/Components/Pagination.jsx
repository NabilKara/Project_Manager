import { Link } from "@inertiajs/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ links }) {
  // Skip rendering if there's only 1 page
  if (links.length <= 3) return null;

  return (
    <nav className="flex items-center justify-center gap-1 mt-6">
      {links.map((link, index) => {
        // Check if it's a previous/next link
        const isPrevious = index === 0;
        const isNext = index === links.length - 1;
        
        // Create content based on link type
        const content = isPrevious ? (
          <ChevronLeft size={16} />
        ) : isNext ? (
          <ChevronRight size={16} />
        ) : (
          <span dangerouslySetInnerHTML={{ __html: link.label }} />
        );

        return (
          <Link
            preserveScroll
            key={link.label}
            href={link.url || ""}
            className={`
              relative inline-flex items-center justify-center min-w-[36px] h-9 px-3 
              text-sm font-medium transition-colors
              rounded-md select-none
              ${
                link.active
                  ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
                  : link.url
                  ? "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                  : "text-gray-400 dark:text-gray-600 cursor-not-allowed"
              }
              ${isPrevious ? "mr-2" : ""}
              ${isNext ? "ml-2" : ""}
            `}
            aria-label={isPrevious ? "Previous page" : isNext ? "Next page" : `Page ${link.label}`}
            aria-disabled={!link.url}
            aria-current={link.active ? "page" : undefined}
          >
            {content}
          </Link>
        );
      })}
    </nav>
  );
}