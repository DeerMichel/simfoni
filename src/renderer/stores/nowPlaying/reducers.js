import { Map, List } from "immutable";
import types from "./types";
import PlayState from "~/constants/PlayState";

const INITIAL_STATE = Map({
    playState: PlayState.STOPPED,
    history: List(),
    queue: List(),
    muted: false,
    volume: 1.0,
});

const playTrack = (state, payload) => {
    const history = state.get("history");
    return state.merge({
        playState: PlayState.PLAYING,
        currentTime: 0,
        currentTrack: payload.track,
        history: history.unshift(payload.track),
    });
};

const playQueue = (state, payload) => {
    const queue = List(payload.queue);
    const history = (payload.history) ? List(payload.history) : state.get("history");
    const track = queue.first();
    return playTrack(state.merge({
        queue: queue.shift(),
        history,
    }), { track });
};

const stopPlayback = (state) => state
    .remove("currentTime")
    .remove("currentTrack")
    .set("playState", PlayState.STOPPED);

const togglePlayback = (state) => {
    const playState = state.get("playState");
    return state.merge({
        playState: (playState === PlayState.PLAYING)
            ? PlayState.PAUSED : PlayState.PLAYING,
    });
};

const skipForward = (state) => {
    const queue = state.get("queue");
    const playState = state.get("playState");
    if (queue.isEmpty()) {
        return stopPlayback(state);
    }
    return playQueue(state, { queue }).merge({ playState });
};

const skipBackward = (state) => {
    const currentTrack = state.get("currentTrack");
    const time = state.get("currentTime");
    const queue = state.get("queue");
    const history = (time >= 3) ? state.get("history") : state.get("history").shift();
    const newState = state.merge({
        history: history.shift(),
        queue: (time >= 3) ? queue : queue.unshift(currentTrack),
    });

    if (history.isEmpty()) {
        return stopPlayback(newState);
    }

    const track = history.first();
    const playState = state.get("playState");
    return playTrack(newState, { track }).merge({ playState });
};

const seek = (state, payload) => state.set("currentTime", payload.time);

const updateTime = (state, payload) => state.set("currentTime", Math.trunc(payload.time));

const toggleMute = (state) => state.set("muted", !state.get("muted"));

const setVolume = (state, payload) => state
    .set("volume", Math.max(0, Math.min(1, payload.volume)))
    .set("muted", false);

const nowPlayingReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.PLAY_TRACK:
            return playTrack(state, action.payload);
        case types.PLAY_QUEUE:
            return playQueue(state, action.payload);
        case types.TOGGLE_PLAYBACK:
            return togglePlayback(state, action.payload);
        case types.SKIP_FORWARD:
            return skipForward(state, action.payload);
        case types.SKIP_BACKWARD:
            return skipBackward(state, action.payload);
        case types.SEEK:
            return seek(state, action.payload);
        case types.STOP_PLAYBACK:
            return stopPlayback(state, action.payload);
        case types.UPDATE_TIME:
            return updateTime(state, action.payload);
        case types.TOGGLE_MUTE:
            return toggleMute(state, action.payload);
        case types.SET_VOLUME:
            return setVolume(state, action.payload);
        default:
            return state;
    }
};

export default nowPlayingReducer;
