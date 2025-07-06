import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SportSidebar from "./SportSidebar";
import { Sport } from "../lib/api";

describe("<SportSidebar />", () => {
  const sports: Sport[] = [
    { id: 1, name: "Football" },
    { id: 2, name: "Basketball" },
  ];
  let onSelectSport: jest.Mock;

  beforeEach(() => {
    onSelectSport = jest.fn();
  });

  it("renders a button for each sport", () => {
    render(
      <SportSidebar
        sports={sports}
        selectedSportIds={[]}
        onSelectSport={onSelectSport}
      />
    );
    sports.forEach((sport) => {
      expect(screen.getByText(sport.name)).toBeInTheDocument();
    });
  });

  it("calls onSelectSport with the sport id when clicked", () => {
    render(
      <SportSidebar
        sports={sports}
        selectedSportIds={[]}
        onSelectSport={onSelectSport}
      />
    );
    fireEvent.click(screen.getByText("Football"));
    expect(onSelectSport).toHaveBeenCalledWith(1);
  });
});
