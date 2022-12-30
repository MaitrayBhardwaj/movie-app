import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

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
        <div className="bg-slate-800 p-4 text-white my-2 rounded">
            <div className="flex items-center">
                { props.avatar && <img src={avatarLink} className='w-8 h-8 mr-2 rounded-3xl' /> }
                <span className="font-bold">{ props.author } says</span>
                <span className='ml-auto'>{props.rating}/10</span>
            </div>
            <div className='my-2'>
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{ `${props.content.substring(0, 250)}...` }</ReactMarkdown>
                <a href={props.url} className="hover:text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Read more</a>
            </div>
        </div>
    );
}

export default Review;
