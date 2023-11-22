import React from 'react'


interface ButtonProps {
    btnValue: string;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ btnValue, className }) => {
    return (
        <input
            type="submit"
            value={btnValue}
            className={` font-extrabold  text-base tracking-wider py-2 px-4 rounded-sm ${className}`}
        />
    )
}

export default Button