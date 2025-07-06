"use client"
import React, { useEffect, useState } from 'react'
import { getSports, Sport } from '../lib/api'
import {
  FaFutbol,
  FaBasketballBall,
  FaHockeyPuck,
  FaBaseballBall,
  FaFootballBall,
} from 'react-icons/fa'

const iconMap: Record<string, React.ElementType> = {
  Football: FaFutbol,
  Basketball: FaBasketballBall,
  IceHockey: FaHockeyPuck,
  Baseball: FaBaseballBall,
  'American football': FaFootballBall,
}

export const SportsSidebar: React.FC = () => {
  const [sports, setSports] = useState<Sport[]>([])
  const [selectedSportId, setSelectedSportId] = useState<string | null>(null)

  useEffect(() => {
    fetchSports()
  }, [])

  const fetchSports = async () => {
    try {
      const data = await getSports()
      setSports(data)
      if (data.length > 0) {
        setSelectedSportId(data[0].id)
      }
    } catch (error) {
      console.error('Failed to load sports:', error)
    }
  }

  return (
    <aside className="w-64 h-screen sticky top-0">
      <nav className="p-4 space-y-2">
        {sports.map((sport) => {
          const Icon = iconMap[sport.name] || FaFutbol
          return (
            <button
              key={sport.id}
              onClick={() => setSelectedSportId(sport.id)}
              className={`flex items-center gap-3 w-full px-4 py-2 rounded-full ${
                selectedSportId === sport.id
                  ? 'bg-[#00003a] text-white font-semibold hover:bg-[#00004c] hover:text-white'
                  : 'text-sm hover:bg-gray-100 hover:text-[#00003a]'
              }`}
            >
              <Icon className="text-xl" />
              <span className="text-sm">{sport.name}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
