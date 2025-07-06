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
  selectedSportId: number | null;
  onSelectSport: (id: number | null) => void;
}

export const SportsSidebar: React.FC<SportsSidebarProps> = ({
  sports,
  selectedSportId,
  onSelectSport,
}) => {
  return (
    <aside className="w-64 h-screen sticky top-0">
      <nav className="p-4 space-y-2">
        {sports.map(sport => {
          const Icon = iconMap[sport.name] || FaFutbol;
          return (
            <button
              key={sport.id}
              onClick={() => onSelectSport(selectedSportId === sport.id ? null : sport.id)}
              className={`flex items-center gap-3 w-full px-4 py-2 rounded-full ${
                selectedSportId === sport.id
                  ? "bg-[#00003a] text-white font-semibold hover:bg-[#00004c] hover:text-white"
                  : "text-sm hover:bg-gray-100 hover:text-[#00003a]"
              }`}
            >
              <Icon className="text-xl" />
              <span className="text-sm">{sport.name}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};