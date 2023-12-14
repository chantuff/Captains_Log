const React = require('react');

class New extends React.Component {
    render () {
        return (
            <div>
                <h1>Captains Log</h1>
                {/* NOTE: action will be the route, method will be the HTTP verb */}
                <form action='/new' method="POST">
                    Title: <input type="text" title="title" /><br />
                    Entry: < input type="textarea" name="entry"/> <br />
                    shipIsBroken: <input type="checkbox" name="shipIsBroken"/> <br />
                    <input type="submit" name="" value="Submit Entry"/>
                </form>
            </div>
        )
    }
}

module.exports = New;