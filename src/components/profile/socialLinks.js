import { faSpotify, faApple, faYoutube, faInstagram, faFacebook, faTiktok } from '@fortawesome/free-brands-svg-icons'

// Each field matches the API's utilities.<field>; order here is the order shown on profiles and forms
export const SOCIAL_LINKS = [
    { field: "spotify_link", label: "Spotify", icon: faSpotify },
    { field: "apple_link", label: "Apple Music", icon: faApple },
    { field: "youtube_link", label: "YouTube", icon: faYoutube },
    { field: "instagram_link", label: "Instagram", icon: faInstagram },
    { field: "facebook_link", label: "Facebook", icon: faFacebook },
    { field: "tiktok_link", label: "TikTok", icon: faTiktok },
]
