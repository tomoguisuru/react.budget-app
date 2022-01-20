import React, { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { IBudgetOptions } from "../contexts/BudgetsContext";
import { useBudgets } from "../providers/BudgetsProvider";

interface IModalParams {
    show: boolean;
    handleClose?: () => void;
}

export default function AddBudgetModal({ show, handleClose }: IModalParams)  {
    const nameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const maxRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const ctx = useBudgets();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const budget: IBudgetOptions = {
            name: nameRef.current.value,
            max: parseFloat(maxRef.current.value),
        };

        ctx.addBudget(budget);

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
                        New Budget
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            ref={nameRef}
                            required
                            type="text"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="max">
                        <Form.Label>Maximum Spending</Form.Label>
                        <Form.Control
                            ref={maxRef}
                            required
                            type="number"
                            min={0}
                            step={0.01}
                        />
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
