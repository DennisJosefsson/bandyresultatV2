type GroupConstant = {
  [key: string]: string
}

type ColStarts = {
  [key: string]: string
}

export const groupConstant: GroupConstant = {
  S1: 'Semifinal 1',
  S2: 'Semifinal 2',
  Q1: 'Kvartsfinal 1',
  Q2: 'Kvartsfinal 2',
  Q3: 'Kvartsfinal 3',
  Q4: 'Kvartsfinal 4',
  E1: 'Åttondelsfinal 1',
  E2: 'Åttondelsfinal 2',
  E3: 'Åttondelsfinal 3',
  E4: 'Åttondelsfinal 4',
  elitserien: 'Elitserien',
  ElitA: 'Elit A',
  ElitB: 'Elit B',
  KvalA: 'Kvalgrupp A',
  KvalB: 'Kvalgrupp B',
  allsvenskan: 'Allsvenskan',
  AllsvNorr: 'Allsvenskan Norra',
  AllsvSyd: 'Allsvenskan Södra',
  Div1Syd: 'Division 1 Södra',
  Div1Norr: 'Division 1 Norra',
  Div1Ost: 'Division 1 Östra',
  Div1Vast: 'Division 1 Västra',
  Div1Central: 'Division 1 Central',
  Div1NorrA: 'Division 1 Norra A',
  Div1NorrB: 'Division 1 Norra B',
  Div1SydA: 'Division 1 Södra A',
  Div1SydB: 'Division 1 Södra B',
  NedflyttningNorr: 'Norra nedflyttningsgruppen',
  NedflyttningSyd: 'Södra nedflyttningsgruppen',
  AvdA: 'Avdelning A',
  AvdB: 'Avdelning B',
  AvdC: 'Avdelning C',
  AvdD: 'Avdelning D',
  SlutspelA: 'Slutspelsgrupp A',
  SlutspelB: 'Slutspelsgrupp B',
  final: 'Final',
  semi: 'Semifinal',
  quarter: 'Kvartsfinal',
  eight: 'Åttondel',
  regular: 'Grundserie',
  qualification: 'Kval',
  DamElit: 'Damelitserien',
  DamAllsvNorr: 'Damallsvenskan Norra',
  DamAllsvSyd: 'Damallsvenskan Södra',
  DamAllsvMitt: 'Damallsvenskan Mitt',
  DamAllsvNorrForts: 'Damallsvenskan Norra Fortsättningsserie',
  DamAllsvSydForts: 'Damallsvenskan Södra Fortsättningsserie',
  ElitNorr: 'Elitserien Norra',
  ElitSyd: 'Elitserien Södra',
  top: 'Toppen',
  bottom: 'Botten',
  totalt: 'Totalt',
  hemma: 'Hemma',
  borta: 'Borta',
  oavgjort: 'Oavgjort',
}

export const sortOrder = [
  'final',
  'S1',
  'S2',
  'Q1',
  'Q2',
  'Q3',
  'Q4',
  'E1',
  'E2',
  'E3',
  'E4',
  'elitserien',
  'ElitA',
  'ElitB',
  'DamElit',
  'ElitNorr',
  'ElitSyd',
  'allsvenskan',
  'AllsvNorr',
  'AllsvSyd',
  'DamAllsvNorrForts',
  'DamAllsvSydForts',
  'DamAllsvNorr',
  'DamAllsvMitt',
  'DamAllsvSyd',
  'Div1Norr',
  'Div1Central',
  'Div1Ost',
  'Div1Vast',
  'Div1Syd',
  'AvdA',
  'AvdB',
  'AvdC',
  'AvdD',
  'KvalA',
  'KvalB',
  'Div1NorrA',
  'Div1NorrB',
  'Div1SydA',
  'Div1SydB',
  'NedflyttningNorr',
  'NedflyttningSyd',
  'SlutspelA',
  'SlutspelB',
  'final',
  'semi',
  'quarter',
  'eight',
  'regular',
  'qualification',
  'Totalt',
  'Hemma',
  'Borta',
  'Oavgjort',
]

export const semiColStarts: ColStarts = {
  S1: 'md:col-start-2',
  S2: 'md:col-start-4',
}
export const quarterColStarts: ColStarts = {
  Q1: 'md:col-start-1',
  Q2: 'md:col-start-2',
  Q3: 'md:col-start-3',
  Q4: 'md:col-start-4',
}

export const quarterColStartsTwoQuarter = {
  Q1: 'md:col-start-2',
  Q2: 'md:col-start-4',
}

export const eightColStarts = {
  E1: 'md:col-start-2',
  E2: 'md:col-start-4',
}

export const eightColStartsFourTeams = {
  E1: 'md:col-start-1',
  E2: 'md:col-start-2',
  E3: 'md:col-start-3',
  E4: 'md:col-start-4',
}
