"use client";
import React from "react";
import { Tournament } from "../lib/api";

export interface FilterTabsProps {
  tabs: Tournament[];
  selectedIds: number[];
  onSelect: (tabId: number) => void;
}

export const FilterTabs: React.FC<FilterTabsProps> = ({
  tabs,
  selectedIds,
  onSelect,
}) => {
  return (
    <div className="flex space-x-2 overflow-x-auto py-6">
      {tabs.map((tab) => {
        const isSelected = selectedIds.includes(tab.id);
        return (
          <button
            key={tab.id}
            onClick={() => onSelect(tab.id)}
            className={`px-4 py-2 whitespace-nowrap rounded-full text-xs transition ${
              isSelected
                ? "bg-[#00003a] text-white hover:bg-[#00004c]"
                : "bg-[#f0f0f5] text-[#4d4d54] hover:bg-gray-300"
            }`}
          >
            {tab.name}
          </button>
        );
      })}
    </div>
  );
};
