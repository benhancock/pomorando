import React from "react";
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Popover, PopoverTrigger, PopoverContent, Input } from "@nextui-org/react";
import { ClockIcon } from "@/components/icons";

interface TimerControlsProps {
  currentState: string;
  startTimer: () => void;
  handleCustomSelect: (e: React.MouseEvent<HTMLLIElement>) => void;
  handleSelectionChange: (keys: Set<string>) => void;
  selectedTimer: string;
  activeChips: any[];
  claimBreak: () => void;
  resetTimer: () => void;
  setCurrentState: React.Dispatch<React.SetStateAction<string>>;
}

export const TimerControls: React.FC<TimerControlsProps> = ({
  currentState,
  startTimer,
  handleCustomSelect,
  handleSelectionChange,
  selectedTimer,
  activeChips,
  claimBreak,
  resetTimer,
  setCurrentState
}) => {
  return (
    <div className="mt-4 flex gap-2 justify-center">
      {currentState === "neutral" && (
        <>
          <Button onPress={startTimer} color="primary" variant="flat">Start Session</Button>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="flat">Adjust Session Length</Button>
            </DropdownTrigger>
            <DropdownMenu
              variant="flat"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={new Set([
                selectedTimer.startsWith("custom-") ? "custom" : selectedTimer,
              ])}
              onSelectionChange={(keys) =>
                handleSelectionChange(keys as Set<string>)
              }
            >
              <DropdownItem key="extra-short">
                Extra Short Session
                <span style={{ color: "gray", float: "right" }}>5m</span>
              </DropdownItem>
              <DropdownItem key="short">
                Short Session
                <span style={{ color: "gray", float: "right" }}>15m</span>
              </DropdownItem>
              <DropdownItem key="medium">
                Medium Session
                <span style={{ color: "gray", float: "right" }}>25m</span>
              </DropdownItem>
              <DropdownItem key="long">
                Long Session
                <span style={{ color: "gray", float: "right" }}>35m</span>
              </DropdownItem>
              <DropdownItem key="extra-long">
                Extra Long Session&nbsp;&nbsp;&nbsp;
                <span style={{ color: "gray", float: "right" }}>45m</span>
              </DropdownItem>
              <DropdownItem key="custom" onClick={handleCustomSelect}>
                Custom Session
                <span style={{ color: "gray", float: "right" }}>
                  <ClockIcon className="size-6" />
                </span>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </>
      )}

      {currentState === "timer_running" && (
        <>
          <Popover placement="bottom">
            <PopoverTrigger>
              <Button variant="flat">Stop Early</Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2">
                <div className="flex justify-between items-start">
                  <div className="flex-grow pr-4">
                    <div className="text-small font-bold">Are you sure?</div>
                    <div className="text-tiny">Your current reward multipliers will be lost.</div>
                  </div>
                  <Button 
                    color="danger" 
                    size="sm" 
                    onPress={resetTimer} 
                    className="flex-shrink-0 self-center"
                  >
                    Stop
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </>
      )}

      {currentState === "timer_finished" && (
        <>
          <Button onPress={claimBreak} color="success" variant="flat">Claim Break</Button>
          <Button onPress={resetTimer} color="default" variant="flat">Skip Break</Button>
        </>
      )}

      {currentState === "break_running" && (
        <>
          <Button onPress={resetTimer} color="danger" variant="light">End Break</Button>
        </>
      )}
    </div>
  );
};