import type { Match, StandingsRow, LeagueInfo } from '@/types';

export const LEAGUE_INFO: LeagueInfo = {
  name: 'Jupiler Pro League',
  season: '2024/25',
  country: 'België',
};

// Mock teams with realistic Belgian Pro League data
const TEAMS = [
  { id: 'club-brugge', name: 'Club Brugge', shortName: 'CLB' },
  { id: 'rsc-anderlecht', name: 'RSC Anderlecht', shortName: 'AND' },
  { id: 'royal-antwerp', name: 'Royal Antwerp FC', shortName: 'ANT' },
  { id: 'krc-genk', name: 'KRC Genk', shortName: 'GEN' },
  { id: 'rsc-charleroi', name: 'RSC Charleroi', shortName: 'CHA' },
  { id: 'kvc-westerlo', name: 'KV Kortrijk', shortName: 'KOR' },
  { id: 'royal-union-saint-gilloise', name: 'Union Saint-Gilloise', shortName: 'USG' },
  { id: 'krc-harelbeke', name: 'KRC Harelbeke', shortName: 'HAR' },
  { id: 'sv-zulte-waregem', name: 'SV Zulte Waregem', shortName: 'ZUL' },
  { id: 'kvc-beveren', name: 'KV Beerschot', shortName: 'BEE' },
  { id: 'royal-mouscron-peruwelz', name: 'Royal Mouscron-Peruwelz', shortName: 'MOU' },
  { id: 'krc-lommel', name: 'KRC Lommel SK', shortName: 'LOM' },
  { id: 'royal-excellence-mouscron', name: 'Royale Union Mouscron', shortName: 'RUM' },
  { id: 'kvc-tournai', name: 'KV Tournai', shortName: 'TOU' },
];

export function getTeams() {
  return TEAMS.map((t) => ({ ...t, logo: undefined }));
}

// Mock matches for the current matchday
export function getMatches(): Match[] {
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  return [
    {
      id: 'm1',
      homeTeam: TEAMS[0],
      awayTeam: TEAMS[6],
      homeScore: 2,
      awayScore: 1,
      status: 'live',
      minute: 67,
      date: today,
      venue: 'Jan Breydelstadion',
      goals: [
        { minute: 23, player: 'Bakayoko', teamId: TEAMS[0].id, type: 'goal' },
        { minute: 45, player: 'Dendoncker', teamId: TEAMS[6].id, type: 'goal' },
        { minute: 58, player: 'Burgos', teamId: TEAMS[0].id, type: 'goal' },
      ],
      cards: [
        { minute: 34, player: 'Vandenberghe', teamId: TEAMS[6].id, type: 'yellow' },
        { minute: 52, player: 'De Cuyper', teamId: TEAMS[0].id, type: 'yellow' },
      ],
      substitutions: [
        { minute: 46, playerOut: 'Vandenberghe', playerIn: 'Mousset', teamId: TEAMS[6].id },
        { minute: 62, playerOut: 'Burgos', playerIn: 'Klauss', teamId: TEAMS[0].id },
      ],
    },
    {
      id: 'm2',
      homeTeam: TEAMS[1],
      awayTeam: TEAMS[3],
      homeScore: 0,
      awayScore: 0,
      status: 'live',
      minute: 34,
      date: today,
      venue: 'Lotto Park',
      goals: [],
      cards: [
        { minute: 18, player: 'Bakayoko', teamId: TEAMS[1].id, type: 'yellow' },
      ],
      substitutions: [],
    },
    {
      id: 'm3',
      homeTeam: TEAMS[2],
      awayTeam: TEAMS[4],
      homeScore: 3,
      awayScore: 1,
      status: 'finished',
      date: today,
      venue: 'Bosuilstadion',
      goals: [
        { minute: 12, player: 'Dessers', teamId: TEAMS[2].id, type: 'goal' },
        { minute: 34, player: 'Mousset', teamId: TEAMS[4].id, type: 'goal' },
        { minute: 56, player: 'Dessers', teamId: TEAMS[2].id, type: 'goal' },
        { minute: 78, player: 'Bakayoko', teamId: TEAMS[2].id, type: 'goal' },
      ],
      cards: [
        { minute: 41, player: 'Vandenberghe', teamId: TEAMS[4].id, type: 'yellow' },
        { minute: 67, player: 'Dendoncker', teamId: TEAMS[2].id, type: 'red' },
      ],
      substitutions: [
        { minute: 55, playerOut: 'Mousset', playerIn: 'Burgos', teamId: TEAMS[4].id },
        { minute: 70, playerOut: 'Dessers', playerIn: 'Klauss', teamId: TEAMS[2].id },
      ],
    },
    {
      id: 'm4',
      homeTeam: TEAMS[5],
      awayTeam: TEAMS[8],
      homeScore: 0,
      awayScore: 0,
      status: 'upcoming',
      date: today,
      venue: 'Guldensporenstadion',
      goals: [],
      cards: [],
      substitutions: [],
    },
    {
      id: 'm5',
      homeTeam: TEAMS[7],
      awayTeam: TEAMS[9],
      homeScore: 0,
      awayScore: 0,
      status: 'upcoming',
      date: today,
      venue: 'Agoria Stadium',
      goals: [],
      cards: [],
      substitutions: [],
    },
  ];
}

// Mock standings data
export function getStandings(): StandingsRow[] {
  return [
    { position: 1, team: TEAMS[0], played: 28, won: 20, drawn: 5, lost: 3, goalsFor: 62, goalsAgainst: 24, goalDifference: 38, points: 65 },
    { position: 2, team: TEAMS[1], played: 28, won: 19, drawn: 4, lost: 5, goalsFor: 58, goalsAgainst: 28, goalDifference: 30, points: 61 },
    { position: 3, team: TEAMS[6], played: 28, won: 17, drawn: 6, lost: 5, goalsFor: 52, goalsAgainst: 30, goalDifference: 22, points: 57 },
    { position: 4, team: TEAMS[3], played: 28, won: 15, drawn: 7, lost: 6, goalsFor: 48, goalsAgainst: 32, goalDifference: 16, points: 52 },
    { position: 5, team: TEAMS[2], played: 28, won: 14, drawn: 6, lost: 8, goalsFor: 45, goalsAgainst: 35, goalDifference: 10, points: 48 },
    { position: 6, team: TEAMS[4], played: 28, won: 12, drawn: 7, lost: 9, goalsFor: 40, goalsAgainst: 38, goalDifference: 2, points: 43 },
    { position: 7, team: TEAMS[5], played: 28, won: 11, drawn: 6, lost: 11, goalsFor: 38, goalsAgainst: 40, goalDifference: -2, points: 39 },
    { position: 8, team: TEAMS[8], played: 28, won: 10, drawn: 7, lost: 11, goalsFor: 35, goalsAgainst: 42, goalDifference: -7, points: 37 },
    { position: 9, team: TEAMS[7], played: 28, won: 9, drawn: 6, lost: 13, goalsFor: 32, goalsAgainst: 45, goalDifference: -13, points: 33 },
    { position: 10, team: TEAMS[9], played: 28, won: 8, drawn: 7, lost: 13, goalsFor: 30, goalsAgainst: 46, goalDifference: -16, points: 31 },
    { position: 11, team: TEAMS[10], played: 28, won: 7, drawn: 5, lost: 16, goalsFor: 28, goalsAgainst: 50, goalDifference: -22, points: 26 },
    { position: 12, team: TEAMS[11], played: 28, won: 6, drawn: 6, lost: 16, goalsFor: 25, goalsAgainst: 52, goalDifference: -27, points: 24 },
    { position: 13, team: TEAMS[12], played: 28, won: 5, drawn: 5, lost: 18, goalsFor: 22, goalsAgainst: 55, goalDifference: -33, points: 20 },
    { position: 14, team: TEAMS[13], played: 28, won: 4, drawn: 4, lost: 20, goalsFor: 18, goalsAgainst: 58, goalDifference: -40, points: 16 },
  ];
}

// Simulate API delay (for demo purposes)
function delay(ms: number = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchMatches(): Promise<Match[]> {
  await delay(400);
  return getMatches();
}

export async function fetchStandings(): Promise<StandingsRow[]> {
  await delay(350);
  return getStandings();
}
