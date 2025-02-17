function PomodoroTimer() {
    return (
        <div id="pomodoro-timer-container" className="flex flex-col gap-6">
            <div id="pomodoro-buttons-and-timer" className="text-center p-[25px] bg-white rounded-[25px] shadow-[15px_23px_50px_rgb(148,118,174)] flex flex-col justify-center w-[816px] max-[816px]:w-screen">
                <div id="pomodoro-selection-buttons" className="flex flex-row justify-evenly">
                    <p>[ Pomodoro ]</p>
                    <p>[ Short break ]</p>
                    <p>[ Long break ]</p>
                </div>
                <div id="timer">
                    <h1>25:00</h1>
                </div>
            </div>

            <div id="pomodoro-player-buttons" className="flex flex-row justify-evenly max-[816px]:gap-0">
                <p>[ Play ]</p>
                <p>[ Restart ]</p>
                <p>[ Settings ]</p>
            </div>
        </div>
    )
}

export default PomodoroTimer
