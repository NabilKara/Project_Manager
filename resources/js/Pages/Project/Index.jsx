import React, { useState } from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Head, Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import TableHeading from "@/Components/TableHeading.jsx";
import ActionButtons from '@/Components/ActionButtons';
import ConfirmModal from '@/Components/ConfirmModal';

// Status Badge Component
const StatusBadge = ({ status }) => (
  <span className={`px-2 py-1 rounded text-white ${PROJECT_STATUS_CLASS_MAP[status]}`}>
    {PROJECT_STATUS_TEXT_MAP[status]}
  </span>
);

// Table Search Header Component
const TableSearchHeader = ({ queryParams, searchFieldChanged, onKeyPress }) => (
  <tr className="text-nowrap">
    <th className="px-3 py-3"></th>
    <th className="px-3 py-3"></th>
    <th className="px-3 py-3">
      <TextInput
        className="w-full"
        defaultValue={queryParams.name}
        placeholder="Project Name"
        onBlur={(e) => searchFieldChanged('name', e.target.value)}
        onKeyPress={(e) => onKeyPress('name', e)}
      />
    </th>
    <th className="px-3 py-3">
      <SelectInput
        className="w-40"
        defaultValue={queryParams.status}
        onChange={e => searchFieldChanged('status', e.target.value)}
      >
        <option value="">Select Status</option>
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
      </SelectInput>
    </th>
    <th className="px-3 py-3"></th>
    <th className="px-3 py-3 text-nowrap"></th>
    <th className="px-3 py-3"></th>
    <th className="px-3 py-3 text-right"></th>
  </tr>
);

// ProjectsTable Component
const ProjectsTable = ({ projects, queryParams, onSort, searchFieldChanged, onKeyPress, onDelete }) => (
  <div className="overflow-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
        <tr className="text-nowrap">
          <TableHeading
            name="id"
            sort_field={queryParams.sort_field}
            sort_direction={queryParams.sort_direction}
            sortChanged={onSort}
          >ID</TableHeading>
          <th className="px-3 py-3">Image</th>
          <TableHeading
            name="name"
            sort_field={queryParams.sort_field}
            sort_direction={queryParams.sort_direction}
            sortChanged={onSort}
          >Name</TableHeading>
          <TableHeading
            name="status"
            sort_field={queryParams.sort_field}
            sort_direction={queryParams.sort_direction}
            sortChanged={onSort}
          >Status</TableHeading>
          <TableHeading
            name="create_at"
            sort_field={queryParams.sort_field}
            sort_direction={queryParams.sort_direction}
            sortChanged={onSort}
          >Create Date</TableHeading>
          <TableHeading
            name="due_date"
            sort_field={queryParams.sort_field}
            sort_direction={queryParams.sort_direction}
            sortChanged={onSort}
          >Due Date</TableHeading>
          <TableHeading
            name="created_by"
            sort_field={queryParams.sort_field}
            sort_direction={queryParams.sort_direction}
            sortable={onSort}
          >By</TableHeading>
          <th className="px-3 py-3 text-center">Action</th>
        </tr>
      </thead>
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
        <TableSearchHeader
          queryParams={queryParams}
          searchFieldChanged={searchFieldChanged}
          onKeyPress={onKeyPress}
        />
      </thead>
      <tbody>
        {projects.data.map((project) => (
          <tr
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            key={project.id}
          >
            <td className="px-3 py-2">{project.id}</td>
            <td className="px-3 py-2">
              <img src="https://img.freepik.com/vecteurs-libre/degrade-illustration-oiseau-colore_343694-1741.jpg?t=st=1734189314~exp=1734192914~hmac=33da567b69fc769fb18ea52bc5e97439d2e056369a60bcb260f141694213ab62&w=1380" className="w-[60px] h-[60px] object-cover rounded" alt={project.name} />
            </td>
            <th className="px-3 py-2 hover:underline text-gray-100 text-nowrap">
              <Link href={route('project.show', project.id)}>
                {project.name}
              </Link>
            </th>
            <td className="px-3 py-2">
              <StatusBadge status={project.status} />
            </td>
            <td className="px-3 py-2 text-nowrap">{project.created_at}</td>
            <td className="px-3 py-2 text-nowrap">{project.due_date}</td>
            <td className="px-3 py-2">{project.createdBy.name}</td>
            <td className="px-3 py-2">
              <ActionButtons
                editRoute={route('project.edit', project.id)}
                onDelete={() => onDelete(project)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Main Page Component
export default function Index({ auth, projects, queryParams = null, success }) {
  queryParams = queryParams || {};
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const searchFieldChanged = (name, value) => {
    const params = queryParams || {};
    if (value) {
      params[name] = value;
    } else {
      delete params[name];
    }
    router.get(route('project.index'), params);
  };

  const onKeyPress = (name, e) => {
    if (e.key === 'Enter') {
      searchFieldChanged(name, e.target.value);
    }
  };

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      queryParams.sort_direction = queryParams.sort_direction === 'asc' ? 'desc' : 'asc';
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = 'asc';
    }
    router.get(route("project.index"), queryParams);
  };

  const deleteProject = (project) => {
    setProjectToDelete(project);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (projectToDelete) {
      router.delete(route("project.destroy", projectToDelete.id));
      setIsConfirmOpen(false);
      setProjectToDelete(null);
    }
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Projects
          </h2>
          <Link
            href={route('project.create')}
            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-500"
          >
            Add new
          </Link>
        </div>
      }
    >
      <Head title="Projects" />
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {success && (
            <div className="mb-4 bg-emerald-500 py-2 px-4 text-white rounded">
              {success}
            </div>
          )}
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <ProjectsTable
                projects={projects}
                queryParams={queryParams}
                onSort={sortChanged}
                searchFieldChanged={searchFieldChanged}
                onKeyPress={onKeyPress}
                onDelete={deleteProject}
              />
              <Pagination links={projects.meta.links} />
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this project?"
      />
    </AuthenticatedLayout>
  );
}
