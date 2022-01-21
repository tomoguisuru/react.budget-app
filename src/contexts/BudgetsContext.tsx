import { Dispatch, SetStateAction } from "react"
import { v4 as uuidV4 } from 'uuid';

interface IRecord {
    id: string;
}

export interface IState<T> {
    value: Array<T>;
    setValue: Dispatch<SetStateAction<Array<T>>>;
}

export interface IBudgetOptions {
    name: string;
    max: number;
}

export interface IExpenseOptions {
    amount: number;
    budgetId?: string;
    description: string;
}

export interface IBudget extends IBudgetOptions, IRecord {};

export interface IExpense extends IExpenseOptions, IRecord {};

export interface IBudgetContext {
    budgets: IBudget[];
    expenses: IExpense[];
    getBudgetExpenses: (id?: string) => IExpense[];
    addBudget: (budget: IBudgetOptions) => void;
    addExpense: (expense: IExpenseOptions) => void;
    deleteBudget: (id: string) => void;
    deleteExpense: (id: string) => void;
}

export class BudgetContext implements IBudgetContext {
    get budgets() {
        return this.budgetsState.value;
    }

    get expenses() {
        return this.expensesState.value;
    }

    constructor(private budgetsState: IState<IBudget>, private expensesState: IState<IExpense>) {
    }

    public getBudgetExpenses(id?: string) {
        return this.expenses.filter(e => e.budgetId === id);
    }

    public addBudget(budget: IBudgetOptions) {
        this.addRecord(this.budgetsState, budget);
    }

    public addExpense(expense: IExpenseOptions) {
        this.addRecord(this.expensesState, expense);
    }

    public deleteBudget(id: string) {
        this.deleteRecord(this.budgetsState, id);

        this.expenses
            .filter(e => e.budgetId === id)
            .forEach(b => {
                b.budgetId = undefined;
            });
    }

    public deleteExpense(id: string) {
        this.deleteRecord(this.expensesState, id);
    }

    private addRecord<T>(state: IState<T>, record: any) {
        state.setValue(prev => [...prev, {...record, id: uuidV4() }]);
    }

    private deleteRecord<T extends IRecord>(state: IState<T>, id: string) {
        state.setValue(prev => prev.filter(r => r.id !== id));
    }
}
