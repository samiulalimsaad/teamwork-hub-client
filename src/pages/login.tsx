import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/hooks/auth";

const Login = () => {
    const { signIn } = useAuth() || {};
    const navigate = useNavigate();

    function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password).then(() => {
            navigate("/");
        });
    }

    return (
        <section>
            <div className="min-h-screen hero bg-base-200">
                <div className="flex-col hero-content lg:flex-row-reverse">
                    <div className="w-full max-w-sm shadow-2xl card bg-base-100 shrink-0">
                        <div className="card-body">
                            <form onSubmit={handleLogin}>
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
                                        Login
                                    </button>
                                </div>
                            </form>

                            <div className="divider">OR</div>
                            <div className="text-center">
                                create an{" "}
                                <Link
                                    to="/register"
                                    className="link link-accent"
                                >
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

export default Login;
