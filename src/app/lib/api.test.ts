jest.mock("axios", () => {
  const mAxios = {
    create: jest.fn().mockReturnThis(),
    get: jest.fn(),
  };
  return {
    __esModule: true,
    default: mAxios,
  };
});

import axios from "axios";
import { getSports, getTournaments, getMatches } from "./api";

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("API functions", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("getSports returns data on success", async () => {
    const sportsData = [{ id: 1, name: "Football" }];
    mockedAxios.get.mockResolvedValue({ data: sportsData });

    const result = await getSports();
    expect(mockedAxios.get).toHaveBeenCalledWith("/sport/all");
    expect(result).toEqual(sportsData);
  });

  it("getSports throws formatted error on response error", async () => {
    const error = { response: { status: 404, statusText: "Not Found" } };
    mockedAxios.get.mockRejectedValue(error);

    await expect(getSports()).rejects.toThrow("API error (404): Not Found");
  });

  it("getTournaments returns data on success", async () => {
    const tours = [{ id: 10, name: "Champions", sportId: 1 }];
    mockedAxios.get.mockResolvedValue({ data: tours });

    const result = await getTournaments();
    expect(mockedAxios.get).toHaveBeenCalledWith("/tournament/all");
    expect(result).toEqual(tours);
  });

  it("getMatches returns data on success", async () => {
    const matches = [
      {
        id: 5,
        tournamentId: 10,
        start_time: "2025-07-06T12:00:00Z",
        status: "live",
        home_team: "A",
        away_team: "B",
        home_score: "1",
        away_score: "2",
      },
    ];
    mockedAxios.get.mockResolvedValue({ data: matches });

    const result = await getMatches();
    expect(mockedAxios.get).toHaveBeenCalledWith("/match/all");
    expect(result).toEqual(matches);
  });
});
