import { useState, useEffect } from 'preact/hooks';
import { useMemo } from "preact/hooks";

const getUser = function (userId: any) {
    return useMemo(
        () => {
            const [userInfo, setUser] = useState({});
            fetch('https://jsonplaceholder.typicode.com/users/1')
            .then(response => response.json())
            .then(user => {
                setUser(user)
            })
            .catch(error => {
                setUser({})
            })

            return userInfo
        },
        [userId]
    );
}

const User = function (props: any) {
    const [userInfo, setUser]: any = useState(getUser(props.userId));
    return <div>Meu nome é {props.name}. {userInfo?.name}</div>;
}

export default User
