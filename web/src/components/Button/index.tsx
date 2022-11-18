import { ButtonHTMLAttributes } from "react";
import { Loading } from "../Loading";
import { ButtonContainer } from "./styles";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  isLoading?: boolean;
}

export function Button({ title, isLoading, ...rest }: ButtonProps) {
  return (
    <ButtonContainer {...rest}>
      {isLoading ? <Loading /> : title}
    </ButtonContainer>
  );
}
