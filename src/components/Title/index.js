import './title.css';

export default function Title({children, name}) {
    return(
        <div>
            <div className="title">
                {children}
                <span>{name}</span>
            </div>
        </div>
    )
}