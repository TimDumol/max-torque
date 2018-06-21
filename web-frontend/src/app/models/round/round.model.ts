import { Match } from "src/app/models/match/match.model";

export interface Round {
  id: number;
  match_id: number;
  sequence: number;
  first_player_sequence?: number;
  discard?: string;
  trump?: string;
  super_trump?: string;
  points?: number;
  double_player_sequence?: number;

  created_at?: Date | string;
  match?: Match;
}
