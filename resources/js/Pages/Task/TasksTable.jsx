import { Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import React, { useState } from 'react';
import TextInput from "@/Components/TextInput";
import TableHeading from "@/Components/TableHeading";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants.jsx";
import ActionButtons from '@/Components/ActionButtons';
import ConfirmModal from "@/Components/ConfirmModal.jsx";

// Status Badge Component
const StatusBadge = ({ status }) => (
  <span className={`px-2 py-1 rounded text-nowrap text-white ${TASK_STATUS_CLASS_MAP[status]}`}>
    {TASK_STATUS_TEXT_MAP[status]}
  </span>
);

// Search Header Component
const SearchHeader = ({ hideProjectColumn, queryParams, searchFieldChanged, onKeyPress }) => (
  <tr className="text-nowrap">
    <th className="px-3 py-3"></th>
    <th className="px-3 py-3"></th>
    {!hideProjectColumn && <th className="px-3 py-3"></th>}
    <th className="px-3 py-3">
      <TextInput
        className="w-full"
        defaultValue={queryParams.name}
        placeholder="Task Name"
        onBlur={(e) => searchFieldChanged("name", e.target.value)}
        onKeyPress={(e) => onKeyPress("name", e)}
      />
    </th>
    <th className="px-3 py-3">
      <SelectInput
        className="w-35"
        defaultValue={queryParams.status}
        onChange={(e) => searchFieldChanged("status", e.target.value)}
      >
        <option value="">Select Status</option>
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
      </SelectInput>
    </th>
    <th className="px-3 py-3"></th>
    <th className="px-3 py-3"></th>
    <th className="px-3 py-3"></th>
    <th className="px-3 py-3"></th>
  </tr>
);

// Task Row Component
const TaskRow = ({ task, hideProjectColumn, onDelete }) => (
  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={task.id}>
    <td className="px-3 py-2">{task.id}</td>
    <td className="px-3 py-2">
      <img src="https://img.freepik.com/vecteurs-libre/degrade-illustration-oiseau-colore_343694-1741.jpg?t=st=1734189314~exp=1734192914~hmac=33da567b69fc769fb18ea52bc5e97439d2e056369a60bcb260f141694213ab62&w=1380" className="w-[60px] h-[60px] object-cover rounded" alt={task.name} />
    </td>
    {!hideProjectColumn && <td className="px-3 py-2">{task.project.name}</td>}
    <th className="px-3 py-2 text-gray-100 hover:underline">
      <Link href={route("task.show", task.id)}>{task.name}</Link>
    </th>
    <td className="px-3 py-2">
      <StatusBadge status={task.status} />
    </td>
    <td className="px-3 py-2 text-nowrap">{task.created_at}</td>
    <td className="px-3 py-2 text-nowrap">{task.due_date}</td>
    <td className="px-3 py-2">{task.createdBy.name}</td>
    <td className="px-3 py-2">
        <ActionButtons
            editRoute={route('task.edit', task.id)}
            onDelete={() => onDelete(task)}
        />
    </td>
  </tr>
);

// Main Component
export default function TasksTable({
  tasks,
  success,
  queryParams = null,
  hideProjectColumn = false,
}) {
  queryParams = queryParams || {};
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const deleteTask = (task) => {
        setTaskToDelete(task);
        setIsConfirmOpen(true);
    };
    const handleConfirmDelete = () => {
        if (taskToDelete) {
            router.delete(route("task.destroy", taskToDelete.id));
            setIsConfirmOpen(false);
            setTaskToDelete(null);
        }
    };
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }
    router.get(route("task.index"), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key === "Enter") {
      searchFieldChanged(name, e.target.value);
    }
  };

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      queryParams.sort_direction = queryParams.sort_direction === "asc" ? "desc" : "asc";
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }
    router.get(route("task.index"), queryParams);
  };

  return (
    <>
      <div className="overflow-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
            <tr className="text-nowrap">
              <TableHeading
                name="id"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                ID
              </TableHeading>
              <th className="px-3 py-3">Image</th>
              {!hideProjectColumn && <th className="px-3 py-3">Project Name</th>}
              <TableHeading
                name="name"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                Name
              </TableHeading>
              <TableHeading
                name="status"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                Status
              </TableHeading>
              <TableHeading
                name="created_at"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                Create Date
              </TableHeading>
              <TableHeading
                name="due_date"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                Due Date
              </TableHeading>
              <th className="px-3 py-3">
              <TableHeading
                name="due_date"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                BY
              </TableHeading>
              </th>
              <th className="px-3 py-3 text-center">Action</th>
            </tr>
          </thead>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
            <SearchHeader
              hideProjectColumn={hideProjectColumn}
              queryParams={queryParams}
              searchFieldChanged={searchFieldChanged}
              onKeyPress={onKeyPress}
            />
          </thead>
          <tbody>
            {tasks.data.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                hideProjectColumn={hideProjectColumn}
                onDelete={deleteTask}
              />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination links={tasks.meta.links} />
        <ConfirmModal
            isOpen={isConfirmOpen}
            onClose={() => setIsConfirmOpen(false)}
            onConfirm={handleConfirmDelete}
            message="Are you sure you want to delete this task?"
        />
    </>
  );
}
