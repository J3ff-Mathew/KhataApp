import React, { useState } from 'react';
import Search from 'react-search'
import Navb from './Navb';


export default function Searching() {
    const [state, setState] = useState([])

    function getItemsAsync(searchValue, cb) {
        let url = `https://jsonplaceholder.typicode.com/users`;
        fetch(url).then((response) => {
            return response.json();
        }).then((results) => {
            console.log(results)
            if (results != undefined) {
                console.log(results)
                let items = results.map((res, i) => { return { id: i, value: res.name } })
                setState(items)
                cb(searchValue)
            }
        });
    }
    return (
        <div>
            <Navb />

            <Search items={state}
                placeholder={'pick a Name'}
                multiple={true}
                getItemsAsync={getItemsAsync.bind(this)}
            />
        </div>
    )
}
