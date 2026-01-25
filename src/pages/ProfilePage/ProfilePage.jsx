import { useEffect } from "react"

const ProfilePage = () => {

    useEffect(() => {
        document.title = "Щоденці | Збережені / Мої історії"
    })
    return (
        <main>
             <h1>profile</h1>
        </main>
    )
}

export default ProfilePage