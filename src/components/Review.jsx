const IMG_PATH = 'https://image.tmdb.org/t/p/w1280/'

const Review = (props) => {
    let avatarLink = props.avatar;

    if(avatarLink) {
        if(avatarLink.startsWith('/http')) {
            avatarLink = avatarLink.slice(1)
        }
        else {
            if(avatarLink.startsWith('/')) {
                avatarLink = avatarLink.slice(1)
            }

            avatarLink = `${IMG_PATH}${avatarLink}`
        }
    }

    return (
        <div className="bg-slate-800 p-2 text-white my-2 rounded">
            <div className="flex items-center">
                { props.avatar && <img src={avatarLink} className='w-8 h-8 mr-2 rounded-3xl' /> }
                <span className="font-bold">{ props.author } says</span>
            </div>
            { props.content.substring(0, 250) }...
        </div>
    );
}

export default Review;
