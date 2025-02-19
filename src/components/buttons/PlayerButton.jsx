const PlayerButton = ({icon,alt,onClick}) => {
    return (
        <div onClick={onClick}>
            <button className="
                w-[48px] max-w-[8vw]
                transition duration-100 ease-in-out
                hover:scale-120
                active:scale-80
                hover:cursor-pointer
            ">
                <img src={icon} alt={alt}/>
            </button>
        </div>
    )
}

export default PlayerButton
