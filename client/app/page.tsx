'use client'
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { Tooltip } from "@nextui-org/react";
import { ClockIcon, TrendingUpIcon } from "@/components/icons";
import { ActiveChips } from "@/components/ActiveChips";
import { TimerDisplay } from "@/components/TimerDisplay";
import { TimerControls } from "@/components/TimerControls";
import { CustomTimePopover } from "@/components/CustomTimePopover";

interface breakOutcomeDataInterface {
  descriptor: string;
  type: string;
  probability: number;
}

export interface breakOutcomeInterface {
  id: string;
  color: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
  icon: JSX.Element;
  tooltipContent: JSX.Element;
  data: breakOutcomeDataInterface;
}

export default function Home() {
  const [selectedTimer, setSelectedTimer] = useState<string>("medium");
  const [timerValue, setTimerValue] = useState<number>(25);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [customTime, setCustomTime] = useState<string>("");
  const [currentState, setCurrentState] = useState<string>("neutral");
  const [remainingTime, setRemainingTime] = useState<number>(timerValue * 60);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [breakDuration, setBreakDuration] = useState<number>(5);
  const [breakOutcome, setBreakOutcome] = useState<breakOutcomeInterface|null>(null);

  const [activeChips, setActiveChips] = useState([
    {
      id: 'reward-card',
      color: 'success',
      icon: <TrendingUpIcon className="size-6" />,
      tooltipContent: (
        <div className="flex items-center">
          <TrendingUpIcon className="size-6 mr-2" />
          <div>
            <p><b>Reward Card</b></p>
            <p><span className="text-success-600 font-semibold bg-success-100 px-1 rounded border border-success-600">1.5x</span> Reward Multiplier</p>
          </div>
        </div>
      )
    },
    {
      id: 'streak',
      color: 'warning',
      icon: <TrendingUpIcon className="size-6" />,
      tooltipContent: (
        <div className="flex items-center">
          <TrendingUpIcon className="size-6 mr-2" />
          <div>
            <p><b>2x Streak</b></p>
            <p><span className="text-success-600 font-semibold bg-success-100 px-1 rounded border border-success-600">1.2x</span> Reward Multiplier</p>
          </div>
        </div>
      )
    },
    {
      id: 'triple-rare',
      color: 'danger',
      icon: <TrendingUpIcon className="size-6" />,
      tooltipContent: (
        <div className="flex items-center">
          <TrendingUpIcon className="size-6 mr-2" />
          <div>
            <p><b>Triple Rare</b></p>
            <p><span className="text-success-600 font-semibold bg-success-100 px-1 rounded border border-success-600">3x</span> Rare Reward Multiplier</p>
          </div>
        </div>
      )
    },
    {
      id: 'short-session',
      color: 'default',
      icon: <TrendingUpIcon className="size-6" />,
      tooltipContent: (
        <div className="flex items-center">
          <TrendingUpIcon className="size-6 mr-2" />
          <div>
            <p><b>Short Session</b></p>
            <p><span className="font-semibold">0.7x</span> Reward Multiplier</p>
          </div>
        </div>
      )
    }
  ]);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelectionChange = (keys: Set<string>) => {
    const selectedKey = Array.from(keys)[0];
    if (selectedKey !== "custom") {
      setSelectedTimer(selectedKey);
      let newTimerValue = 25;
      switch (selectedKey) {
        case "extra-short":
          newTimerValue = 5;
          break;
        case "short":
          newTimerValue = 15;
          break;
        case "medium":
          newTimerValue = 25;
          break;
        case "long":
          newTimerValue = 35;
          break;
        case "extra-long":
          newTimerValue = 45;
          break;
        default:
          newTimerValue = 25;
      }
      setTimerValue(newTimerValue);
      setRemainingTime(newTimerValue * 60);
      setCurrentState("neutral");
    }
  };

  const handleCustomSelect = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPopoverOpen(true);
  };

  const handleCustomTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomTime(e.target.value);
  };

  const handleCustomTimeSubmit = () => {
    if (customTime) {
      setSelectedTimer(`custom-${customTime}`);
      const customValue = Number(customTime);
      setTimerValue(customValue);
      setRemainingTime(customValue * 60);
      setIsPopoverOpen(false);
      setCurrentState("neutral");
    }
  };

  const startTimer = () => {
    setCurrentState("timer_running");
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(interval);
          setCurrentState("timer_finished");
          setRemainingTime(breakDuration * 60);
          setActiveChips([]);
          return breakDuration * 60;
        }
        return prevTime - 1;
      });
    }, 1000);
    setIntervalId(interval);
  };

  const getRandomBreak = () => {
    const outcomeProbabilities = [
      {descriptor: "browse social media", type: "reward", probability: 0.2},
      {descriptor: "take a break", type: "break", probability: 0.6},
      {descriptor: "review your work", type: "action", probability: 0.19},
      {descriptor: "buy yourself a gift", type: "reward", probability: 0.01},
    ];

    let cumulativeProbability = 0;
    let randomValue = Math.random();

    for (const outcome of outcomeProbabilities) {
      cumulativeProbability += outcome.probability;
      if (randomValue < cumulativeProbability) {
        return outcome;
      }
    }

    return outcomeProbabilities[outcomeProbabilities.length - 1];
  };

  const claimBreak = () => {
    const outcomeData: breakOutcomeDataInterface = getRandomBreak();
    const outcome: breakOutcomeInterface = {
      id: outcomeData.descriptor,
      color: outcomeData.type === "reward" ? "success" : outcomeData.type === "break" ? "warning" : "danger",
      icon: <TrendingUpIcon className="size-6" />,
      tooltipContent: (
        <div className="flex items-center">
          <p>Base probaility: {outcomeData.probability}</p>
        </div>
      ),
      data: outcomeData
    };
    setBreakOutcome(outcome);

    setCurrentState("break_running");
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(interval);
          setCurrentState("neutral");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    setIntervalId(interval);
  };

  const resetTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setCurrentState("neutral");
    setBreakOutcome(null);
    setRemainingTime(timerValue * 60);
    setActiveChips([]);
  };

  useEffect(() => {
    if (isPopoverOpen) {
      inputRef.current?.focus();
    }
  }, [isPopoverOpen]);

  useEffect(() => {
    if (currentState === "timer_finished" || currentState === "neutral") {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    }
  }, [currentState, intervalId]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block text-center justify-center" style={{ width: '30%' }}>
        <div className="relative z-10">
          <ActiveChips activeChips={activeChips} breakOutcome={breakOutcome} />

          <br />

          <TimerDisplay 
            remainingTime={remainingTime} 
            timerValue={timerValue} 
            currentState={currentState} 
            formatTime={formatTime} 
          />

          <TimerControls
            currentState={currentState}
            startTimer={startTimer}
            handleCustomSelect={handleCustomSelect}
            handleSelectionChange={handleSelectionChange}
            selectedTimer={selectedTimer}
            activeChips={activeChips}
            claimBreak={claimBreak}
            resetTimer={resetTimer}
            setCurrentState={setCurrentState}
          />

          <CustomTimePopover 
            isPopoverOpen={isPopoverOpen}
            setIsPopoverOpen={setIsPopoverOpen}
            customTime={customTime}
            handleCustomTimeChange={handleCustomTimeChange}
            handleCustomTimeSubmit={handleCustomTimeSubmit}
            inputRef={inputRef}
          />
        </div>
      </div> 
    </section>
  );
}