"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent, useCallback } from "react";
import { SportsSidebar } from "./components/sportsSidebar";
import { FilterTabs } from "./components/filterTabs";
import { DataTable } from "./components/dataTable";
import { getSports, Sport, getTournaments, getMatches, Tournament, Match } from "../app/lib/api";
import { FiSearch } from "react-icons/fi";

const Home: React.FC = () => {
  // Data states
  const [sports, setSports] = useState<Sport[]>([]);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [filteredTournaments, setFilteredTournaments] = useState<Tournament[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);

  // UI states
  const [selectedSportId, setSelectedSportId] = useState<number | null>(null);
  const [selectedTab, setSelectedTab] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loadingT, setLoadingT] = useState(true);
  const [loadingM, setLoadingM] = useState(true);
  const [loadingS, setLoadingS] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch functions
  const fetchSports = useCallback(async () => {
    setLoadingS(true);
    try {
      const data = await getSports();
      setSports(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoadingS(false);
    }
  }, []);

  const fetchTournaments = useCallback(async () => {
    setLoadingT(true);
    try {
      const tours = await getTournaments();
      setTournaments(tours);
      setFilteredTournaments(tours);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoadingT(false);
    }
  }, []);

  const fetchMatches = useCallback(async () => {
    setLoadingM(true);
    try {
      const ms = await getMatches();
      setMatches(ms);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoadingM(false);
    }
  }, []);

  // Handlers
  const handleSelectedSport = (sportId: number | null) => {
    setSelectedSportId(sportId);
    const next = sportId === null ? tournaments : tournaments.filter(t => t.sportId === sportId);
    setFilteredTournaments(next);
    setSelectedTab(null);
  };

  const handleTabSelect = (tournamentId: number | null) => {
    setSelectedTab(tournamentId);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(e.target.value);

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  // Initial load
  useEffect(() => {
    fetchSports();
    fetchTournaments();
    fetchMatches();
  }, [fetchSports, fetchTournaments, fetchMatches]);

  // Loading / error states
  if (loadingS || loadingT || loadingM) return <div className="p-6">Loading…</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  // Filter matches
  const filteredMatches = matches.filter(m => {
    const matchesSearch =
      m.home_team.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.away_team.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;

    if (selectedTab !== null) {
      return m.tournamentId === selectedTab;
    }

    if (selectedSportId !== null) {
      const tour = tournaments.find(t => t.id === m.tournamentId);
      return tour?.sportId === selectedSportId;
    }

    return true;
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SportsSidebar
        sports={sports}
        selectedSportId={selectedSportId}
        onSelectSport={handleSelectedSport}
      />

      <div className="flex-1 p-4 w-4">
        <form
          onSubmit={handleSearchSubmit}
          className="relative flex items-center"
        >
          <FiSearch className="absolute left-4 text-[#7c7ca2]" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search for matches"
            className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-lg bg-[#f0f0f5] text-[#00003a] placeholder:text-[#7c7ca2] focus:outline-none focus:border-[#7c7ca2] text-sm"
          />
        </form>

        <FilterTabs
          tabs={filteredTournaments}
          selectedId={selectedTab}
          onSelect={handleTabSelect}
        />

        <DataTable data={filteredMatches} />
      </div>
    </div>
  );
};

export default Home;