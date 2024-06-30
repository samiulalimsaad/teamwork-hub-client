import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/hooks/auth";
import Error from "../utils/ui/Error";

const Register = () => {
    const { user, loading, createUserWithEmailAndPassword, signIn } =
        useAuth() || {};
    const navigate = useNavigate();

    const [error, setError] = useState("");

    useEffect(() => {
        if (!loading && user) navigate("/");
    }, [loading, navigate, user]);

    async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        const form = e.currentTarget;
        const name = form.username.value;
        const email = form.email.value;
        const password = form.password.value;

        try {
            await createUserWithEmailAndPassword(name, email, password);
            await signIn(email, password);
            form.reset();
        } catch (error) {
            if (error instanceof AxiosError) {
                const err = error.response?.data.error;
                if (err.includes("duplicate key")) {
                    setError("Email already used");
                }
            }
        }
    }

    return (
        <section>
            <div className="min-h-screen hero bg-base-200">
                <div className="flex-col hero-content lg:flex-row-reverse">
                    <div className="w-full max-w-sm shadow-2xl card bg-base-100 shrink-0">
                        {error && <Error error={error} />}
                        <div className="card-body">
                            <form onSubmit={handleRegister}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="name"
                                        className="input input-bordered"
                                        required
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Email
                                        </span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="email"
                                        className="input input-bordered"
                                        required
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">
                                            Password
                                        </span>
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="password"
                                        className="input input-bordered"
                                        required
                                    />
                                </div>
                                <div className="mt-6 form-control">
                                    <button className="btn btn-accent">
                                        Register
                                    </button>
                                </div>
                            </form>
                            <div className="divider">OR</div>
                            <div className="text-center">
                                Already have an{" "}
                                <Link to="/login" className="link link-accent">
                                    account
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;
