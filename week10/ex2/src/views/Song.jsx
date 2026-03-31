import {Link, useParams} from "react-router-dom";
import PropTypes from "prop-types";
export function Song({data}) {
    const {slug} = useParams();
    console.log("slug", slug);
    const selectedSong = data.find((song) => song.slug === slug)
    return (
        <>
            <nav>
                <Link to="/">Go back Home</Link>
            </nav>
            <h1>selectedSong.title</h1>
            <img src={selectedSong.cover} alt={selectedSong.title} />
            <p>Artist: {selectedSong.artist} </p>
            <p>Rank: {selectedSong.rank} </p>
        </>
    )
}

Song.proptypes = {
    data: PropTypes.arrayOf(PropTypes.any)
}
