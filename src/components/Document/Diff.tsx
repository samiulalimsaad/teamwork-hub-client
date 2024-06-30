import { DiffEditor } from "@monaco-editor/react";
import React from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { VersionInterface } from "../../interfaces/Version.interface";
import {
    useFetchDocumentById,
    useUpdateDocument,
} from "../../services/hooks/document";
import { useDeleteVersion } from "../../services/hooks/version";
import Error from "../../utils/ui/Error";

interface VersionProps {
    version: VersionInterface;
    close: () => void;
}

const Diff: React.FC<VersionProps> = ({ version, close }) => {
    const { id } = useParams();
    const { data: document } = useFetchDocumentById(id!);
    const deleteVersion = useDeleteVersion();
    const updateDocument = useUpdateDocument();
    return (
        <div className="w-full">
            <div className="md:hidden">
                <Error error="For better view Please use fullscreen" />
            </div>
            <div>
                <div className="flex items-center justify-around mb-2 font-semibold drop-shadow-md">
                    <span>Now</span>
                    <span>Old</span>
                </div>
                <DiffEditor
                    className="border"
                    height={500}
                    original={document?.data.content}
                    originalLanguage="javascript"
                    modifiedLanguage="javascript"
                    modified={version.document.content}
                />
            </div>
            <div className="flex items-center justify-end gap-4 my-4">
                <button className=" btn btn-info" onClick={close}>
                    Close
                </button>
                <button
                    className=" btn btn-warning"
                    onClick={async () => {
                        await updateDocument.mutateAsync({
                            id: id!,
                            updatedDocument: {
                                title: version.document.title,
                                content: version.document.content,
                            },
                        });
                        toast.success("This version restored");
                        await deleteVersion.mutateAsync(version._id);
                        close();
                    }}
                >
                    Restore
                </button>
            </div>
        </div>
    );
};

export default Diff;
