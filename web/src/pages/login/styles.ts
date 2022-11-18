import styled from "styled-components";

export const LoginContainer = styled.div`
  padding: 0 2rem;

  @media (min-width: 1024px) {
    padding: 0 2rem 0 0;

    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 4rem;
  }
`;

export const PageImageContainer = styled.div`
  @media (max-width: 1023px) {
    display: none;
  }

  background-color: ${({ theme }) => theme.colors.black};
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PageImage = styled.img`
  @media (max-width: 1023px) {
    display: none;
  }

  width: 90%;
  height: 100%;
`;

export const Content = styled.div`
  text-align: center;
  margin-top: 4rem;

  @media (min-width: 1024px) {
    margin-top: 0;
  }
`;

export const Logo = styled.img`
  width: 80px;
  height: 80px;
`;

export const Title = styled.p`
  margin-top: 2rem;

  font-weight: 500;
  font-size: 1.25rem;

  span {
    font-weight: 700;
  }
`;

export const Form = styled.form`
  margin-top: 4rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  button {
    margin-top: 2rem;
  }

  @media (min-width: 1024px) {
    margin-top: 2rem;
  }
`;
