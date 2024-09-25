import React from "react";
import { Chip, Tooltip } from "@nextui-org/react";
import { TrendingUpIcon } from "@/components/icons";

interface ActiveChipsProps {
  activeChips: Array<{
    id: string;
    color: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
    icon: JSX.Element;
    tooltipContent: JSX.Element;
  }>;
}

export const ActiveChips: React.FC<ActiveChipsProps> = ({ activeChips }) => {
  return (
    <div className="flex gap-1 justify-center">
      {activeChips.map((chip) => (
        <Tooltip key={chip.id} color={chip.color} content={chip.tooltipContent}>
          <Chip variant="flat" color={chip.color}>
            {chip.icon}
          </Chip>
        </Tooltip>
      ))}
    </div>
  );
};