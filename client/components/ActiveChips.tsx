import React from "react";
import { Chip, Tooltip } from "@nextui-org/react";
import { TrendingUpIcon } from "@/components/icons";
import { breakOutcomeInterface } from "@/app/page";

interface ActiveChipsProps {
  activeChips: Array<{
    id: string;
    color: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
    icon: JSX.Element;
    tooltipContent: JSX.Element;
  }>;
  breakOutcome: breakOutcomeInterface | null;
}

export const ActiveChips: React.FC<ActiveChipsProps> = ({ activeChips, breakOutcome}) => {
  return (
    <div className="flex gap-1 justify-center" style={{ minHeight: '40px' }}>
      {activeChips.map((chip) => (
        <Tooltip key={chip.id} color={chip.color} content={chip.tooltipContent}>
          <Chip variant="flat" color={chip.color}>
            {chip.icon}
          </Chip>
        </Tooltip>
      ))}
      {breakOutcome && (
        <Tooltip key={breakOutcome.id} color={breakOutcome.color} content={breakOutcome.tooltipContent}>
          <Chip variant="flat" color={breakOutcome.color} radius="none">
            {breakOutcome.data.descriptor}
          </Chip>
        </Tooltip>
      )}
    </div>
  );
};