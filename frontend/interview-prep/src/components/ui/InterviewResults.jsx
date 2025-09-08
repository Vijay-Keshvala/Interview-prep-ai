import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, User, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";

const interviewResults = [
    {
        id: 1,
        question: "What is JSX and why is it used in React?",
        answer: "dont know",
        score: 0,
        feedback: "The answer 'don't know' indicates a significant gap in knowledge about JSX in React...",
        correctAnswer: "JSX (JavaScript XML) is a syntax extension to JavaScript. It allows you to write HTML-like code in your JavaScript files...",
        topic: "JSX in React",
        timeTaken: 31,
        usedVoiceInput: false
    },
    // Add more mock data for other questions here
];

export const InterviewResults = () => {
    return (
        <Table removeWrapper aria-label="Interview Results">
            <TableHeader>
                <TableColumn>QUESTION</TableColumn>
                <TableColumn>TOPIC</TableColumn>
                <TableColumn>SCORE</TableColumn>
                <TableColumn>TIME TAKEN (SEC)</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
                {interviewResults.map((result) => (
                    <TableRow key={result.id}>
                        <TableCell>{result.question}</TableCell>
                        <TableCell>{result.topic}</TableCell>
                        <TableCell>
                            <Chip color={result.score > 50 ? "success" : "danger"} variant="flat">
                                {result.score}%
                            </Chip>
                        </TableCell>
                        <TableCell>{result.timeTaken}</TableCell>
                        <TableCell>
                            <div className="flex gap-2">
                                <Tooltip content="View Feedback">
                                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                        <Icon icon="lucide:message-circle" />
                                    </span>
                                </Tooltip>
                                <Tooltip content="View Correct Answer">
                                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                        <Icon icon="lucide:check-circle" />
                                    </span>
                                </Tooltip>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};