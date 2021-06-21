import react from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as heartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as heartSolid } from '@fortawesome/free-solid-svg-icons';

const BotonLike = ({ onSubmitLike, like }) => {

    return (
        <button onClick={onSubmitLike}>
            {
                like ? (
                    <FontAwesomeIcon className="text-red-dark" icon={heartSolid} />
                ) : (
                    <FontAwesomeIcon icon={heartRegular} />
                )
            }
        </button>
    )
}

export default BotonLike;