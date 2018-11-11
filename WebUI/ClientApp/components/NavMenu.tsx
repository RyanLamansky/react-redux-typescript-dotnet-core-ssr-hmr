import * as React from 'react';
import {
    Link,
    NavLink
} from 'react-router-dom';

export class NavMenu extends React.Component<{}, {
    readonly showNav: boolean;
}> {
    constructor(props: {}) {
        super(props);

        this.state = {
            showNav: false
        };
    }

    toggleNav = () => {
        this.setState({
            showNav: !this.state.showNav
        });
    }

    public render() {
        return <div className='main-nav'>
            <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <button
                        className='navbar-toggle'
                        onClick={this.toggleNav}
                    >Toggle navigation</button>
                    <Link className='navbar-brand' to={'/'}>.NET Core React</Link>
                </div>
                <ul className={`nav navbar-nav ${this.state.showNav ? 'show' : ''}`}>
                    <li>
                        <NavLink exact to={'/'} activeClassName='active'>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/counter'} activeClassName='active'>Counter</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/fetchdata'} activeClassName='active'>Fetch data</NavLink>
                    </li>
                </ul>
            </div>
        </div>;
    }
}
