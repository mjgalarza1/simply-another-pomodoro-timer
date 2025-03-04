const PomodoroRadioButton = ({inputValue,inputName,label,isChecked,onClick}) => {
    return (
        <label className="w-full">

            <input type="radio" id={inputValue} name={inputName} value={inputValue} checked={isChecked} onChange={onClick} className="hidden peer" />
            <div
                className="
                    h-[9vh] max-h-[50px] min-h-[30px]
                    flex justify-center items-center p-2 text-center bg-white
                    rounded-xl border-1 border-pomodoro-dark-gray
                    font-fredoka text-[24px] text-pomodoro-dark-gray
                    peer-checked:bg-pomodoro-blue-gray peer-checked:text-white peer-checked:hover:bg-pomodoro-blue-gray
                    hover:bg-pomodoro-hover
                    dark:bg-pomodoro-black dark:border-white dark:text-white
                    dark:peer-checked:bg-white dark:peer-checked:text-pomodoro-black dark:peer-checked:hover:bg-white
                    dark:hover:bg-pomodoro-dark-gray
                    max-[650px]:text-[3.7vw] max-[650px]:px-1
                    "
                >
                {label}
            </div>

        </label>
    )
}

export default PomodoroRadioButton
