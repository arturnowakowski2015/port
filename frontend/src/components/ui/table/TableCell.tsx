import * as React from "react";
import styles from "./TableCell.module.css";

export const TableCell = React.forwardRef<
    HTMLTableCellElement,
    React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className = "", ...props }, ref) => (
    <td ref={ref} className={styles.tableCell + (className ? " " + className : "")} {...props} />
));

TableCell.displayName = "TableCell";
