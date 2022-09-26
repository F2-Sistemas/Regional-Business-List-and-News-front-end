import { h } from 'preact';
import { Link } from 'preact-router/match';
import './style.css';

const Header = function() {
    return (
        <header class="header">
            <h1>Preact App</h1>
            <nav>
                <Link activeClassName="active" href="/">Home</Link>
                <Link activeClassName="active" href="/profile">Me</Link>
                <Link activeClassName="active" href="/profile/john">John</Link>
                <Link activeClassName="active" href="/user/1">User #1</Link>
                <Link activeClassName="active" href="/user/2">User #2</Link>
            </nav>
        </header>
    );
}

export default Header;
