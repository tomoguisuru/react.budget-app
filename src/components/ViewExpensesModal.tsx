import { Button, Modal, Stack } from "react-bootstrap";
import { IExpense } from "../contexts/BudgetsContext";
import { currencyFormatter } from "../utils";

interface IModalParams {
    budgetId?: string;
    budgetName: string;
    expenses: IExpense[];
    show: boolean;
    handleClose?: () => void;
    onDelete: (budgetId: string) => void;
    onDeleteExpense: (expenseId: string) => void;
}

export default function ViewExpensesModal({budgetId, budgetName, expenses, show, handleClose, onDelete, onDeleteExpense}: IModalParams) {
    return (
        <Modal
            show={show}
            onHide={handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <Stack direction="horizontal" gap={2}>
                        <div>{budgetName && (
                            <span>{budgetName}</span>
                        )} Expenses
                        </div>
                        {budgetId && (
                            <Button
                                variant="outline-danger"
                                onClick={() => onDelete(budgetId)}
                            >
                                Delete
                            </Button>
                        )}
                    </Stack>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Stack direction="vertical" gap={3}>
                    {expenses.map(e => (
                        <Stack
                            direction="horizontal"
                            gap={2}
                            key={e.id}
                        >
                            <div className="me-auto fs-4">{e.description}</div>
                            <div className="fs-5">{currencyFormatter.format(e.amount)}</div>
                            <Button
                                size="sm"
                                variant="outline-danger"
                                onClick={() => onDeleteExpense(e.id)}
                            >
                                &times;
                            </Button>
                        </Stack>
                    ))}
                </Stack>
            </Modal.Body>
        </Modal>
    )
}