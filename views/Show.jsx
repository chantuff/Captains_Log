const React = require('react');
class Show extends React.Component {
    render () {
        const log = this.props.log;

        return (
            <div>
                <h1>Show Page</h1>
                <p>The {log.title} is {log.entry}</p>
                {log.shipIsBroken ? 'Ship is broken' : "Ship is NOT broken"}
            </div>

        )
    }
}

module.exports = Show;