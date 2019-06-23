import React, { Fragment } from 'react'
import spinner from './spinner.gif'
import { noAuto } from '@fortawesome/fontawesome-svg-core';

export default () => (
    <Fragment>
        <img
            src={spinner}
            style={{ width: '200px', margin: 'auto', dispay: 'block' }}
            alt="Loading..."
        />
    </Fragment>
)