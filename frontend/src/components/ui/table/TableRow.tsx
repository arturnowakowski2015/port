import * as React from "react";
import styles from "./TableRow.module.css";

export const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
    ({ className = "", ...props }, ref) => (
        <tr
            ref={ref}
            className={styles.tableRow + (className ? " " + className : "")}
            {...props}
        />
    )
);

TableRow.displayName = "TableRow";
