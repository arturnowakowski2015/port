import * as React from "react";
import styles from "./TableBody.module.css";

export const TableBody = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({ className = "", ...props }, ref) => (
    <tbody ref={ref} className={styles.tableBody + (className ? " " + className : "")} {...props} />
));

TableBody.displayName = "TableBody";
