import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Chat from "../components/Chat";
import DocumentEditor from "../components/DocumentEditor";
import Feedback from "../components/Feedback";

const tabs = ["Feedbacks", "Discussion"] as const;

const Project: React.FC = () => {
    const { id } = useParams();
    const { id: documentId } = useParams();
    const [tab, setTab] = useState<string>(tabs[0]);

    return (
        <fieldset className="h-[calc(100vh-4rem)] p-4">
            <div className="grid h-full grid-cols-1 sm:gap-4 sm:grid-cols-12">
                <div className="h-full col-span-8">
                    <DocumentEditor projectId={id!} documentId={documentId!} />
                </div>
                <div className="col-span-4 border">
                    <div role="tablist" className="tabs tabs-boxed">
                        {tabs.map((t) => (
                            <button
                                role="tab"
                                className={`tab ${
                                    tab === t ? "bg-accent" : ""
                                }`}
                                onClick={() => setTab(t)}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                    <div>
                        {tab === tabs[0] && (
                            <Feedback
                                projectId={id!}
                                documentId={documentId!}
                                userId="userId"
                            />
                        )}
                        {tab === tabs[1] && <Chat />}
                    </div>
                </div>
            </div>
        </fieldset>
    );
};

export default Project;
