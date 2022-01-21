import BudgetCard from "./BudgetCard";

interface ISimpleBudgetCard {
    name: string;
    amount: number;
    onAddExpenseClick: () => void;
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