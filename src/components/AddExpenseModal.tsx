import React, { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { IExpenseOptions } from "../contexts/BudgetsContext";
import { useBudgets } from "../providers/BudgetsProvider";

interface IModalParams {
    show: boolean;
    handleClose?: () => void;
    defaultBudgetId?: string;
}

export default function AddExpenseModal({ show, handleClose, defaultBudgetId }: IModalParams)  {
    const descriptionRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const amountRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const budgetIdRef = useRef() as React.MutableRefObject<HTMLSelectElement>;

    const ctx = useBudgets();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const expense: IExpenseOptions = {
            amount: parseFloat(amountRef.current.value),
            budgetId: budgetIdRef.current.value,
            description: descriptionRef.current.value,
        };

        ctx.addExpense(expense);

        if (handleClose) {
            handleClose();
        }
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
        >
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        New Expense
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            ref={descriptionRef}
                            required
                            type="text"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="amount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            ref={amountRef}
                            required
                            type="number"
                            min={0}
                            step={0.01}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="budgetId">
                        <Form.Label>Amount</Form.Label>
                        <Form.Select
                            defaultValue={defaultBudgetId}
                            ref={budgetIdRef}
                            disabled={defaultBudgetId !== undefined}
                        >
                            <option value={undefined}>
                                Uncategorized
                            </option>
                            {ctx.budgets.map(b => {
                                return (
                                    <option
                                        key={b.id}
                                        value={b.id}
                                    >
                                        {b.name}
                                    </option>
                                )
                            })}
                        </Form.Select>
                    </Form.Group>

                    <div className="d-flex justify-content-end">
                        <Button variant="primary" type="submit">
                            Add
                        </Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    );
}
