const React = require('react');

class New extends React.Component {
    render () {
        return (
            <div>
                <h1>Log new entry</h1>
                {/* NOTE: action will be the route, method will be the HTTP verb */}
                <form action='/logs' method="POST">
                    title: <input type="text" name="title" /><br />
                    entry: < input type="textarea" name="entry"/> <br />
                    shipIsBroken: <input type="checkbox" name="shipIsBroken"/> <br />
                    <input type="submit" name="" value="Submit Entry"/>
                </form>
            </div>
        )
    }
}

module.exports = New;