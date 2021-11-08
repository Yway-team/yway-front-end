import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import React from 'react'
import ReactTimeAgo from 'react-time-ago'

TimeAgo.addDefaultLocale(en);


export default function TimeAgoFromNow({ date }) {
    return (
        <ReactTimeAgo date={date} locale="en-US" timeStyle="round-minute" />
    )
}
