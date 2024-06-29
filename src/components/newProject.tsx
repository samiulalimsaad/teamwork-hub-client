import { FC, FormEvent, useState } from "react";
import { useCreateProject } from "../services/hooks/project";

interface NewProjectProps {
    close: () => void;
}

const NewProject: FC<NewProjectProps> = ({ close }) => {
    const createProject = useCreateProject();

    const [error, setError] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const title = form.projectTitle.value;
        const description = form.description.value;

        if (!title) return setError("Title is required");
        if (!description) return setError("description is required");

        const newProject = {
            title,
            description,
        };
        await createProject.mutateAsync(newProject);
        form.reset();
        close();
    };

    return (
        <div>
            {error && (
                <div role="alert" className="alert alert-warning">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 stroke-current shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                    <span>{error}</span>
                </div>
            )}
            <form onSubmit={handleSubmit} className="w-3/5 mx-auto space-y-4">
                <input
                    type="text"
                    name="projectTitle"
                    placeholder="Title"
                    required
                    className="w-full input input-bordered "
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    className="w-full textarea textarea-bordered"
                    required
                />
                <div className="flex items-center justify-between ">
                    <button className="w-5/12 btn btn-info" onClick={close}>
                        Close
                    </button>
                    <button className="w-5/12 btn btn-accent" type="submit">
                        Add Project
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewProject;
