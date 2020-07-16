import React from 'react';
import { plants } from '../classes/PlantApi'
import { users } from '../classes/UserApi';
import { breeds } from '../classes/BreedApi'

class Test extends React.Component {
    render() {
        plants.index().then((response) => {
            this.setState({plants: response.plants})
        })
        users.index().then((response) => {
            this.setState({users: response.users})
        })
        breeds.index().then((response) => {
            this.setState({breeds: response.breeds})
        })
            
        return (<h1>hey</h1>)
    }
}

export default Test;