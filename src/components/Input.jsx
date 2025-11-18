const Input = ({ labelText, type, register, errors }) => {

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">{labelText}</label>
            <input type={type} register={register} className={`w-full border rounded-lg px-3 py-2 focus:ring-2 outline-none ${errors ? "border-red-500 focus:ring-red-400" : "focus:ring-indigo-500 border-gray-300" }`} />
            {errors && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
        </div>
    );
}

export default Input;