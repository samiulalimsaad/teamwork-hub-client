import React from "react";

const ErrorComponent: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-red-100">
            <div
                className="relative px-4 py-3 text-red-700 bg-white border border-red-400 rounded"
                role="alert"
            >
                <strong className="font-bold">
                    Error: unknown error occurred!
                </strong>
            </div>
        </div>
    );
};

export default ErrorComponent;
