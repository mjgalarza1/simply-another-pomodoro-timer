const TimerInput = ({title,minutes,state,handler,disabled=false}) => {

    const handleInputChange = (e) => {
        const value = e.target.value;

        if (value === "") {
            state("");
            return;
        }

        if (/^[1-9][0-9]{0,2}$/.test(value)) {
            state(value);
            handler();
        }
    };

    const handleBlur = () => {
        if (minutes === "") {
            state("1");
        }
    };

    return (
        <div id="timer-input-container" className="flex flex-col items-center w-[140px] max-[560px]:w-full max-[470px]:items-start">
            <p className="font-fredoka text-[26px] font-medium text-pomodoro-blue-gray dark:text-pomodoro-hover max-[560px]:text-[4.3vw] max-[470px]:text-[16px]">{title}</p>
            <input
                id={title}
                type="text"
                className="border p-2 border-pomodoro-blue-gray dark:border-white rounded-[8px] w-full text-center font-fredoka text-[26px] text-pomodoro-blue-gray dark:text-pomodoro-hover w-full h-12 disabled:bg-[#e2e5ef] dark:disabled:bg-pomodoro-blue-gray"
                value={minutes}
                onChange={handleInputChange}
                onBlur={handleBlur}
                inputMode="numeric"
                pattern="[0-9]*"
                disabled={disabled}
            />
        </div>
    )
}

export default TimerInput
