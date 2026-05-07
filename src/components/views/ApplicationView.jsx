import { ArtistView } from "./ArtistView"
import { BandMateView } from "./BandMateView"

export const ApplicationView = () => {
    const user = JSON.parse(localStorage.getItem("user"))

    return user?.is_superuser ? <BandMateView user={user} /> : <ArtistView user={user} />
}
