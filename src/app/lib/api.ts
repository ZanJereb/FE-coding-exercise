import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

export interface Sport {
  id: number;
  name: string;
}

export interface Tournament {
  id: number;
  name: string;
  sportId: string;
}

export interface Match {
  id: number;
  tournamentId: number;
  start_time: string;
  status: string;
  home_team: string;
  away_team: string;
  home_score: string | null;
  away_score: string | null;
}

/** Fetch all available sports */
export async function getSports(): Promise<Sport[]> {
  try {
    const { data } = await axiosInstance.get<Sport[]>("/sport/all");
    return data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        `API error (${error.response.status}): ${error.response.statusText}`
      );
    }
    throw new Error(error.message);
  }
}

/** Fetch all tournaments */
export async function getTournaments(): Promise<Tournament[]> {
  try {
    const { data } = await axiosInstance.get<Tournament[]>("/tournament/all");
    return data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        `API error (${error.response.status}): ${error.response.statusText}`
      );
    }
    throw new Error(error.message);
  }
}

/** Fetch all matches */
export async function getMatches(): Promise<Match[]> {
  try {
    const { data } = await axiosInstance.get<Match[]>("/match/all");
    return data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        `API error (${error.response.status}): ${error.response.statusText}`
      );
    }
    throw new Error(error.message);
  }
}
