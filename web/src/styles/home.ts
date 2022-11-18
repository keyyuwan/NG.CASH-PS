import styled from "styled-components";

export const HomeContainer = styled.div``;

export const Header = styled.header`
  background-color: ${({ theme }) => theme.colors.black};

  .content {
    padding: 1rem 2rem;

    display: flex;
    align-items: center;
    justify-content: space-between;

    .wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 0.5rem;
    }
  }

  @media (min-width: 1024px) {
    .content {
      max-width: 1120px;
      margin: 0 auto;
    }
  }
`;

export const Logo = styled.img`
  width: 60px;
  height: 60px;
`;

export const GreetingsText = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.white};

  span {
    font-weight: 700;
  }
`;

export const BalanceText = styled.span`
  font-weight: 700;
  display: inline-block;
  margin-top: 0.5rem;
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.5rem;
`;

export const Content = styled.div`
  padding: 2rem;

  @media (min-width: 1024px) {
    max-width: 1120px;
    margin: 0 auto;
  }
`;
