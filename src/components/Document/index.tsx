import { Editor } from "@monaco-editor/react";
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
                <figure className="blur-[1px] h-52 border relative">
                    <div className="absolute inset-0 z-50 w-full bg-transparent h-hull"></div>
                    {/* <div
                        className="text-wrap"
                        dangerouslySetInnerHTML={{ __html: document.content }}
                    ></div> */}
                    <Editor
                        defaultLanguage="javascript"
                        language="javascript"
                        theme="vs-dark"
                        // theme="light"
                        defaultValue={document.content}
                        className="w-full p-0 select-none h-96 textarea textarea-bordered pb-11"
                    />
                </figure>
                <div className="divider"></div>
                <h2 className="truncate card-title">{document.title}</h2>

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
