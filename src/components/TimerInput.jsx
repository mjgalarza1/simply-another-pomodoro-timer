const TimerInput = ({title,minutes,state}) => {

    const handleInputChange = (e) => {
        const value = e.target.value;

        if (value === "" || (/^[1-9][0-9]{0,2}$/.test(value))) {
            state(value);
        }
    };

    return (
        <div id="timer-input-container" className="flex flex-col items-center w-[140px] max-[560px]:w-full max-[470px]:items-start">
            <p className="font-fredoka text-[26px] font-medium text-[#464646] max-[560px]:text-[4.3vw] max-[470px]:text-[16px]">{title}</p>
            <input
                id={title}
                type="text"
                className="border p-2 border-[#464646] rounded-[8px] w-full text-center font-fredoka text-[26px] text-[#464646] w-full h-12"
                value={minutes}
                onChange={handleInputChange}
                inputMode="numeric"
                pattern="[0-9]*"
            />
        </div>
    )
}

export default TimerInput
