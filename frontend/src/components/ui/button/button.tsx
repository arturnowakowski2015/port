import * as React from "react";
import styles from "./button.module.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "outline" | "destructive" | "ghost";
    size?: "sm" | "lg";
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = "", variant = "primary", size, ...props }, ref) => {

        // Mapowanie wariantów na klasy z CSS Modules
        const variantClass = {
            primary: styles.buttonPrimary,
            secondary: styles.buttonSecondary,
            outline: styles.buttonOutline,
            destructive: styles.buttonDestructive,
            ghost: styles.buttonGhost,
        }[variant];


        const sizeClass = size === "sm" ? styles.buttonSm : size === "lg" ? styles.buttonLg : "";

        const btnClass = `${styles.button} ${variantClass} ${sizeClass} ${className}`.trim();

        return <button className={btnClass} ref={ref} {...props} />;
    }
);

Button.displayName = "Button";
export { Button };
