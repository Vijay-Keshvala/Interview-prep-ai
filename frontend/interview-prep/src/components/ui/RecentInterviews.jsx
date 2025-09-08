import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, User, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";

const topicIcons = {
    React: "logos:react",
    "Node.js": "logos:nodejs-icon",
    JavaScript: "logos:javascript",
    CSS: "logos:css-3",
    Python: "logos:python",
    Docker: "logos:docker-icon",
    Kubernetes: "logos:kubernetes",
    "CI/CD": "mdi:infinity",
    Databases: "mdi:database",
    MongoDB: "vscode-icons:file-type-mongo",
};

const recentInterviews = [
    { id: 1, role: "Frontend Developer", date: "2024-03-25", score: 92, timeTaken: 45, topics: ["React", "JavaScript", "CSS"] },
    { id: 2, role: "Backend Developer", date: "2024-03-20", score: 85, timeTaken: 50, topics: ["Node.js", "Python", "Databases"] },
    { id: 3, role: "Full Stack Developer", date: "2024-03-15", score: 88, timeTaken: 55, topics: ["React", "Node.js", "MongoDB"] },
    { id: 4, role: "DevOps Engineer", date: "2024-03-10", score: 65, timeTaken: 40, topics: ["Docker", "Kubernetes", "CI/CD"] },
];

export const RecentInterviews = () => {
    return (
        <Table removeWrapper aria-label="Recent Interviews">
            <TableHeader>
                <TableColumn>ROLE</TableColumn>
                <TableColumn>DATE</TableColumn>
                <TableColumn>SCORE</TableColumn>
                <TableColumn>TIME TAKEN (MIN)</TableColumn>
                <TableColumn>TOPICS</TableColumn>
            </TableHeader>
            <TableBody>
                {recentInterviews.map((interview) => (
                    <TableRow key={interview.id}>
                        <TableCell>
                            <User
                                name={interview.role}
                                avatarProps={{
                                    src: `https://api.dicebear.com/7.x/identicon/svg?seed=${interview.id}`,
                                    size: "sm"
                                }}
                            />
                        </TableCell>
                        <TableCell>
                            {new Date(interview.date).toLocaleDateString("en-US", {
                                month: "short", day: "numeric", year: "numeric"
                            })}
                        </TableCell>
                        <TableCell>
                            <Chip
                                color={interview.score >= 85 ? "success" : interview.score >= 70 ? "warning" : "danger"}
                                variant="flat"
                            >
                                {interview.score}%
                            </Chip>
                        </TableCell>
                        <TableCell>{interview.timeTaken}</TableCell>
                        <TableCell>
                            <div className="flex gap-1">
                                {interview.topics.map((topic, index) => (
                                    <Tooltip key={index} content={topic}>
                                        <Chip size="sm" variant="flat">
                                            <Icon icon={topicIcons[topic] || "mdi:help-circle"} className="w-4 h-4" />
                                        </Chip>
                                    </Tooltip>
                                ))}
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
