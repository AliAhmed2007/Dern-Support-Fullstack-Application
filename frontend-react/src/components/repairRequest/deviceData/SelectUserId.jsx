import { Spin } from "antd"
import { Suspense } from "react"
import { Await } from "react-router-dom"

function SelectUserId({ darkMode, error, userDataPromise, setUserId }) {

    function renderUsersOptions(users) {
        const businessAndIndvidualUsers = users.filter(user => user.user_type === 'business' || user.user_type === 'individual')
        return (
            <>
                {
                    businessAndIndvidualUsers.length > 0 ? (
                        <>
                            <option value="" disabled>
                                Businesses and Individuals only.
                            </option>
                            <option value="0">someone@example.com || firstName lastName</option>
                            {businessAndIndvidualUsers.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.email} || {user.first_name} {user.last_name}
                                </option>
                            ))}
                        </>
                    ) : (
                        <option value="" disabled>
                            There are no Businesses and Individuals.
                        </option>
                    )
                }
            </>
        )
    }

    return (
        <div className="flex flex-col flex-1/2">
            <label htmlFor="courier" className={`mb-1 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                The request Belongs to?

            </label>
            <select
                onChange={(e) => setUserId(Number(e.target.value))}
                id="user_id"
                name="user_id"
                defaultValue="0"
                className={`p-2 cursor-pointer border rounded focus:outline-none focus:ring-2 ${darkMode
                    ? 'bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-500'
                    : 'bg-white border-gray-300 text-gray-800 focus:ring-blue-500'
                    }`}
            >
                <Suspense fallback={
                    <div className={`flex items-center justify-center min-h-[350px]`}>
                        <Spin size="large" />
                    </div>
                }>
                    <Await resolve={userDataPromise}>
                        {(users) => renderUsersOptions(users.data)}
                    </Await>
                </Suspense>
            </select>
            {error && (
                <div className="text-red-500 text-sm mt-1">{error}</div>
            )}
        </div>
    )
}

export default SelectUserId