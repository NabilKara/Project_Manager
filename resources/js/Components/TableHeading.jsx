import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/16/solid/index.js";

export default function TableHeading({
  name,
  sortable = true,
  sort_field = null,
  sort_direction = null,
  sortChanged = () => {},
  children
}) {
  return (
    <th onClick={(e) => sortChanged(name)}>
      <div className="px-3 py-3 flex items-center gap-1 cursor-pointer">
        <div className="flex-1 text-center">{children}</div>
        {sortable && (
          <div className="flex flex-col -space-y-2">
            <ChevronUpIcon className={
              "w-4 " +
              (sort_field === name && sort_direction === 'asc' ? 'text-white' : "")
            }/>
            <ChevronDownIcon className={
              "w-4 " +
              (sort_field === name && sort_direction === 'desc' ? 'text-white' : "")
            }/>
          </div>
        )}
      </div>
    </th>
  );
}