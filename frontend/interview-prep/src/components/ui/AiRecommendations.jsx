import React from "react";
import { Card, CardBody, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";

const recommendations = [
    {
        id: 1,
        title: "Improve JSX in React",
        description:
            "Practice mock interviews and review React JSX documentation to strengthen your fundamentals and confidence in building components.",
        icon: "lucide:code",
        priority: "High Priority",
    },
    {
        id: 2,
        title: "Master React Hooks",
        description:
            "Deepen your knowledge of React Hooks by solving coding challenges, exploring advanced patterns, and reviewing official documentation.",
        icon: "lucide:git-branch",
        priority: "Recommended",
    },
];

const strengths = [
    "React Keys",
    "React Lifecycle Methods",
    "Props Drilling in React",
    "React Data Passing",
    "React Conditional Rendering",
    "React Fragments",
];

export const AIRecommendations = () => {
    return (
        <div className="space-y-10">
            {/* Focus Areas Section */}
            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    🎯 Suggested Focus Areas
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                    {recommendations.map((rec) => (
                        <Card
                            key={rec.id}
                            className="relative shadow-lg rounded-2xl border border-gray-200 hover:shadow-xl transition-all"
                        >
                            <CardBody className="p-6 space-y-4">
                                {/* Header: Icon + Title + Chip */}
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-full bg-primary/10 p-3 flex items-center justify-center shadow-inner">
                                            <Icon icon={rec.icon} className="text-2xl text-primary" />
                                        </div>
                                        <h4 className="text-lg font-semibold text-gray-800">
                                            {rec.title}
                                        </h4>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-sm text-gray-600 text-justify leading-relaxed">
                                    {rec.description}
                                </p>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Strengths Section */}
            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    💪 Your Strengths
                </h2>
                <Card className="shadow-lg rounded-2xl border border-gray-200">
                    <CardBody className="p-6">
                        <div className="flex flex-wrap gap-3">
                            {strengths.map((strength, index) => (
                                <Chip
                                    key={index}
                                    color="success"
                                    variant="solid"
                                    className="px-4 py-1 font-medium shadow-sm"
                                >
                                    {strength}
                                </Chip>
                            ))}
                        </div>
                    </CardBody>
                </Card>
            </section>
        </div>
    );
};
