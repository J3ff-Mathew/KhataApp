import React from 'react';
import nezuko from './nezuko.gif'
import load from './Loading_gif.gif'

export default function LoadNezuko() {
    return (
        <div className='d-flex justify-content-center align-items-center'>
            <img src={load} alt="loading..." />

        </div>
    )
}
