import { FC } from "react";
import styles from "./Button.module.scss";

interface IButtonProps {
    children: any,
    onClick: any,
    className?: string;
}

// Todo:  Ovo je top, samo iskoristi ANT button, pa ako zelis overriduj mu njegove stilove, cesto nam treba jos neko ekstra ponasanja za antd komponente i ovo je way to go
// uradicu ti implementaciju ispod, i to vazi za sve abstrakcije antd komponenti
const Button : FC<IButtonProps> = ({children, onClick, className}) => {

    return (
        <button onClick={onClick} className={styles.button}>{children}</button>
    )
}


export default Button;

// import { Button as ANTButton, ButtonProps as ANTButtonProps } from "antd"; 

// export interface IButtonProps extends ANTButtonProps {
//     testId: string;
// }

// export const Button:FC<IButtonProps> = ({testId, ...antBtnProps}) => {
//     <ANTButton {...antBtnProps} data-test={`btn-${testId}`}
// }

// Na ovaj nacin najbezbolnije prosirimo ant komponentu i modifikujemo njeno ponasanje, jedan dobar usecase je modal kompoennta uvezana sa modal storom, cimaj me pokazacu ti primer kako to da se odradi 