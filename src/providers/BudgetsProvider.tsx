import {
    createContext,
    useContext,
    useState,
} from "react";

import {
    BudgetContext,
    IBudget,
    IExpense,
} from "../contexts/BudgetsContext";


export function useBudgets() {
    useContext(BudgetsCtx);
}

export const BudgetsCtx = createContext<BudgetContext | null>(null);

export const BudgetsProvider = ({ children }: any) => {
    const [budgets, setBudgets] = useState<IBudget[]>([]);
    const [expenses, setExpenses] = useState<IExpense[]>([]);

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