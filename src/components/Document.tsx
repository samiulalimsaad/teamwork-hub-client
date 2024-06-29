import { FC } from "react";
import { Link } from "react-router-dom";
import { DocumentInterface } from "../interfaces/Document.interface";

interface DocumentProps {
    document: DocumentInterface;
}

const Document: FC<DocumentProps> = ({ document }) => {
    return (
        <div className="h-full shadow-xl card card-compact bg-base-100">
            <div className="card-body">
                <figure className="p-4 blur-[1px] select-none h-52 border">
                    <div
                        className="text-wrap"
                        dangerouslySetInnerHTML={{ __html: document.content }}
                    ></div>
                </figure>
                <h2 className="truncate card-title">{document.title}</h2>

                <div className="justify-end mt-auto card-actions">
                    <Link
                        to={`/project/document/${document._id}`}
                        className="w-full btn btn-accent btn-xs btn-outline"
                    >
                        Edit
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Document;
