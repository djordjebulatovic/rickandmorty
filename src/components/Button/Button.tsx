import { FC } from "react";
import styles from "./Button.module.scss";

interface IButtonProps {
    children: any,
    onClick: any,
    className?: string;
}

const Button : FC<IButtonProps> = ({children, onClick, className}) => {

    return (
        <button onClick={onClick} className={styles.button}>{children}</button>
    )
}


export default Button;
