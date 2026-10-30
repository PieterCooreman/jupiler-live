export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo?: string;
}

export interface GoalEvent {
  minute: number;
  player: string;
  teamId: string;
  type: 'goal' | 'own-goal';
}

export interface CardEvent {
  minute: number;
  player: string;
  teamId: string;
  type: 'yellow' | 'red';
}

export interface SubstitutionEvent {
  minute: number;
  playerOut: string;
  playerIn: string;
  teamId: string;
}

export type MatchStatus = 'upcoming' | 'live' | 'halftime' | 'finished' | 'postponed';

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  status: MatchStatus;
  minute?: number;
  date: string; // ISO date string
  venue: string;
  goals: GoalEvent[];
  cards: CardEvent[];
  substitutions: SubstitutionEvent[];
}

export interface StandingsRow {
  position: number;
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export interface LeagueInfo {
  name: string;
  season: string;
  country: string;
  logo?: string;
}
