import './App.css';
import { Button, Container, Stack } from 'react-bootstrap';
import BudgetCard from './components/BudgetCard';
import AddBudgetModal from './components/AddBudgetModal';
import { useEffect, useState } from 'react';
import { IBudget, IExpense } from './contexts/BudgetsContext';
import { useBudgets } from './providers/BudgetsProvider';
import AddExpenseModal from './components/AddExpenseModal';
import DefaultBudgetCard from './components/DefaultBudgetCard';
import ViewExpensesModal from './components/ViewExpensesModal';

export const DEFAULT_BUDGET = 'Uncategorized';

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showViewExpensesModal, setShowViewExpensesModal] = useState(false);

  const [expenseBudgetId, setExpenseBudgetId] = useState<string | undefined>(undefined);
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const [budgetName, setBudgetName] = useState<string>(DEFAULT_BUDGET);

  const ctx = useBudgets();

  function getExpenses(budgetId?: string): [budgetName: string, expenses: IExpense[]] {
    let expenses: IExpense[] = [];
    let budgetName = DEFAULT_BUDGET;

    if (budgetId === 'all') {
      expenses = ctx.expenses;
      budgetName = '(Total)';
    } else if (budgetId) {
      expenses = ctx.getBudgetExpenses(budgetId);

      const budget = ctx.getBudget(budgetId);

      if (budget) {
        budgetName = budget.name;
      }
    } else {
      expenses = ctx.expenses.filter(e => !e.budgetId);
      budgetName = DEFAULT_BUDGET;
    }

    return [budgetName, expenses];
  }

  function deleteBudget(budgetId: string) {
    ctx.deleteBudget(budgetId);

    setExpenseBudgetId(undefined);
    setShowAddBudgetModal(false);
    setShowAddExpenseModal(false);
    setShowViewExpensesModal(false);
  }

  function deleteExpense(expenseId: string) {
    ctx.deleteExpense(expenseId);
  }

  function showExpenseModal(budgetId?: string | undefined) {
    setExpenseBudgetId(budgetId);
    setShowAddExpenseModal(true);
  }

  function showExpensesModal(budgetId?: string | undefined) {
    const [budgetName, expenses] = getExpenses(budgetId);

    setExpenseBudgetId(budgetId);
    setBudgetName(budgetName);
    setExpenses(expenses);
    setShowViewExpensesModal(true);
  }

  useEffect(() => {
    const [budgetName, expenses] = getExpenses(expenseBudgetId);
    setBudgetName(budgetName);
    setExpenses(expenses);
  }, [ctx.expenses, expenseBudgetId]);

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
                onExpensesClick={() => showExpensesModal(b.id)}
              />
            )
          })}

          <DefaultBudgetCard
            name={DEFAULT_BUDGET}
            amount={ctx.getBudgetExpenses().reduce((rv, exp) => rv + exp.amount, 0)}
            onAddExpenseClick={() => showExpenseModal()}
            onExpensesClick={() => showExpensesModal()}
          />

          <DefaultBudgetCard
            gray={true}
            name='Total'
            amount={ctx.expenses.reduce((rv, exp) => rv + exp.amount, 0)}
            max={ctx.budgets.reduce((rv, b) => rv + b.max, 0)}
            onAddExpenseClick={() => showExpenseModal()}
            onExpensesClick={() => showExpensesModal('all')}
          />

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

      <ViewExpensesModal
        show={showViewExpensesModal}
        handleClose={() => setShowViewExpensesModal(false)}
        budgetId={expenseBudgetId}
        budgetName={budgetName}
        expenses={expenses}
        onDelete={id => deleteBudget(id)}
        onDeleteExpense={id => deleteExpense(id)}
      />
    </>
  );
}

export default App;
