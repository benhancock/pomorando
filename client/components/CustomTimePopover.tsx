import React from "react";
import { Popover, PopoverTrigger, PopoverContent, Input, Button } from "@nextui-org/react";

interface CustomTimePopoverProps {
  isPopoverOpen: boolean;
  setIsPopoverOpen: (open: boolean) => void;
  customTime: string;
  handleCustomTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCustomTimeSubmit: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

export const CustomTimePopover: React.FC<CustomTimePopoverProps> = ({
  isPopoverOpen,
  setIsPopoverOpen,
  customTime,
  handleCustomTimeChange,
  handleCustomTimeSubmit,
  inputRef
}) => {
  return (
    isPopoverOpen && (
      <Popover
        isOpen={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
        placement="bottom"
      >
        <PopoverTrigger>
          <div></div>
        </PopoverTrigger>
        <PopoverContent className="p-2 flex items-center">
          <div className="flex w-full justify-between">
            <Input
              type="number"
              value={customTime}
              onChange={handleCustomTimeChange}
              placeholder="Enter minutes"
              min={1}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleCustomTimeSubmit();
                }
              }}
              ref={inputRef}
              className="w-full"
            />
            <Button onClick={handleCustomTimeSubmit} className="ml-2">Save</Button>
          </div>
        </PopoverContent>
      </Popover>
    )
  );
};