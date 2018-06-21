export interface PlayerRuleRejection {
  id: number;
  player_id: number;
  rejected_player_id: number;
}

export interface DiscardRuleRejection {
  id: number;
  player_id: number;
  discard: string;
}

export interface TrumpRuleRejection {
  id: number;
  player_id: number;
  trump: string;
}

export interface SuperTrumpRuleRejection {
  id: number;
  player_id: number;
  super_trump: string;
}

export interface PointsRuleRejection {
  id: number;
  player_id: number;
  points: number;
}
