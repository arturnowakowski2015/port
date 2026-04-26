import * as React from "react";


export const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={className} {...props} />
);
