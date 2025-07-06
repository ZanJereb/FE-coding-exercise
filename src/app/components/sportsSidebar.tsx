"use client";
import React from "react";
import { Sport } from "../lib/api";
import {
  FaFutbol,
  FaBasketballBall,
  FaHockeyPuck,
  FaBaseballBall,
  FaFootballBall,
} from "react-icons/fa";

const iconMap: Record<string, React.ElementType> = {
  Football: FaFutbol,
  Basketball: FaBasketballBall,
  IceHockey: FaHockeyPuck,
  Baseball: FaBaseballBall,
  "American football": FaFootballBall,
};

interface SportsSidebarProps {
  sports: Sport[];
  selectedSportIds: number[];
  onSelectSport: (id: number) => void;
}

export const SportsSidebar: React.FC<SportsSidebarProps> = ({
  sports,
  selectedSportIds,
  onSelectSport,
}) => {
  return (
    <aside className="w-64 h-screen sticky top-0">
      <nav className="p-4 space-y-2">
        {sports.map((sport) => {
          const Icon = iconMap[sport.name] || FaFutbol;
          const isSelected = selectedSportIds.includes(sport.id);

          return (
            <button
              key={sport.id}
              onClick={() => onSelectSport(sport.id)}
              className={`flex items-center gap-3 w-full px-4 py-2 rounded-full text-sm transition ${
                isSelected
                  ? "bg-[#00003a] text-white font-semibold hover:bg-[#00004c]"
                  : "text-[#00003a] hover:bg-gray-100"
              }`}
            >
              <Icon className="text-xl" />
              <span>{sport.name}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
