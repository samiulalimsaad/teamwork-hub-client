import { FC } from "react";
import { Link } from "react-router-dom";
import { DocumentInterface } from "../../interfaces/Document.interface";
import { useDeleteDocument } from "../../services/hooks/document";

interface DocumentProps {
    document: DocumentInterface;
}

const Document: FC<DocumentProps> = ({ document }) => {
    const deleteDocument = useDeleteDocument();

    return (
        <div className="h-full shadow-xl card card-compact bg-base-100">
            <div className="card-body">
                <figure className="p-4 blur-[2px] select-none h-52 border">
                    <div
                        className="text-wrap"
                        dangerouslySetInnerHTML={{ __html: document.content }}
                    ></div>
                </figure>
                <h2 className="py-4 truncate card-title">{document.title}</h2>

                <div className="justify-between mt-auto card-actions">
                    <button
                        className="w-5/12 btn btn-warning btn-xs btn-outline"
                        onClick={() => deleteDocument.mutate(document._id)}
                    >
                        Delete
                    </button>
                    <Link
                        to={`/project/document/${document._id}`}
                        className="w-5/12 btn btn-accent btn-xs btn-outline"
                    >
                        Edit
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Document;
