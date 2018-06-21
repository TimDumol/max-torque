import { Action, State, StateContext } from "@ngxs/store";

export interface MatchStateModel {
  numRounds: number;
  player_ids: number[];
}

const defaults: MatchStateModel = {
  numRounds: 4,
  player_ids: []
};

@State<MatchStateModel>({
  name: "match",
  defaults
})
export class MatchState {}
