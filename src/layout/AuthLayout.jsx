const AuthLayout = ({ title, onSubmit, children }) => {

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-400 p-2">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">{title}</h2>
                <form onSubmit={onSubmit}>
                    { children }
                </form>
            </div>
        </div>
    );
}

export default AuthLayout;