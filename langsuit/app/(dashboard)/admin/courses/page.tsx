"use client"
import { motion } from "framer-motion";

import { useState, useEffect } from 'react';
import Header from '../_components/Header'
import StatCard from '../_components/StatCard'

import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";

import SalesTrendChart from './_components/SalesTrendChart'
import CoursesTable from "./_components/CoursesTable";
import CategoryDistributionChart from "../(home)/_components/CategoryDistributionChart";

interface StatCardData {
    totalCourses: number;
    topSelling: number;
    lowestVisit: number;
    totalRevenue: number;
};

const ProductsPage = () => {
	const [statCardData, setStatCardData] = useState<StatCardData | null>(null);

    useEffect(() => {
        const fetchStatCardData = async () => {
            try {
                const response = await fetch('/api/dashboard/admin/courses/statcard');
                if (!response.ok) {
                    throw new Error('Failed to fetch stat card data');
                }
                const data = await response.json();
				console.log(data);
                setStatCardData(data);
            } catch (error) {
                console.error('Error fetching stat card data:', error);
            }
        };

        fetchStatCardData();
    }, []);
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Courses' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total Courses' icon={Package} value={statCardData?.totalCourses} color='#6366F1' />
					<StatCard name='Top Selling' icon={TrendingUp} value={statCardData?.topSelling} color='#10B981' />
					<StatCard name='Lowest Visit' icon={AlertTriangle} value={statCardData?.lowestVisit} color='#F59E0B' />
					<StatCard name='Total Revenue' icon={DollarSign} value={"$"+statCardData?.totalRevenue} color='#EF4444' />
				</motion.div>

				<CoursesTable />

				
				<div className='grid grid-col-1 lg:grid-cols-2 gap-8'>
					<SalesTrendChart />
					<CategoryDistributionChart />
				</div>
			</main>
		</div>
	);
};
export default ProductsPage;