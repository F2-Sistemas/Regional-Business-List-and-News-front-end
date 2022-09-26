import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { useMemo } from "preact/hooks";
import './style.css';

// Note: `user` comes from the URL, courtesy of our router
export default function ({ userId, path }: {
    userId: string | number
    path: string
}) {
    const [userInfo, setUser]: any = useState({});
    const getUserData = (userId: string | number) => {
        useMemo(
            () => {
                fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
                    .then(response => response.json())
                    .then(user => {
                        setUser(user)
                    })
                    .catch(error => {
                        setUser({})
                    })
            },
            ['getUserData', userId]
        );
    }

    const [time, setTime] = useState(Date.now());
    const [count, setCount] = useState(10);

    getUserData(userId)

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(Date.now());
        }, 1000);
        return () => {
            clearInterval(timer);
        }
    }, []);

    useEffect(() => {
        console.log('<App> was just rendered for the first time')
    }, [])

    useEffect(() => {
        console.log('count value was changed to: ', count)
    }, [count])

    useEffect(() => {
        console.log('User changed to: ', userInfo)
    }, [userInfo])

    return (
        <>
            <div class="user">
                <h1>UserID: {userId}</h1>
                <p>This is the user user for a user ID {userId}.</p>

                {/* <User name="Pedro" userId={2} /> */}
                {/* <p>Hello {userInfo?.name}</p> */}
                <p>Hello {userInfo?.name}</p>

                <div>Current time: {new Date(time).toLocaleString()}</div>

                <p>
                    <button onClick={() => {
                        getUserData(1);
                    }}>Load user #1</button>
                </p>

                <p>
                    <button onClick={() => {
                        setCount(count + 1);
                    }}>Click Me</button>
                    {' '}
                    Clicked {count} times.
                </p>
            </div>
        </>
    );
}
