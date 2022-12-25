const Spinner = (props) => {
    const absoluteClass = 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'

    return (
        <div>
            <img 
                alt="Loading..."
                className={ props.isAbsolute ? absoluteClass : '' }
                src="https://www.uzunkoprutb.org.tr/en/img/loader.gif" />
        </div>
    );
}

export default Spinner;
