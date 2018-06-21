import { Match } from "src/app/models/match/match.model";

export interface Round {
  id: number;
  match_id: number;
  sequence: number;
  first_player_sequence?: number;
  discard?: number;
  trump?: number;
  super_trump?: number;
  points?: number;
  double_player_sequence?: number;

  created_at?: Date | string;
  match?: Match;
}
