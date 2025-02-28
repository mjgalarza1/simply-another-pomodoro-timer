const ToggleButton = ({text,onChange,isChecked}) => {
    return (
        <div className="flex flex-row gap-2 border-t-1 border-[#B1B4C9] py-6 max-[470px]:flex-col max-[470px]:gap-0">

            <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" checked={isChecked} onChange={onChange}/>
                <div
                    className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#3688FF]"></div>
            </label>

            <p className="font-fredoka text-[26px] font-medium text-[#5F6379] max-[470px]:text-[16px] ">
                {text}
            </p>

        </div>
    )
}

export default ToggleButton
