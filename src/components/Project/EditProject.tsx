import { FC, FormEvent, useState } from "react";
import {
    useFetchProjectById,
    useUpdateProject,
} from "../../services/hooks/project";
import Error from "../../utils/ui/Error";

interface EditProjectProps {
    projectId: string;
    close: () => void;
}

const EditProject: FC<EditProjectProps> = ({ projectId, close }) => {
    const updateProject = useUpdateProject();
    const { data: project } = useFetchProjectById(projectId);

    const [error, setError] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const title = form.projectTitle.value;
        const description = form.description.value;

        if (!title) return setError("Title is required");
        if (!description) return setError("description is required");

        const updatedProject = {
            title,
            description,
        };
        await updateProject.mutateAsync({
            id: projectId,
            updatedProject,
        });
        form.reset();
        close();
    };

    return (
        <div>
            {error && <Error error={error} />}
            <form onSubmit={handleSubmit} className="w-3/5 mx-auto space-y-4">
                <input
                    type="text"
                    name="projectTitle"
                    placeholder="Title"
                    defaultValue={project?.data.title}
                    required
                    className="w-full input input-bordered "
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    className="w-full textarea textarea-bordered"
                    defaultValue={project?.data.description}
                    required
                />
                <div className="flex items-center justify-between ">
                    <button className="w-5/12 btn btn-info" onClick={close}>
                        Close
                    </button>
                    <button className="w-5/12 btn btn-accent" type="submit">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProject;
