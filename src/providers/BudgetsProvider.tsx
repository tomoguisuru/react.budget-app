import {
    createContext,
    useContext,
} from "react";

import {
    BudgetContext,
    IBudget,
    IExpense,
} from "../contexts/BudgetsContext";
import useLocalStorage from "../hooks/useLocalStorage";

export const BudgetsCtx = createContext<BudgetContext>(undefined!);

export function useBudgets() {
    return useContext(BudgetsCtx);
}

export const BudgetsProvider = ({ children }: any) => {
    const [budgets, setBudgets] = useLocalStorage<IBudget>('budgets', []);
    const [expenses, setExpenses] = useLocalStorage<IExpense>('expenses', []);

    const budgetContext = new BudgetContext(
        { value: budgets, setValue: setBudgets },
        { value: expenses, setValue: setExpenses },
    );

    return (
        <BudgetsCtx.Provider
            value={budgetContext}
        >
            {children}
        </BudgetsCtx.Provider>
    )
}