import React from "react";
import { Progress } from "@nextui-org/react";

interface TimerDisplayProps {
  remainingTime: number;
  timerValue: number;
  currentState: string;
  formatTime: (time: number) => string;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = ({ remainingTime, timerValue, currentState, formatTime }) => {
  return (
    <div>
      <div>
        <span className="text-9xl font-bold">
          {formatTime(remainingTime)}
        </span>
      </div>

      <Progress
        size="sm"
        value={timerValue * 60 - remainingTime}
        maxValue={timerValue * 60}
        color="success"
        className="max-w-md"
        style={{ width: '85%', margin: 'auto', marginTop: '15px', visibility: currentState === "neutral" ? 'hidden' : 'visible'}}
      />
    </div>
  );
};