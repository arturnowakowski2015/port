import * as React from "react";
import styles from "./TableHead.module.css";

export const TableHead = React.forwardRef<
    HTMLTableCellElement,
    React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className = "", ...props }, ref) => (
    <th
        ref={ref}
        className={styles.tableHead + (className ? " " + className : "")}
        {...props}
    />
));

TableHead.displayName = "TableHead";
