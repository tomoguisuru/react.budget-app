import { Button, Card, ProgressBar, Stack } from "react-bootstrap";
import { currencyFormatter } from "../utils";

export interface IBudgetCard {
    amount: number;
    gray?: boolean;
    max?: number;
    name: string,
    onAddExpenseClick: () => void;
    onExpensesClick: () => void;
}

function getProgressBarVariant(amount: number, max: number): string {
    const ratio = amount / max;

    if (ratio < 0.5) {
        return 'primary';
    }

    if (ratio < 0.75) {
        return 'warning';
    }

    return 'danger';
}

export default function BudgetCard({ name, amount, max, gray, onAddExpenseClick, onExpensesClick }: IBudgetCard) {
    const classNames = [];
    let showAddButton = true;

    if (!max || gray) {
        classNames.push('bg-light');
        showAddButton = false;
    } else if (amount > max) {
        classNames.push('bg-danger', 'bg-opacity-10');
    }

    return (
        <Card className={classNames.join(' ')}>
            <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
                    <div className="me-2">{name}</div>
                    <div className="d-flex align-items-baseline">
                        {currencyFormatter.format(amount)}
                        {max && (
                        <span className="text-muted fs-6 ms-1">
                            / {currencyFormatter.format(max)}
                        </span>)}
                    </div>
                </Card.Title>

                {max && (
                <ProgressBar
                    className="rounded-pill"
                    variant={getProgressBarVariant(amount, max)}
                    min={0}
                    max={max}
                    now={amount}
                />)}

                <Stack direction="horizontal" gap={2} className="mt-4 justify-content-end">
                    {showAddButton && (
                    <Button
                        variant="outline-primary"
                        onClick={onAddExpenseClick}
                    >
                        Add Expense
                    </Button>)}

                    <Button
                        variant="outline-secondary"
                        onClick={onExpensesClick}
                    >
                        View Expenses
                    </Button>
                </Stack>
            </Card.Body>
        </Card>
    );
}