import { useEffect, useState } from "react"
import { getUsers } from "../../services/getUsers"

export const ArtistGallery = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsers().then(setUsers)
    }, [])

    return (
        <div>
            <h2>Artist Gallery</h2>
            <div>
                {users.map((user) => {
                    return (
                        <div>
                            <div>user.name</div>
                            <div>user.email</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}