import styled, { css } from "styled-components";

interface TransactionsFilterButtonProps {
  isActive: boolean;
}

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

export const TransactionsFilterContainer = styled.div`
  margin-top: 1rem;

  p {
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  .wrapper {
    display: flex;
    align-items: center;
    gap: 1rem;

    .react-datepicker-wrapper {
      input {
        border: 1px solid ${({ theme }) => theme.colors.black};
        border-radius: 8px;
        height: 32px;
        padding: 0 0.5rem;
      }
    }
  }

  .clear-filter-button {
    margin-top: 1rem;

    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

export const TransactionsFilterButton = styled.button<TransactionsFilterButtonProps>`
  border: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 8px;

  height: 32px;
  width: 160px;
  padding: 0 0.5rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  transition: 0.2s;

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: ${({ theme }) => theme.colors.black};
      color: ${({ theme }) => theme.colors.white};
    `}

  &:hover {
    background-color: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const TransactionsTable = styled.table`
  margin-top: 1rem;

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
