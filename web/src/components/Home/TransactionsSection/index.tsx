import { useEffect, useState } from "react";

import { useAuth } from "../../../hooks/useAuth";
import { api } from "../../../libs/api";
import { mascaraBRL } from "../../../utils/masks";

import {
  TransactionsSectionContainer,
  TransactionsSectionDescription,
  TransactionsSectionTitle,
  TransactionsTable,
} from "./styles";

interface Account {
  user: {
    username: string;
  };
}

interface TransactionsResponse {
  id: string;
  createdAt: Date;
  value: number;
  creditedAccount: Account;
  debitedAccount: Account;
}

export function TransactionsSection() {
  const [transactions, setTransactions] = useState<TransactionsResponse[]>([]);

  const { isAccountDataRefreshing } = useAuth();

  useEffect(() => {
    async function getTransactions() {
      try {
        const { data } = await api.get<TransactionsResponse[]>("/transactions");
        setTransactions(data);
      } catch (err) {
        console.log(err);
      }
    }

    getTransactions();
  }, [isAccountDataRefreshing]);

  return (
    <TransactionsSectionContainer>
      <TransactionsSectionTitle>Minhas Transações</TransactionsSectionTitle>
      <TransactionsSectionDescription>
        Visualize seu histórico de transações.
      </TransactionsSectionDescription>

      <TransactionsTable>
        <thead>
          <tr>
            <th>Data</th>
            <th>Quem pagou</th>
            <th>Quem recebeu</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>
                {new Date(transaction.createdAt).toLocaleDateString("pt-BR")}
              </td>
              <td>@{transaction.creditedAccount.user.username}</td>
              <td>@{transaction.debitedAccount.user.username}</td>
              <td>{mascaraBRL(transaction.value)}</td>
            </tr>
          ))}
        </tbody>
      </TransactionsTable>
    </TransactionsSectionContainer>
  );
}
