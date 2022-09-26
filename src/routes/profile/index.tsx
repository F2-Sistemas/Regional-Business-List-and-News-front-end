import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import './style.css';

// Note: `user` comes from the URL, courtesy of our router
export default function ({ user, path }: {
    user: string
    path: string
}) {
    const [time, setTime] = useState(Date.now());
    const [count, setCount] = useState(10);
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

    return (
        <>
            <div class="profile">
                <h1>Profile: {user}</h1>
                <p>This is the user profile for a user named {user}.</p>

                <div>Current time: {new Date(time).toLocaleString()}</div>

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