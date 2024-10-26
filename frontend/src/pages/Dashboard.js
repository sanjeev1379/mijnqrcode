import React, { useEffect, useRef, useState } from 'react';
import useAnalyticsData from '../hooks/useAnalyticsData';

const Dashboard = () => {
    const { currentUserCount, pageViews } = useAnalyticsData();


    return (
        <div className="display-layout">
            <h1>Dashboard</h1>
            <hr />
            <p>Current Users: {currentUserCount}</p>
            <p>Page Views: {pageViews}</p>

        </div>
    );
};

export default Dashboard;
