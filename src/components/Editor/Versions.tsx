import moment from "moment";
import { useState } from "react";
import { VersionInterface } from "../../interfaces/Version.interface";
import { useFetchVersionById } from "../../services/hooks/version";
import Error from "../../utils/ui/Error";
import { Modal } from "../../utils/ui/Modal";
import Diff from "./Diff";

interface VersionProps {
    documentId: string;
    close: () => void;
}

const Versions: React.FC<VersionProps> = ({ documentId, close }) => {
    const { data: versions } = useFetchVersionById(documentId);
    const [version, setVersion] = useState<VersionInterface>();
    return (
        <div>
            <div className="md:hidden">
                <Error error="For better view Please use fullscreen" />
            </div>
            <div className="grid-">
                <div>
                    <ul className="w-full space-y-4 rounded-box">
                        {versions?.data?.map((v, i) => (
                            <li
                                key={v._id}
                                className="flex items-center justify-between w-full border-b cursor-pointer hover:bg-accent/10 text-wrap"
                                onClick={() => setVersion(v)}
                            >
                                <div>
                                    <span className="mr-3 font-semibold">
                                        {i + 1}.
                                    </span>
                                    <span className="drop-shadow-md">
                                        {v._id}
                                    </span>
                                </div>
                                <small
                                    className="justify-end text-xs opacity-30"
                                    title={`${moment(v.createdAt).format(
                                        "D/M/YY - HH:mm:ss A"
                                    )} (d/m/y)`}
                                >
                                    Last Updated at:{" "}
                                    {moment(v.createdAt).fromNow()}
                                </small>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="flex items-center justify-end my-4">
                <button className=" btn btn-info" onClick={close}>
                    Close
                </button>
            </div>

            {version?._id && (
                <Modal title="Diff" isOpen={!!version?._id}>
                    <Diff
                        version={version}
                        close={() => setVersion(undefined)}
                    />
                </Modal>
            )}
        </div>
    );
};

export default Versions;
