import React from 'react'
import TimeAgo from 'react-timeago'

export default function TimeAgoFromNow({ dateIn }) {
    return (
        <TimeAgo date={dateIn} locale="en-US" />
    )
}
