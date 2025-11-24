export interface Team {
  id: string;
  name: string;
  logo: string;
  color: string;
  sport?: Sport;
}

export const NBA_TEAMS: Team[] = [
  { id: 'hawks', name: 'Atlanta Hawks', logo: 'https://cdn.nba.com/logos/nba/1610612737/global/L/logo.svg', color: '#E03A3E' },
  { id: 'celtics', name: 'Boston Celtics', logo: 'https://cdn.nba.com/logos/nba/1610612738/global/L/logo.svg', color: '#007A33' },
  { id: 'nets', name: 'Brooklyn Nets', logo: 'https://cdn.nba.com/logos/nba/1610612751/global/L/logo.svg', color: '#000000' },
  { id: 'hornets', name: 'Charlotte Hornets', logo: 'https://cdn.nba.com/logos/nba/1610612766/global/L/logo.svg', color: '#1D1160' },
  { id: 'bulls', name: 'Chicago Bulls', logo: 'https://cdn.nba.com/logos/nba/1610612741/global/L/logo.svg', color: '#CE1141' },
  { id: 'cavaliers', name: 'Cleveland Cavaliers', logo: 'https://cdn.nba.com/logos/nba/1610612739/global/L/logo.svg', color: '#860038' },
  { id: 'mavericks', name: 'Dallas Mavericks', logo: 'https://cdn.nba.com/logos/nba/1610612742/global/L/logo.svg', color: '#00538C' },
  { id: 'nuggets', name: 'Denver Nuggets', logo: 'https://cdn.nba.com/logos/nba/1610612743/global/L/logo.svg', color: '#0E2240' },
  { id: 'pistons', name: 'Detroit Pistons', logo: 'https://cdn.nba.com/logos/nba/1610612765/global/L/logo.svg', color: '#C8102E' },
  { id: 'warriors', name: 'Golden State Warriors', logo: 'https://cdn.nba.com/logos/nba/1610612744/global/L/logo.svg', color: '#1D428A' },
  { id: 'rockets', name: 'Houston Rockets', logo: 'https://cdn.nba.com/logos/nba/1610612745/global/L/logo.svg', color: '#CE1141' },
  { id: 'pacers', name: 'Indiana Pacers', logo: 'https://cdn.nba.com/logos/nba/1610612754/global/L/logo.svg', color: '#002D62' },
  { id: 'clippers', name: 'LA Clippers', logo: 'https://cdn.nba.com/logos/nba/1610612746/global/L/logo.svg', color: '#C8102E' },
  { id: 'lakers', name: 'LA Lakers', logo: 'https://cdn.nba.com/logos/nba/1610612747/global/L/logo.svg', color: '#552583' },
  { id: 'grizzlies', name: 'Memphis Grizzlies', logo: 'https://cdn.nba.com/logos/nba/1610612763/global/L/logo.svg', color: '#5D76A9' },
  { id: 'heat', name: 'Miami Heat', logo: 'https://cdn.nba.com/logos/nba/1610612748/global/L/logo.svg', color: '#98002E' },
  { id: 'bucks', name: 'Milwaukee Bucks', logo: 'https://cdn.nba.com/logos/nba/1610612749/global/L/logo.svg', color: '#00471B' },
  { id: 'timberwolves', name: 'Minnesota Timberwolves', logo: 'https://cdn.nba.com/logos/nba/1610612750/global/L/logo.svg', color: '#0C2340' },
  { id: 'pelicans', name: 'New Orleans Pelicans', logo: 'https://cdn.nba.com/logos/nba/1610612740/global/L/logo.svg', color: '#0C2340' },
  { id: 'knicks', name: 'New York Knicks', logo: 'https://cdn.nba.com/logos/nba/1610612752/global/L/logo.svg', color: '#F58426' },
  { id: 'thunder', name: 'Oklahoma City Thunder', logo: 'https://cdn.nba.com/logos/nba/1610612760/global/L/logo.svg', color: '#007AC1' },
  { id: 'magic', name: 'Orlando Magic', logo: 'https://cdn.nba.com/logos/nba/1610612753/global/L/logo.svg', color: '#0077C0' },
  { id: '76ers', name: 'Philadelphia 76ers', logo: 'https://cdn.nba.com/logos/nba/1610612755/global/L/logo.svg', color: '#006BB6' },
  { id: 'suns', name: 'Phoenix Suns', logo: 'https://cdn.nba.com/logos/nba/1610612756/global/L/logo.svg', color: '#1D1160' },
  { id: 'blazers', name: 'Portland Trail Blazers', logo: 'https://cdn.nba.com/logos/nba/1610612757/global/L/logo.svg', color: '#E03A3E' },
  { id: 'kings', name: 'Sacramento Kings', logo: 'https://cdn.nba.com/logos/nba/1610612758/global/L/logo.svg', color: '#5A2D81' },
  { id: 'spurs', name: 'San Antonio Spurs', logo: 'https://cdn.nba.com/logos/nba/1610612759/global/L/logo.svg', color: '#C4CED4' },
  { id: 'raptors', name: 'Toronto Raptors', logo: 'https://cdn.nba.com/logos/nba/1610612761/global/L/logo.svg', color: '#CE1141' },
  { id: 'jazz', name: 'Utah Jazz', logo: 'https://cdn.nba.com/logos/nba/1610612762/global/L/logo.svg', color: '#002B5C' },
  { id: 'wizards', name: 'Washington Wizards', logo: 'https://cdn.nba.com/logos/nba/1610612764/global/L/logo.svg', color: '#002B5C' },
];

export const NFL_TEAMS: Team[] = [
  { id: 'cardinals', name: 'Arizona Cardinals', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/ari.png', color: '#97233F' },
  { id: 'falcons', name: 'Atlanta Falcons', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/atl.png', color: '#A71930' },
  { id: 'ravens', name: 'Baltimore Ravens', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/bal.png', color: '#241773' },
  { id: 'bills', name: 'Buffalo Bills', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/buf.png', color: '#00338D' },
  { id: 'panthers', name: 'Carolina Panthers', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/car.png', color: '#0085CA' },
  { id: 'bears', name: 'Chicago Bears', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/chi.png', color: '#C83803' },
  { id: 'bengals', name: 'Cincinnati Bengals', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/cin.png', color: '#FB4F14' },
  { id: 'browns', name: 'Cleveland Browns', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/cle.png', color: '#311D00' },
  { id: 'cowboys', name: 'Dallas Cowboys', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/dal.png', color: '#041E42' },
  { id: 'broncos', name: 'Denver Broncos', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/den.png', color: '#FB4F14' },
  { id: 'lions', name: 'Detroit Lions', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/det.png', color: '#0076B6' },
  { id: 'packers', name: 'Green Bay Packers', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/gb.png', color: '#203731' },
  { id: 'texans', name: 'Houston Texans', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/hou.png', color: '#03202F' },
  { id: 'colts', name: 'Indianapolis Colts', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/ind.png', color: '#002C5F' },
  { id: 'jaguars', name: 'Jacksonville Jaguars', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/jax.png', color: '#006778' },
  { id: 'chiefs', name: 'Kansas City Chiefs', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/kc.png', color: '#E31837' },
  { id: 'raiders', name: 'Las Vegas Raiders', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/lv.png', color: '#000000' },
  { id: 'chargers', name: 'Los Angeles Chargers', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/lac.png', color: '#0080C6' },
  { id: 'rams', name: 'Los Angeles Rams', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/lar.png', color: '#003594' },
  { id: 'dolphins', name: 'Miami Dolphins', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/mia.png', color: '#008E97' },
  { id: 'vikings', name: 'Minnesota Vikings', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/min.png', color: '#4F2683' },
  { id: 'patriots', name: 'New England Patriots', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/ne.png', color: '#002244' },
  { id: 'saints', name: 'New Orleans Saints', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/no.png', color: '#D3BC8D' },
  { id: 'giants', name: 'New York Giants', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/nyg.png', color: '#0B2265' },
  { id: 'jets', name: 'New York Jets', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/nyj.png', color: '#125740' },
  { id: 'eagles', name: 'Philadelphia Eagles', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/phi.png', color: '#004C54' },
  { id: 'steelers', name: 'Pittsburgh Steelers', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/pit.png', color: '#FFB612' },
  { id: '49ers', name: 'San Francisco 49ers', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/sf.png', color: '#AA0000' },
  { id: 'seahawks', name: 'Seattle Seahawks', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/sea.png', color: '#002244' },
  { id: 'buccaneers', name: 'Tampa Bay Buccaneers', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/tb.png', color: '#D50A0A' },
  { id: 'titans', name: 'Tennessee Titans', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/ten.png', color: '#0C2340' },
  { id: 'commanders', name: 'Washington Commanders', logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/wsh.png', color: '#5A1414' },
];

export const SOCCER_TEAMS: Team[] = [
  { id: 'arsenal', name: 'Arsenal', logo: 'https://resources.premierleague.com/premierleague/badges/100/t3.png', color: '#EF0107' },
  { id: 'chelsea', name: 'Chelsea', logo: 'https://resources.premierleague.com/premierleague/badges/100/t8.png', color: '#034694' },
  { id: 'liverpool', name: 'Liverpool', logo: 'https://resources.premierleague.com/premierleague/badges/100/t14.png', color: '#C8102E' },
  { id: 'man-city', name: 'Manchester City', logo: 'https://resources.premierleague.com/premierleague/badges/100/t43.png', color: '#6CABDD' },
  { id: 'man-utd', name: 'Manchester United', logo: 'https://resources.premierleague.com/premierleague/badges/100/t1.png', color: '#DA291C' },
  { id: 'tottenham', name: 'Tottenham', logo: 'https://resources.premierleague.com/premierleague/badges/100/t6.png', color: '#132257' },
  { id: 'newcastle', name: 'Newcastle', logo: 'https://resources.premierleague.com/premierleague/badges/100/t4.png', color: '#241F20' },
  { id: 'aston-villa', name: 'Aston Villa', logo: 'https://resources.premierleague.com/premierleague/badges/100/t7.png', color: '#95BFE5' },
  { id: 'brighton', name: 'Brighton', logo: 'https://resources.premierleague.com/premierleague/badges/100/t36.png', color: '#0057B8' },
  { id: 'west-ham', name: 'West Ham', logo: 'https://resources.premierleague.com/premierleague/badges/100/t21.png', color: '#7A263A' },
  { id: 'leicester', name: 'Leicester', logo: 'https://resources.premierleague.com/premierleague/badges/100/t13.png', color: '#003090' },
  { id: 'everton', name: 'Everton', logo: 'https://resources.premierleague.com/premierleague/badges/100/t11.png', color: '#003399' },
  { id: 'wolves', name: 'Wolves', logo: 'https://resources.premierleague.com/premierleague/badges/100/t39.png', color: '#FDB913' },
  { id: 'crystal-palace', name: 'Crystal Palace', logo: 'https://resources.premierleague.com/premierleague/badges/100/t31.png', color: '#1B458F' },
  { id: 'brentford', name: 'Brentford', logo: 'https://resources.premierleague.com/premierleague/badges/100/t94.png', color: '#E30613' },
  { id: 'fulham', name: 'Fulham', logo: 'https://resources.premierleague.com/premierleague/badges/100/t54.png', color: '#000000' },
  { id: 'bournemouth', name: 'Bournemouth', logo: 'https://resources.premierleague.com/premierleague/badges/100/t91.png', color: '#DA291C' },
  { id: 'nottingham', name: 'Nottingham Forest', logo: 'https://resources.premierleague.com/premierleague/badges/100/t17.png', color: '#DD0000' },
  { id: 'burnley', name: 'Burnley', logo: 'https://resources.premierleague.com/premierleague/badges/100/t90.png', color: '#6C1D45' },
  { id: 'sheffield', name: 'Sheffield United', logo: 'https://resources.premierleague.com/premierleague/badges/100/t49.png', color: '#EE2737' },
];

export type Sport = 'NBA' | 'NFL' | 'SOCCER';

export const getTeamsBySport = (sport: Sport): Team[] => {
  switch (sport) {
    case 'NBA':
      return NBA_TEAMS;
    case 'NFL':
      return NFL_TEAMS;
    case 'SOCCER':
      return SOCCER_TEAMS;
    default:
      return NBA_TEAMS;
  }
};
