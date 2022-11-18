import styled from "styled-components";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  label {
    align-self: flex-start;
    font-weight: 500;
  }

  input {
    height: 40px;
    border-radius: 8px;
    padding: 0 1rem;

    border: 1px solid ${({ theme }) => theme.colors.black};
  }
`;

export const HelperText = styled.p`
  font-size: 0.75rem;
  font-weight: 300;
  text-align: left;
`;
