import { useEffect, useState } from "react";
import { Minus, Plus, Trash } from "phosphor-react";
import DatePicker from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";

import "react-datepicker/dist/react-datepicker.css";

import { useAuth } from "../../../hooks/useAuth";
import { api } from "../../../libs/api";
import { mascaraBRL } from "../../../utils/masks";

import {
  TransactionsSectionContainer,
  TransactionsSectionDescription,
  TransactionsSectionTitle,
  TransactionsFilterContainer,
  TransactionsFilterButton,
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

type FilteredType = "" | "cashIn" | "cashOut";

export function TransactionsSection() {
  const [transactions, setTransactions] = useState<TransactionsResponse[]>([]);
  const [filteredDate, setFilteredDate] = useState<Date | null>(null);
  const [filteredType, setFilteredType] = useState<FilteredType>("");

  const { isAccountDataRefreshing } = useAuth();

  function handleFilterType(type: FilteredType) {
    setFilteredType(type);
  }

  function clearFilter() {
    setFilteredDate(null);
    setFilteredType("");
  }

  useEffect(() => {
    async function getTransactions() {
      const filteredDateYear = filteredDate?.getFullYear();
      const filteredDateMonth = filteredDate?.getMonth()! + 1;
      const filteredDateDay = filteredDate?.getDate();

      const dateFilter = `${filteredDateYear}-${filteredDateMonth}-${filteredDateDay}T00:00:00.000Z`;

      try {
        const { data } = await api.get<TransactionsResponse[]>(
          "/transactions",
          {
            params: {
              type: filteredType,
              date: filteredDate ? dateFilter : undefined,
            },
          }
        );

        setTransactions(data);
      } catch (err) {
        console.log(err);
      }
    }

    getTransactions();
  }, [isAccountDataRefreshing, filteredDate, filteredType]);

  return (
    <TransactionsSectionContainer>
      <TransactionsSectionTitle>Minhas Transações</TransactionsSectionTitle>
      <TransactionsSectionDescription>
        Visualize seu histórico de transações.
      </TransactionsSectionDescription>

      <TransactionsFilterContainer>
        <p>Filtrar por:</p>

        <div className="wrapper">
          <TransactionsFilterButton
            isActive={filteredType === "cashIn"}
            onClick={() => handleFilterType("cashIn")}
          >
            <Plus />
            Cash-in
          </TransactionsFilterButton>
          <TransactionsFilterButton
            isActive={filteredType === "cashOut"}
            onClick={() => handleFilterType("cashOut")}
          >
            <Minus />
            Cash-out
          </TransactionsFilterButton>
          <DatePicker
            selected={filteredDate}
            onChange={(date: Date) => setFilteredDate(date)}
            locale={ptBR}
            dateFormat="dd/MM/yyy"
            placeholderText="dd/mm/aa"
          />
        </div>

        <button onClick={clearFilter} className="clear-filter-button">
          <Trash />
          Limpar filtro
        </button>
      </TransactionsFilterContainer>

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
