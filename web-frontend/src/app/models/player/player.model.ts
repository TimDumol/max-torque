import { Match } from "src/app/models/match/match.model";

export interface Player {
  id: number;
  match_id: number;
  name: string;
  sequence: number;
  is_match_maker: boolean;

  created_at?: Date | string;

  match?: Match;
}
