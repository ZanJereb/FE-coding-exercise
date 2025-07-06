"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { SportsSidebar } from "./components/sportsSidebar";
import { FilterTabs } from "./components/filterTabs";
import { DataTable } from "./components/dataTable";
import { getTournaments, getMatches, Tournament, Match } from "../app/lib/api";
import { FiSearch } from "react-icons/fi";

const Home: React.FC = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAll() {
      try {
        const [tours, mts] = await Promise.all([
          getTournaments(),
          getMatches(),
        ]);
        setTournaments(tours);
        setMatches(mts);
        if (tours.length) setSelectedTab(tours[0].id);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  if (loading) return <div className="p-6">Loading…</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  const filteredMatches = matches.filter((m) => {
    const tour = tournaments.find((t) => t.id === selectedTab);
    const matchesTab = tour ? m.tournamentId === Number(tour.id) : false;
    const matchesSearch =
      m.home_team.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.away_team.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(e.target.value);

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SportsSidebar />

      <div className="flex-1 p-4">
        <form
          onSubmit={handleSearchSubmit}
          className="relative flex items-center w-full max-w"
        >
          <FiSearch className="absolute left-4 text-[#7c7ca2]" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search for matches"
            className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-lg bg-[#f0f0f5] text-[#7c7ca2] focus:outline-none focus:border-indigo-400 text-sm"
          />
        </form>

        <FilterTabs
          tabs={tournaments.map((t) => t)}
          selectedId={selectedTab}
          onSelect={setSelectedTab}
        />

        <DataTable data={filteredMatches} />
      </div>
    </div>
  );
};

export default Home;
