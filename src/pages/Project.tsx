import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Chat from "../components/Chat";
import DocumentEditor from "../components/Document/DocumentEditor";
import Feedback from "../components/Feedback";

const tabs = ["Feedbacks", "Discussion"] as const;

const Project: React.FC = () => {
    const { id: documentId } = useParams();
    const [tab, setTab] = useState<string>(tabs[1]);

    return (
        <fieldset className="h-[calc(100vh-4rem)] p-4">
            <div className="grid h-full grid-cols-1 sm:gap-4 sm:grid-cols-12">
                <div className="col-span-8">
                    <DocumentEditor documentId={documentId!} />
                </div>
                <div className="col-span-4 border">
                    <div role="tablist" className="tabs tabs-boxed">
                        {tabs.map((t) => (
                            <button
                                key={t}
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
                            <Feedback documentId={documentId!} />
                        )}
                        {tab === tabs[1] && <Chat documentId={documentId!} />}
                    </div>
                </div>
            </div>
        </fieldset>
    );
};

export default Project;
