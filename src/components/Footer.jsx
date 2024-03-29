import { SiGithub, SiLinkedin } from 'react-icons/si'

const Footer = () => {
    return (
        <div className='bg-slate-900 text-gray-400 flex flex-col justify-center items-center h-32'>
            <div className="mb-4">Powered by The Movie DB</div>
            <div className='flex'>
                <a href="https://github.com/MaitrayBhardwaj" className='mx-1' target="_blank" rel="noreferrer"><SiGithub /></a>
                <a href="https://linkedin.com/in/maitray-bhardwaj" className='mx-1' target="_blank" rel="noreferrer"><SiLinkedin /></a>
            </div> 
        </div>
    );
}

export default Footer;