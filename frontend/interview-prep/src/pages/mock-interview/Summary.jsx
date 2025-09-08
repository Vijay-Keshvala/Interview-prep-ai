import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardBody, Divider } from "@heroui/react";
import { PerformanceOverview } from "../../components/ui/PerformanceOverview";
import { TopicBreakdown } from "../../components/ui/TopicBreakdown";
import { TimeAnalysis } from "../../components/ui/TimeAnalysis";
import { AIRecommendations } from "../../components/ui/AiRecommendations";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";

function CollapsibleCard({ title, children, defaultOpen = true }) {
    const [isOpen, setIsOpen] = React.useState(defaultOpen);

    return (
        <Card className="h-full rounded-2xl shadow-large border border-default-200 bg-content1 overflow-hidden">
            <CardHeader
                className="flex justify-between items-center cursor-pointer select-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="text-lg font-semibold">{title}</h3>
                {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
            </CardHeader>
            <Divider className="my-1" />

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <CardBody className="pt-4">{children}</CardBody>
                    </motion.div>
                )}
            </AnimatePresence>
        </Card>
    );
}

export default function Summary() {
    const navigate = useNavigate();

    // useEffect(() => {
    //     const token = localStorage.getItem("authToken");
    //     if (!token) {
    //         navigate("/"); // redirect to login/index if not logged in
    //     }
    // }, [navigate]);

    return (
        <DashboardLayout>
            <div className="mx-auto max-w-7xl p-6 space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Mock Interview Summary</h1>
                    <p className="text-default-500 mt-1">
                        Your performance, time insights, topic mastery, and next steps
                    </p>
                </div>

                {/* Row 1: Performance + Time */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35 }}
                    >
                        <CollapsibleCard title="Performance Overview">
                            <PerformanceOverview />
                        </CollapsibleCard>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.05 }}
                    >
                        <CollapsibleCard title="Time Analysis">
                            <TimeAnalysis />
                        </CollapsibleCard>
                    </motion.div>
                </div>

                {/* Row 2: Topics + Recommendations */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.1 }}
                    >
                        <CollapsibleCard title="Topic Breakdown">
                            <div className="flex items-center justify-center">
                                <div className="w-full max-w-xl h-[340px]">
                                    <TopicBreakdown />
                                </div>
                            </div>
                        </CollapsibleCard>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.15 }}
                    >
                        <CollapsibleCard title="AI Recommendations">
                            <AIRecommendations />
                        </CollapsibleCard>
                    </motion.div>
                </div>
            </div>
        </DashboardLayout>
    );
}
