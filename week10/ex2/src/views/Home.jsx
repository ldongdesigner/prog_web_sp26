import {Link} from "react-router-dom";
import musicData from "../assets/music.json"
export function Home() {
    return (
        <div>
            <h1>Music List</h1>
            {musicData.map((song) => {
                return (
                    <div key={song.slug}>
                    <img src={song.cover} alt="song.title" />
                    <p><Link to={`${song.slug}`}><strong>{song.title}</strong> by {song.artist}</Link> </p>
                    </div>
                )
            })}
        </div>

    )
}