import * as React from "react";
import styles from "./card.module.css";
import { CardContent } from "./CardContent";
import { CardDescription } from "./CardDescription";
import { CardHeader } from "./CardHeader";
import { CardTitle } from "./CardTitle";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className = "", ...props }, ref) => (
        <div
            ref={ref}
            className={styles.card + (className ? " " + className : "")}
            {...props}
        />
    )
);
Card.displayName = "Card";

export { Card, CardContent, CardDescription, CardHeader, CardTitle };
