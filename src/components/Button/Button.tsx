import { FC } from "react";

import { Button as ANTButton, ButtonProps as ANTButtonProps } from "antd";

export interface IButtonProps extends ANTButtonProps {
  testId: string;
}

const Button: FC<IButtonProps> = ({ testId, ...antBtnProps }) => {
  return <ANTButton data-test={`btm-${testId}`} {...antBtnProps} />;
};

export default Button;

// Na ovaj nacin najbezbolnije prosirimo ant komponentu i modifikujemo njeno ponasanje, jedan dobar usecase je modal kompoennta uvezana sa modal storom, cimaj me pokazacu ti primer kako to da se odradi
