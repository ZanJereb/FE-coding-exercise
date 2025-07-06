"use client";
import React from "react";
import { Match } from "../lib/api";
import { formatDate, capitalize } from "../lib/utils";

export interface DataTableProps {
  data: Match[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            {[
              "Start Time",
              "Status",
              "Home Team",
              "Away Team",
              "Home Score",
              "Away Score",
            ].map((heading) => (
              <th
                key={heading}
                className="px-6 py-3 text-left text-xs font-semibold text-[#202027] tracking-wider"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, idx) => (
            <tr key={idx}>
              <td className="px-6 py-4 text-sm text-[#77779d]">
                {formatDate(row.start_time)}
              </td>
              <td className="px-6 py-4 text-sm text-[#77779d]">
                {capitalize(row.status)}
              </td>
              <td className="px-6 py-4 text-sm text-[#77779d]">
                {row.home_team}
              </td>
              <td className="px-6 py-4 text-sm text-[#77779d]">
                {row.away_team}
              </td>
              <td className="px-6 py-4 text-sm text-[#77779d]">
                {row.home_score ?? "-"}
              </td>
              <td className="px-6 py-4 text-sm text-[#77779d]">
                {row.away_score ?? "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;