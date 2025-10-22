export const SET_CURRENT_SONG = 'SET_CURRENT_SONG'
export const SET_IS_PLAYING = 'SET_IS_PLAYING'
export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    isPlaying: false,
    currentSong: null,
    currentSongId: '',
    isPlayerLoading: false,
    queue: [],
    queueId: '',
    queueIndex: -1,
}

export function playerReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case SET_CURRENT_SONG: {
            const hasQueue = Array.isArray(cmd.queue)
            const nextQueue = hasQueue ? cmd.queue : state.queue
            const nextQueueId =
                typeof cmd.queueId === 'string' ? cmd.queueId : state.queueId
            const nextIndex =
                typeof cmd.queueIndex === 'number'
                    ? cmd.queueIndex
                    : (() => {
                          if (!cmd.currentSong || !nextQueue.length) return state.queueIndex
                          const idx = nextQueue.findIndex(
                              (song) =>
                                  song &&
                                  cmd.currentSong &&
                                  String(song._id) === String(cmd.currentSong._id)
                          )
                          return idx >= 0 ? idx : state.queueIndex
                      })()

            return {
                ...state,
                currentSong: cmd.currentSong,
                currentSongId:
                    cmd.currentSongId ||
                    (cmd.currentSong && cmd.currentSong._id) ||
                    '',
                queue: nextQueue,
                queueId: nextQueueId,
                queueIndex: nextIndex,
            }
        }
        case SET_IS_PLAYING: {
            return {
                ...state,
                isPlaying: cmd.isPlaying,
            }
        }
        case SET_IS_LOADING: {
            return {
                ...state,
                isPlayerLoading: cmd.isPlayerLoading,
            }
        }
        default: {
            return state
        }
    }
}
