import { use } from "react";
import { GameContext } from "../stores/game";
import { setMove } from "../stores/player";

export function Interface() {
    const { gameState, score, reset } = use(GameContext);

    const buttonStyles =
        "cursor-pointer h-12 bg-neutral-100 border-2 border-solid border-neutral-400 text-4xl text-neutral-900 shadow-[3px_5px_0_rgba(0,0,0,0.75)] active:shadow-[1px_2px_0_rgba(0,0,0,0.75)] active:translate-x-[2px] active:translate-y-[2px]";

    return (
        <>
            {gameState !== 'running' ? (
                <div className="w-full h-full backdrop-blur-xs bg-neutral-800/75 pt-safe-top pr-safe-right pb-safe-bottom pl-safe-left absolute top-0 left-0 flex flex-col justify-center items-center font-[Bytesized]">
                    <h1 className="mb-2 text-6xl font-bold tracking-tight text-white">
                        Game Over
                    </h1>
                    <p className="mb-3 text-4xl text-neutral-400">
                        Your final score: {score}
                    </p>
                    <button
                        onClick={reset}
                        className="cursor-pointer inline-flex items-center px-3 py-2 text-2xl font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Retry
                    </button>
                </div>
            ) : (
            <div className="w-full h-full pt-safe-top pr-safe-right pb-safe-bottom pl-safe-left absolute top-0 left-0 flex flex-col justify-between font-[Bytesized]">
                <span className="pt-4 pl-4 text-8xl text-neutral-100 text-shadow-[5px_5px_0_rgba(0,0,0,0.75)]">
                    {score}
                </span>

                <div className="w-full max-w-lg mx-auto p-4 grid grid-cols-3 gap-4">
                    <button
                        className={`${buttonStyles} col-span-full`}
                        onClick={() => {
                            setMove("forward");
                        }}
                    >
                        W
                    </button>
                    <button
                        className={buttonStyles}
                        onClick={() => setMove("left")}
                    >
                        A
                    </button>
                    <button
                        className={buttonStyles}
                        onClick={() => setMove("backward")}
                    >
                        S
                    </button>
                    <button
                        className={buttonStyles}
                        onClick={() => setMove("right")}
                    >
                        D
                    </button>
                </div>
            </div>
            )}
        </>
    );
}
