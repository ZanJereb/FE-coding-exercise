"use client";
import React from "react";
import { Tournament } from "../lib/api";

export interface FilterTabsProps {
  tabs: Tournament[];
  selectedId: number | null;
  onSelect: (tab: number | null) => void;
}

export const FilterTabs: React.FC<FilterTabsProps> = ({
  tabs,
  selectedId,
  onSelect,
}) => {
  return (
    <div className="flex space-x-2 overflow-x-auto py-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() =>
              onSelect(selectedId === tab.id ? null : tab.id)
            }
          className={`
            px-4 py-2 whitespace-nowrap rounded-full transition text-xs
            ${
              selectedId === tab.id
                ? "bg-[#00003a] text-white hover:bg-[#00004c]"
                : "bg-[#f0f0f5] text-[#4d4d54] hover:bg-gray-300"
            }
          `}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
};
