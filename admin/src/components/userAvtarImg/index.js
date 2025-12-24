
const UserAvtarImgComponent = (props) => {
    return (
        <div className={`userAvtarImg ${props.lg === true && 'lg'}`}>
            <span className="rounded-circle">
                {/* <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" /> */}
                <img src={props.img} />
            </span>
        </div>
    )
}

export default UserAvtarImgComponent;