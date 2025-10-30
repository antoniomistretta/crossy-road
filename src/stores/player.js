const state = {
    move: null,
    playerRef: null,
};

export function getMove() {
    return state.move;
}

export function setMove(move) {
    state.move = move;
}

export function getPlayerRef() {
    return state.playerRef;
}

export function setPlayerRef(ref) {
    state.playerRef = ref;
}