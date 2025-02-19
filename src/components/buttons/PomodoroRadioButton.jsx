const PomodoroRadioButton = ({inputValue,inputName,label,isChecked,onClick}) => {
    return (
        <label className="w-[200px]">

            <input type="radio" id={inputValue} name={inputName} value={inputValue} checked={isChecked} onChange={onClick} className="hidden peer" />
            <div
                className="
                    h-[9vh] max-h-[50px] min-h-[30px]
                    flex justify-center items-center p-2 text-center bg-white
                    rounded-xl border-1 border-[#464646]
                    font-fredoka text-[24px] text-[#464646]
                    peer-checked:bg-[#5F6379] peer-checked:text-white peer-checked:hover:bg-[#5F6379]
                    hover:bg-[#EAEAEA]
                    max-[650px]:text-[3.7vw] max-[650px]:px-1
                    "
                >
                {label}
            </div>

        </label>
    )
}

export default PomodoroRadioButton
