class Location extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            locations: []
        }
    }

    componentDidMount() {
        fetch('/api/locations')
            .then(response =>  response.json())
            .then(res => {
                console.log(res, ' rreess')
                if (res.data) {
                    this.setState({
                        locations: res.data
                    })
                }
            })
            .catch(err => console.log(err))
    }

    render () {
        console.log(this.state, 'state');
        return (
            <div className="container">
                {this.state.locations.length > 0 ? 'Database Connected' : 'Api requesting'}
                <h2>Location List</h2>
                <ul>
                    {this.state.locations.map((location) => <li key={location.id}>{location.info}</li>)}
                </ul>
            </div>
        )
    }
}

ReactDOM.render(
    <Location />,
    document.getElementById('react_container')
);