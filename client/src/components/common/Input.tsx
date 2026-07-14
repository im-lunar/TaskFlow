import type React from "react";

interface InputProps {
    label: string,
    placeholder?: string,
    type?: string,
    value: string,
    onChange:  (e: React.ChangeEvent<HTMLInputElement>) => void,
    error?: string
}

function Input ({
    label,
    type= "text",
    placeholder= "",
    value,
    onChange,
    error 
}: InputProps) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
                {label}
            </label>

            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    px-4
                    py-3
                    outline-none
                    transition-colors
                    focus:border-indigo-600
                    focus:ring-2
                    focus:ring-indigo-200
                "
            />

            {error && (
                <p className="text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}

export default Input;