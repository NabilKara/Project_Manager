import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";
import {
    TASK_STATUS_CLASS_MAP,
    TASK_STATUS_TEXT_MAP
} from "@/constants.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import { ChevronUpIcon, ChevronDownIcon  } from '@heroicons/react/16/solid'
import TableHeading from "@/Components/TableHeading.jsx";
export default function Index({auth, tasks, queryParams = null }){
    queryParams = queryParams || {};
        const searchFieldChanged = (name, value) => {
            const params = queryParams || {};
            if (value) {
                params[name] = value;
            } else {
                delete params[name];
            }
            router.get(route('task.index'), params);
        };
        const  onKeyPress = (name,e) => {
            if(e.key !== 'Enter') return;

            searchFieldChanged(name,e.target.value)
        }
        const sortChanged = (name) => {
           if (name === queryParams.sort_field) {
               if(queryParams.sort_direction === 'asc'){
                   queryParams.sort_direction = 'desc'
               }else{
                   queryParams.sort_direction = 'asc'
               }
           }else{
               queryParams.sort_field = name;
               queryParams.sort_direction = 'asc';
           }
           router.get(route("task.index"), queryParams);
        }

    return (
        <AuthenticatedLayout
            user ={auth.user}
            header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                Projects
            </h2>
        }
        >
            <Head title="Projects" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-auto">
                                <table
                                    className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead
                                        className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <TableHeading
                                            name="id"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >ID</TableHeading>
                                        <th className="px-3 py-3">image</th>
                                        <TableHeading
                                            name="name"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >Name</TableHeading>
                                        <TableHeading
                                            name="status"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >Status</TableHeading>
                                        <TableHeading
                                            name="create_at"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >Create Date</TableHeading>
                                        <TableHeading
                                            name="due_date"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortChanged={sortChanged}
                                        >Due Date</TableHeading>
                                        <TableHeading
                                            name="created_by"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortable={false}
                                        >Created By</TableHeading>
                                        <TableHeading
                                            name="action"
                                            sort_field={queryParams.sort_field}
                                            sort_direction={queryParams.sort_direction}
                                            sortable={false}
                                        >Action</TableHeading>
                                        </tr>
                                    </thead>
                                    <thead
                                        className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
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
                                            <SelectInput className="w-40"
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
                                    </thead>
                                    <tbody>
                                    {tasks.data.map((task) => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                            key={task.id}>
                                            <td className="px-3 py-2">{task.id}</td>
                                            <td className="px-3 py-2">
                                                <img src={task.image_path} style={{width: 60}} alt=""/>
                                            </td>
                                            <td className="px-3 py-2">{task.name}</td>
                                            <td className="px-3 py-2">
                                           <span className={
                                               "px-2 py-1 rounded  text-white " +
                                               TASK_STATUS_CLASS_MAP[task.status]
                                           }>
                                                {TASK_STATUS_TEXT_MAP[task.status]}
                                           </span>
                                            </td>
                                            <td className="px-3 py-2 text-nowrap">{task.created_at}</td>
                                            <td className="px-3 py-2 text-nowrap">{task.due_date}</td>
                                            <td className="px-3 py-2">{task.createdBy.name}</td>
                                            <td className="px-3 py-2">
                                                <Link href={route('task.edit', task.id)}
                                                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">
                                                    Edit
                                                </Link>
                                                <Link href={route('task.destroy', task.id)}
                                                      className="font-medium text-blue-600 dark:text-red-500 hover:underline mx-1">
                                                    Delete
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={tasks.meta.links}/>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
