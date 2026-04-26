import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import styles from "./DialogDescription.module.css";

export const DialogDescription = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Description>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className = "", ...props }, ref) => (
    <DialogPrimitive.Description
        ref={ref}
        className={styles.dialogDescription + (className ? " " + className : "")}
        {...props}
    />
));

DialogDescription.displayName = DialogPrimitive.Description.displayName;
