import { ThreeDots } from "react-loader-spinner";
import { useTheme } from "styled-components";

export function Loading() {
  const theme = useTheme();

  return (
    <ThreeDots
      height="40"
      width="40"
      radius="9"
      color={theme.colors.white}
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      visible
    />
  );
}
