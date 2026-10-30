'use client';

import { useState, useEffect } from 'react';
import { MatchCard } from '@/components/scoreboard/match-card';
import { StandingsTable } from '@/components/scoreboard/standings-table';
import { Header } from '@/components/layout/header';
import { fetchMatches, fetchStandings } from '@/lib/api';
import type { Match, StandingsRow } from '@/types';

export default function Home() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [standings, setStandings] = useState<StandingsRow[]>([]);
  const [activeTab, setActiveTab] = useState<'scores' | 'standings'>('scores');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchMatches(), fetchStandings()]).then(([m, s]) => {
      setMatches(m);
      setStandings(s);
      setLoading(false);
    });
  }, []);

  const liveMatches = matches.filter((m) => m.status === 'live');
  const finishedMatches = matches.filter((m) => m.status === 'finished');
  const upcomingMatches = matches.filter((m) => m.status === 'upcoming');

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      {/* Background pattern */}
      <div className="fixed inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5L55 17.5V42.5L30 55L5 42.5V17.5Z' fill='none' stroke='%2300FF87' stroke-width='0.5'/%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px',
      }} />

      <div className="relative">
        {/* Header */}
        <Header />

        {/* Main content */}
        <main className="mx-auto max-w-6xl px-4 py-6 sm:py-10">
          {/* Tab navigation */}
          <div className="mb-8 flex gap-2 rounded-xl bg-white/5 p-1.5 ring-1 ring-white/10 sm:w-fit">
            <button
              onClick={() => setActiveTab('scores')}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                activeTab === 'scores'
                  ? 'bg-[#00FF87] text-black shadow-lg shadow-[#00FF87]/25'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Wedstrijden ({matches.length})
            </button>
            <button
              onClick={() => setActiveTab('standings')}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                activeTab === 'standings'
                  ? 'bg-[#00FF87] text-black shadow-lg shadow-[#00FF87]/25'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Standings
            </button>
          </div>

          {/* Loading state */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#00FF87]/30 border-t-[#00FF87]" />
              <p className="mt-4 text-sm text-white/40">Wedstrijden laden...</p>
            </div>
          ) : (
            <>
              {/* Scores tab */}
              {activeTab === 'scores' && (
                <div className="space-y-8">
                  {/* Live matches */}
                  {liveMatches.length > 0 && (
                    <section>
                      <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-red-400 sm:text-base">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                        </span>
                        Live Nu
                      </h2>
                      <div className="space-y-3">
                        {liveMatches.map((match) => (
                          <MatchCard key={match.id} match={match} />
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Finished matches */}
                  {finishedMatches.length > 0 && (
                    <section>
                      <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/30 sm:text-base">
                        Afgelopen
                      </h2>
                      <div className="space-y-3">
                        {finishedMatches.map((match) => (
                          <MatchCard key={match.id} match={match} />
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Upcoming matches */}
                  {upcomingMatches.length > 0 && (
                    <section>
                      <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-[#00FF87]/60 sm:text-base">
                        Aanvangend
                      </h2>
                      <div className="space-y-3">
                        {upcomingMatches.map((match) => (
                          <MatchCard key={match.id} match={match} />
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Empty state */}
                  {matches.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                      <div className="mb-4 rounded-full bg-white/5 p-6 ring-1 ring-white/10">
                        <svg className="h-12 w-12 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-sm text-white/40">Geen wedstrijden gevonden</p>
                    </div>
                  )}
                </div>
              )}

              {/* Standings tab */}
              {activeTab === 'standings' && (
                <StandingsTable standings={standings} />
              )}
            </>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 py-6 text-center">
          <p className="text-xs text-white/20">
            JupilerLive — Data is demo-gebaseerd. Real-time API-koppeling beschikbaar.
          </p>
        </footer>
      </div>
    </div>
  );
}
