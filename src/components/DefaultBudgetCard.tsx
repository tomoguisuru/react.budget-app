import BudgetCard from "./BudgetCard";

interface ISimpleBudgetCard {
    amount: number;
    gray?: boolean;
    name: string;
    max?: number;
    onAddExpenseClick: () => void;
    onExpensesClick: () => void;
}

export default function DefaultBudgetCard(props: ISimpleBudgetCard) {
    if (props.amount === 0) {
        return null;
    }

    return (
        <BudgetCard
            {...props}
        />
    )
}