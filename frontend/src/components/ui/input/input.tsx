import * as React from "react";
import styles from "./input.module.css";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    ({ className = "", ...props }, ref) => (
        <input
            className={styles.input + (className ? " " + className : "")}
            ref={ref}
            {...props}
        />
    )
);

Input.displayName = "Input";

export { Input };
