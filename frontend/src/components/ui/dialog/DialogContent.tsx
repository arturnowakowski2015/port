import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import styles from "./DialogContent.module.css";
import { DialogOverlay } from "./DialogOverlay";

export const DialogContent = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className = "", children, ...props }, ref) => (
    <DialogPrimitive.Portal>
        <DialogOverlay />
        <DialogPrimitive.Content
            ref={ref}
            className={styles.dialogContent + (className ? " " + className : "")}
            {...props}
        >
            {children}
            <DialogPrimitive.Close className={styles.closeBtn}>
                <X style={{ width: 16, height: 16 }} />
                <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
        </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
));

DialogContent.displayName = DialogPrimitive.Content.displayName;
