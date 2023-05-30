import React from 'react';
import moment from "moment";

import Image from '../../atoms/Image';
import './styles.css';

const UserInfo = ({ picture, firstName = '', lastName = '', date }) => {

    const today = moment(new Date());
    const posted = moment(date);

    return (
        <section className="user-info-container">
            <Image
                className="user-avatar"
                src={picture}
                alt={firstName}
            />
            <div className="user-info">
                <span className="user-name">
                    {`${firstName} ${lastName}`}
                </span>
                {date &&
                    <span className="user-posted">
                        Posted {today.diff(posted, 'years')}, years ago.
                    </span>
                }
            </div>
        </section>
    )
};

export default UserInfo;
