import React from "react";
import { Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";

export const TimeAnalysis = ({ averageTimePerQuestion = 19.38, totalTimeSpent = 252 }) => {

    // Convert total minutes into hours + minutes
    const formatTime = (minutes) => {
        const hrs = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
    };

    return (
        <div className="space-y-4">
            {/* Average Time */}
            <Card>
                <CardBody className="flex items-center gap-4">
                    <Icon icon="lucide:clock" className="text-3xl text-primary" />
                    <div>
                        <p className="text-small text-default-500">Average Time per Question</p>
                        <p className="text-xl font-semibold">
                            {averageTimePerQuestion.toFixed(2)} minutes
                        </p>
                    </div>
                </CardBody>
            </Card>

            {/* Total Time */}
            <Card>
                <CardBody className="flex items-center gap-4">
                    <Icon icon="lucide:hourglass" className="text-3xl text-primary" />
                    <div>
                        <p className="text-small text-default-500">Total Time Spent</p>
                        <p className="text-xl font-semibold">{formatTime(totalTimeSpent)}</p>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};
