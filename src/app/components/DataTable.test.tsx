import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DataTable from "./DataTable";

jest.mock("../lib/utils", () => ({
  formatDate: (d: string) => `formatted:${d}`,
  capitalize: (s: string) => `Cap:${s}`,
}));

describe("<DataTable />", () => {
  const sampleData = [
    {
      id: 1,
      tournamentId: 42,
      start_time: "2025-07-06T12:00:00Z",
      status: "finished",
      home_team: "Team Alpha",
      away_team: "Team Beta",
      home_score: null,
      away_score: "3",
    },
  ];

  it("renders all column headers", () => {
    render(<DataTable data={sampleData} />);
    [
      "Start Time",
      "Status",
      "Home Team",
      "Away Team",
      "Home Score",
      "Away Score",
    ].forEach((heading) => {
      expect(screen.getByText(heading)).toBeInTheDocument();
    });
  });

  it("formats date, capitalizes status, and displays scores/teams correctly", () => {
    render(<DataTable data={sampleData} />);
    expect(
      screen.getByText("formatted:2025-07-06T12:00:00Z")
    ).toBeInTheDocument();
    expect(screen.getByText("Cap:finished")).toBeInTheDocument();
    expect(screen.getByText("Team Alpha")).toBeInTheDocument();
    expect(screen.getByText("Team Beta")).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
