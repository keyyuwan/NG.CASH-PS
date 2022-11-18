import styled from "styled-components";

export const ButtonContainer = styled.button`
  background-color: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};

  height: 50px;
  border-radius: 8px;

  font-size: 1.125rem;
  font-weight: 600;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.85);
  }
`;
