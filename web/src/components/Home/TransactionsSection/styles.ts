import styled from "styled-components";

export const TransactionsSectionContainer = styled.section`
  margin-top: 4rem;
  overflow: auto;
`;

export const TransactionsSectionTitle = styled.h2``;

export const TransactionsSectionDescription = styled.p`
  margin-top: 0.5rem;

  span {
    font-weight: 700;
  }
`;

export const TransactionsTable = styled.table`
  margin-top: 2rem;

  width: 100%;
  border-spacing: 0 0.5rem;

  th {
    text-align: left;
    padding: 1rem;
  }

  td {
    border: 0;
    padding: 1rem;
    background: ${({ theme }) => theme.colors.white};

    &:first-child {
      border-radius: 0.5rem 0 0 0.5rem;
    }

    &:last-child {
      border-radius: 0 0.5rem 0.5rem 0;
    }
  }
`;
