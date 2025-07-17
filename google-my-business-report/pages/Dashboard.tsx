
import React, { useState, useMemo } from 'react';
import type { BusinessDataHook } from '../types';
import StatCard from '../components/StatCard';
import ExportButtons from '../components/ExportButtons';
import { ICONS } from '../constants';
import Spinner from '../components/Spinner';

interface DashboardProps {
    businessData: BusinessDataHook;
}

const Dashboard: React.FC<DashboardProps> = ({ businessData }) => {
    const { analytics, profile, reviews, locations, locationGroups } = businessData;

    const [selectedGroup, setSelectedGroup] = useState('all');
    
    const defaultEndDate = new Date();
    const defaultStartDate = new Date();
    defaultStartDate.setMonth(defaultStartDate.getMonth() - 1);
    
    const defaultCompareEndDate = new Date();
    defaultCompareEndDate.setMonth(defaultCompareEndDate.getMonth() - 1);
    defaultCompareEndDate.setDate(0); 
    const defaultCompareStartDate = new Date(defaultCompareEndDate);
    defaultCompareStartDate.setDate(1); 

    const [startDate, setStartDate] = useState(defaultStartDate.toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(defaultEndDate.toISOString().split('T')[0]);
    const [compareStartDate, setCompareStartDate] = useState(defaultCompareStartDate.toISOString().split('T')[0]);
    const [compareEndDate, setCompareEndDate] = useState(defaultCompareEndDate.toISOString().split('T')[0]);
    const [showComparison, setShowComparison] = useState(false);

    const filteredLocations = useMemo(() => {
        if (!locations) return [];
        if (selectedGroup === 'all') return locations;
        return locations.filter(loc => loc.group === selectedGroup || loc.id === 'all');
    }, [selectedGroup, locations]);

    const averageRating = useMemo(() => {
        if (!reviews || reviews.length === 0) return 'N/A';
        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        return (totalRating / reviews.length).toFixed(1);
    }, [reviews]);

    const handleExportPDF = () => {
        alert('Export to PDF functionality is in development and will be available soon!');
    };
    const handleExportExcel = () => {
        alert('Export to Excel functionality is in development and will be available soon!');
    };

    if (!analytics || !profile || !reviews || !locations || !locationGroups) {
        return (
            <div className="flex justify-center items-center h-full">
                <Spinner size="lg" />
            </div>
        );
    }

    const totalViews = analytics.performance.viewsMaps + analytics.performance.viewsSearch;

    return (
        <div className="space-y-8">
            <div className="flex flex-wrap gap-4 justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold">Welcome back, {profile.name.split(' ')[0]}!</h1>
                    <p className="text-on-muted mt-1">Here's how your business is performing.</p>
                </div>
                <ExportButtons onExportPDF={handleExportPDF} onExportExcel={handleExportExcel} />
            </div>

            {/* Filter Bar */}
            <div className="bg-surface p-4 rounded-lg shadow-lg space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Location Filters */}
                    <div>
                        <label className="block text-sm font-medium text-on-muted mb-1">Location Group</label>
                        <select
                          value={selectedGroup}
                          onChange={(e) => setSelectedGroup(e.target.value)}
                          className="w-full bg-muted border-slate-600 rounded-md py-2 px-3 text-on-surface focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        >
                            {locationGroups.map(group => <option key={group.id} value={group.id}>{group.name}</option>)}
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-on-muted mb-1">Location</label>
                        <select className="w-full bg-muted border-slate-600 rounded-md py-2 px-3 text-on-surface focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
                            {filteredLocations.map(loc => <option key={loc.id} value={loc.id}>{loc.name}</option>)}
                        </select>
                    </div>
                    {/* Date Range Filters */}
                    <div>
                         <label className="block text-sm font-medium text-on-muted mb-1">Date Range</label>
                        <div className="grid grid-cols-2 gap-2">
                            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full bg-muted border-slate-600 rounded-md py-2 px-3 text-on-surface focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:[color-scheme:dark]"/>
                            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full bg-muted border-slate-600 rounded-md py-2 px-3 text-on-surface focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:[color-scheme:dark]"/>
                        </div>
                    </div>
                </div>
                <div>
                    <label className="flex items-center cursor-pointer w-fit">
                        <input type="checkbox" checked={showComparison} onChange={e => setShowComparison(e.target.checked)} className="h-4 w-4 rounded border-slate-500 bg-muted text-primary-600 focus:ring-primary-500 focus:ring-offset-surface"/>
                        <span className="ml-2 text-sm font-medium text-on-muted">Add comparison period</span>
                    </label>
                </div>
                 {/* Comparison Date Range */}
                {showComparison && (
                    <div>
                        <label className="block text-sm font-medium text-on-muted mb-1">Comparison Date Range</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                             <div className="grid grid-cols-2 col-span-1 md:col-start-3 gap-2">
                                <input type="date" value={compareStartDate} onChange={e => setCompareStartDate(e.target.value)} className="w-full bg-muted border-slate-600 rounded-md py-2 px-3 text-on-surface focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:[color-scheme:dark]"/>
                                <input type="date" value={compareEndDate} onChange={e => setCompareEndDate(e.target.value)} className="w-full bg-muted border-slate-600 rounded-md py-2 px-3 text-on-surface focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:[color-scheme:dark]"/>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* New Stat Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <StatCard 
                    title="Total Views" 
                    value={totalViews.toLocaleString()} 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
                    change="+12.5%"
                    changeType="increase"
                />
                 <StatCard 
                    title="Search Views" 
                    value={analytics.performance.viewsSearch.toLocaleString()} 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
                />
                <StatCard 
                    title="Map Views" 
                    value={analytics.performance.viewsMaps.toLocaleString()} 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                />
                <StatCard 
                    title="Website Visits" 
                    value={analytics.performance.customerActions.websiteVisits.toLocaleString()} 
                    icon={ICONS.website}
                    change="+5.1%"
                    changeType="increase"
                />
                <StatCard 
                    title="Direction Requests" 
                    value={analytics.performance.customerActions.directions.toLocaleString()} 
                    icon={ICONS.directions}
                />
                <StatCard 
                    title="Calls" 
                    value={analytics.performance.customerActions.calls.toLocaleString()} 
                    icon={ICONS.calls}
                    change="-3.2%"
                    changeType="decrease"
                />
                 <StatCard 
                    title="Searches" 
                    value={analytics.performance.searches.toLocaleString()} 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
                    change="+8.2%"
                    changeType="increase"
                />
                 <StatCard 
                    title="Lifetime Reviews" 
                    value={analytics.lifetimeReviews.toLocaleString()} 
                    icon={ICONS.lifetimeReviews}
                />
                <StatCard
                    title="Average Rating"
                    value={averageRating}
                    icon={ICONS.averageRating}
                />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-surface p-6 rounded-lg shadow-lg">
                     <h3 className="font-bold text-lg text-on-surface mb-4">Top Search Queries</h3>
                     <ul className="space-y-3">
                        {analytics.queries.map((q) => (
                             <li key={q.query} className="flex justify-between items-center text-sm">
                                <span className="text-on-surface">{q.query}</span>
                                <span className="font-medium text-on-muted">{q.count}</span>
                             </li>
                        ))}
                     </ul>
                </div>
                 <div className="bg-surface p-6 rounded-lg shadow-lg">
                     <h3 className="font-bold text-lg text-on-surface mb-4">Recent Reviews</h3>
                     <ul className="space-y-4">
                        {reviews.slice(0, 3).map(review => (
                             <li key={review.id} className="flex items-center space-x-3">
                                <img src={review.avatar} alt={review.author} className="w-10 h-10 rounded-full"/>
                                <div className="flex-1">
                                    <p className="font-medium text-on-surface text-sm">{review.author}</p>
                                    <p className="text-xs text-on-muted truncate">{review.content}</p>
                                </div>
                                <div className="flex items-center text-yellow-400">
                                    <span className="text-sm mr-1">{review.rating}</span>
                                    {ICONS.star}
                                </div>
                             </li>
                        ))}
                     </ul>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
