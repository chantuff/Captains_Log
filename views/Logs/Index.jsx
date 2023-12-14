const React = require('react');

class Index extends React.Component {
    render() {
        const { logs } = this.props;
        // const logs = this.props.logs;

        return (
            <div>
                <h1>Captains Log</h1>
                <nav>
                    <a href="/logs/new">Create a new log</a>
                </nav>
                <ul>
                    {logs.map((log, i) => {
                        return (
                            <li>
                                The {' '}
                                <a href={`/logs/${log._id}`}>
                                    {log.title}
                                </a> 
                                
                            {' '}
                                is {log.entry} <br></br>
                                {log.shipIsBroken
                                ? `Ship is broken`
                            :   `Ship is NOT broken`}
                            <br />
                            <a href={`/logs/${log._id}/edit`}> Edit this entry </a>
                            <form action={`/logs/${log._id}?_method=DELETE`} method="POST">
                                <input type="submit" value="DELETE" />
                            </form>
                            </li>
                        )
                    })

                    }
                </ul>
            </div>
        )
    }
}

module.exports = Index;