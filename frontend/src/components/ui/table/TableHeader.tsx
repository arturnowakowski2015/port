import * as React from "react";
import styles from "./TableHeader.module.css";

export const TableHeader = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({ className = "", ...props }, ref) => (
    <thead ref={ref} className={styles.tableHeader + (className ? " " + className : "")} {...props} />
));

TableHeader.displayName = "TableHeader";
