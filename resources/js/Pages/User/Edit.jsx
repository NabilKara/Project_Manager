import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router, useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import TextAreaInput from "@/Components/TextAreaInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";

export default function Edit({ auth , user , isFocused = false}){
    const {data, setData, post, errors, reset} = useForm({
        image : '',
        name : user.name || "" ,
        status :  user.status|| ""  ,
        description: user.description || "" ,
        due_date: user.due_date || "",
        _method: 'PUT',
    })
    const onSubmit = (e) => {
        e.preventDefault();
        post(route('user.update', user.id));
    };
    return (
        <AuthenticatedLayout
            user ={auth.user}
            header={
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Edit user "{user.name}"
                </h2>

            </div>
        }
        >
            <Head title="Users" />
            <div className="py-12">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                                {
                                    user.image_path && (<div className="mb-4">
                                        <img src={user.image_path} className="w-64" />
                                    </div>
                                    )}

                                <div>
                                    <div>
                                        <InputLabel
                                            htmlFor="user_image_path"
                                            value="User Image"
                                        />
                                        <TextInput
                                            id="user_image_path"
                                            type="file"
                                            name="image"
                                            className="mt-1 block w-full"
                                            onChange={e => setData('image', e.target.files[0])}
                                        />
                                        <InputError message={errors.image} className="mt-2"/>
                                    </div>
                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="user_name"
                                            value="User Name"
                                        />
                                        <TextInput
                                            id="user_name"
                                            type="text"
                                            name="name"
                                            value={data.name}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={e => setData('name', e.target.value)}
                                        />
                                        <InputError message={errors.name} className="mt-2"/>
                                    </div>
                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="user_description"
                                            value="User Description"
                                        />
                                        <TextAreaInput
                                            id="user_description"
                                            name="description"
                                            value={data.description}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={e => setData('description', e.target.value)}
                                        />
                                        <InputError message={errors.description} className="mt-2"/>
                                    </div>
                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="user_due_date"
                                            value="User Deadline"
                                        />
                                        <TextInput
                                            id="user_due_date"
                                            type="date"
                                            name="date"
                                            value={data.due_date}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={e => setData('due_date', e.target.value)}
                                        />
                                        <InputError message={errors.due_date} className="mt-2"/>
                                    </div>
                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="user_status"
                                            value="User Status"
                                        />
                                        <SelectInput
                                            id="user_status"
                                            name="status"
                                            value={data.status}
                                            className="mt-1 block w-full"
                                            isFocused={true}
                                            onChange={e => setData('status', e.target.value)}
                                        >
                                            <option value="">Select Status</option>
                                            <option value="pending">Pending</option>
                                            <option value="in_progress">In Progress</option>
                                            <option value="completed">Completed</option>
                                        </SelectInput>
                                        <InputError message={errors.status} className="mt-2"/>
                                    </div>
                                    <div className="mt-4 text-right">
                                        <Link href={route('user.index')}
                                            className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-array-200 mr-2">
                                            Cancel
                                        </Link>
                                        <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                                        >
                                               Submit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
            </div>
        </AuthenticatedLayout>
    )
}
