import * as React from "react";
import styles from "./textarea.module.css";

const Textarea = React.forwardRef<
    HTMLTextAreaElement,
    React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className = "", ...props }, ref) => (
    <textarea
        className={styles.textarea + (className ? " " + className : "")}
        ref={ref}
        {...props}
    />
));

Textarea.displayName = "Textarea";

export { Textarea };
