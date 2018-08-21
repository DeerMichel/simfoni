import { expect } from "chai";
import { fromJS, Map } from "immutable";
import actions from "./actions";
import reducer from "./reducers";
import PlayState from "~/constants/PlayState";

describe("nowPlaying reducer", () => {
    it("has an initial state", () => {
        const nextState = reducer(undefined, {});

        expect(nextState).to.equals(fromJS({
            state: PlayState.PAUSED,
        }));
    });

    it("handles PLAY_TRACK", () => {
        const initialState = Map();
        const action = actions.playTrack("id123");
        const nextState = reducer(initialState, action);

        expect(nextState).to.equals(fromJS({
            trackId: "id123",
            currentTime: 0,
            state: PlayState.PLAYING,
        }));
    });

    it("handles PAUSE_TRACK", () => {
        const initialState = fromJS({
            trackId: "id123",
            currentTime: 142,
            state: PlayState.PLAYING,
        });
        const action = actions.pauseTrack();
        const nextState = reducer(initialState, action);

        expect(nextState).to.equals(fromJS({
            trackId: "id123",
            currentTime: 142,
            state: PlayState.PAUSED,
        }));
    });
});