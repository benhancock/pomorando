import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Button } from "@nextui-org/react";
import { ClockIcon } from "@/components/icons";

interface SessionSettingsProps {
  selectedTimer: string;
  handleSelectionChange: (keys: Set<string>) => void;
  handleCustomSelect: (e: React.MouseEvent<HTMLLIElement>) => void;
}

export const SessionSettings: React.FC<SessionSettingsProps> = ({
  selectedTimer,
  handleSelectionChange,
  handleCustomSelect
}) => {
  return (
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
        onSelectionChange={handleSelectionChange}
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
  );
};