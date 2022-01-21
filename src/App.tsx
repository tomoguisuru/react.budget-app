import './App.css';
import { Button, Container, Stack } from 'react-bootstrap';
import BudgetCard from './components/BudgetCard';
import AddBudgetModal from './components/AddBudgetModal';
import { useState } from 'react';
import { IBudget } from './contexts/BudgetsContext';
import { useBudgets } from './providers/BudgetsProvider';
import AddExpenseModal from './components/AddExpenseModal';

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [expenseBudgetId, setExpenseBudgetId] = useState<string | undefined>(undefined);

  const ctx = useBudgets();

  function showExpenseModal(budgetId?: string | undefined) {
    setExpenseBudgetId(budgetId);
    setShowAddExpenseModal(true);
  }

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap={2} className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
          <Button variant="outline-primary" onClick={() => showExpenseModal()}>Add Expense</Button>
        </Stack>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {ctx.budgets.map((b: IBudget) => {
            const amount = ctx.getBudgetExpenses(b.id).reduce((rv, exp) => rv + exp.amount, 0);

            return (
              <BudgetCard
                key={b.id}
                name={b.name}
                amount={amount}
                max={b.max}
                onAddExpenseClick={() => showExpenseModal(b.id)}
              />
            )
          })}

        </div>
      </Container>

      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />

      <AddExpenseModal
        show={showAddExpenseModal}
        handleClose={() => setShowAddExpenseModal(false)}
        defaultBudgetId={expenseBudgetId}
      />
    </>
  );
}

export default App;
