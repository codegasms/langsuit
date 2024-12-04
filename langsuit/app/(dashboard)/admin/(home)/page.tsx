"use client"

import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";


import StatCard from "../_components/StatCard";
import Header from "../_components/Header";
import SalesOverviewChart from "./_components/SalesOverviewChart";
import CategoryDistributionChart from "./_components/CategoryDistributionChart";
import SalesChannelChart from "./_components/SalesChannelChart";
import { useEffect, useState } from "react";

interface StatCardData {
    totalSales: number;
    newUsers: number;
    totalCourses: number;
    conversionRate: number;
}

const OverviewPage = () => {
    const [statCardData, setStatCardData] = useState<StatCardData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const fetchStatCardData = () => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', '/api/dashboard/admin/overview/statcard', true);
            
            xhr.onload = function() {
                if (xhr.status >= 200 && xhr.status < 300) {
                    const data = JSON.parse(xhr.responseText);
                    setIsLoading(false);
                    console.log(data);
                    setStatCardData(data);
                } else {
                    console.error('Failed to fetch stat card data');
                }
            };
            
            xhr.onerror = function() {
                console.error('Error fetching stat card data:', xhr.statusText);
            };
            
            xhr.send();
        };
    
        fetchStatCardData();
    }, []);
	
    if(isLoading) return <div>Loading ..</div>
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Overview' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>

				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard 
                        name='Total Sales' 
                        icon={Zap} 
                        value={statCardData ? `$${statCardData.totalSales.toLocaleString()}` : 'Loading...'} 
                        color='#6366F1' 
                    />
                    <StatCard 
                        name='New Users' 
                        icon={Users} 
                        value={statCardData ? statCardData.newUsers.toLocaleString() : 'Loading...'} 
                        color='#8B5CF6' 
                    />
                    <StatCard 
                        name='Total Courses' 
                        icon={ShoppingBag} 
                        value={statCardData ? statCardData.totalCourses.toLocaleString() : 'Loading...'} 
                        color='#EC4899' 
                    />
                    <StatCard 
                        name='Conversion Rate' 
                        icon={BarChart2} 
                        value={statCardData ? `${statCardData.conversionRate}%` : 'Loading...'} 
                        color='#10B981' 
                    />
				</motion.div>

				 <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					<SalesOverviewChart />
					<CategoryDistributionChart />
					<SalesChannelChart />
				</div> 
			</main>
		</div>
	);
};


export default OverviewPage;