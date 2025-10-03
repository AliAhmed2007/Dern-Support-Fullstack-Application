import { useEffect, useState } from 'react'
import useUserProfile from '../hooks/useUserProfile'

function Home() {
    const [dark, setDark] = useState(true)
    const { userProfile, loadUserProfile } = useUserProfile()
    useEffect(() => {
        if (!userProfile.isLoading) {
            loadUserProfile();
        }
    }, [userProfile.isLoading, loadUserProfile]);
    return (
        <div className={`p-40 ${dark ? "bg-dark-background text-dark-text-primary" : "text-light-text-secondary"}`} >
            {
                userProfile.isLoading ? <h1>{userProfile.userData.email}</h1> : <h1>Loading...</h1>
            }
            <h1 className="text-2xl">Ali Helwan</h1>
            <div className={`p-20 ${dark ? "bg-dark-surface-primary border-color-dark shadow-dark"
                : "bg-light-surface-primary border-color-light shadow-light"}`} >
                <h1 className="text-2xl">Nested Ali Helwan</h1>
                <div className={`p-20 ${dark ? "bg-dark-surface-secondary" : "bg-light-surface-secondary"}`}>
                    <h1 className="text-2xl">Nested Nested Ali Helwan</h1>
                </div>
            </div>
        </div>
    )
}

export default Home