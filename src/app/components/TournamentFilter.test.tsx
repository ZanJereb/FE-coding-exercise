import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TournamentFilter from "./TournamentFilter";

describe("<TournamentFilter />", () => {
  const tabs = [
    { id: 1, name: "A", sportId: 0 },
    { id: 2, name: "B", sportId: 0 },
  ];
  const onSelect = jest.fn();

  it("renders one button per tab and calls onSelect when clicked", () => {
    render(
      <TournamentFilter tabs={tabs} selectedIds={[]} onSelect={onSelect} />
    );

    const btnA = screen.getByText("A");
    const btnB = screen.getByText("B");
    expect(btnA).toBeInTheDocument();
    expect(btnB).toBeInTheDocument();

    fireEvent.click(btnA);
    expect(onSelect).toHaveBeenCalledWith(1);
  });
});
