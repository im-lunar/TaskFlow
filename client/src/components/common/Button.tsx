import type { ReactNode } from "react";

interface ButtonProps {
    children: ReactNode;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    onClick?: () => void;
}

function Button({
    children,
    type = "button",
    disabled = false,
    onClick,
}: ButtonProps) {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className="
                w-full
                rounded-lg
                bg-indigo-600
                px-4
                py-3
                text-white
                font-medium
                transition-colors
                hover:bg-indigo-700
                disabled:cursor-not-allowed
                disabled:bg-indigo-300
            "
        >
            {children}
        </button>
    );
}

export default Button;