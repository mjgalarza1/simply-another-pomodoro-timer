const ToggleButton = ({text,onChange,isChecked}) => {
    return (
        <div className="flex flex-row justify-between py-4 justify-between max-[240px]:flex-col max-[470px]:py-2">

            <p className="font-fredoka text-[26px] font-medium text-[#5F6379] max-[470px]:text-[16px] ">
                {text}
            </p>

            <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" name={text} className="sr-only peer" checked={isChecked} onChange={onChange}/>
                <div className="
                    relative w-14 h-7 bg-gray-200 rounded-full
                    peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full
                    peer-checked:after:border-white peer-checked:bg-[#3688FF] peer-focus:outline-none
                    after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white
                    after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all"/>
            </label>


        </div>
    )
}

export default ToggleButton
