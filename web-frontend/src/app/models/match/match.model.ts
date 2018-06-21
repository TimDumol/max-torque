import { Player } from "src/app/models/player/player.model";
import { Round } from "src/app/models/round/round.model";

export interface Match {
  id: number;
  code: string;
  created_at?: Date | string;
  number_of_rounds: number;

  players?: Player[];
  rounds?: Round[];
}
