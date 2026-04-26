import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";


export const DialogOverlay = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
        ref={ref}
        {...props}
    />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
