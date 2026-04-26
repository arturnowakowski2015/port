import * as React from "react";
import styles from "./table.module.css";
import { TableBody } from "./TableBody";
import { TableCell } from "./TableCell";
import { TableHead } from "./TableHead";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";

const Table = React.forwardRef<HTMLTableElement, React.TableHTMLAttributes<HTMLTableElement>>(
    ({ className = "", ...props }, ref) => (
        <div className={styles.tableWrapper}>
            <table
                ref={ref}
                className={styles.table + (className ? " " + className : "")}
                {...props}
            />
        </div>
    )
);
Table.displayName = "Table";

export { Table, TableBody, TableCell, TableHead, TableHeader, TableRow };
