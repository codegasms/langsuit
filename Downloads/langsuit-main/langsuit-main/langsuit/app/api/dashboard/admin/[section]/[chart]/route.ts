import dashboardOrchestration from '@/utils/dashboard/adminOrchestration';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest, { params }: { params: { section: string; chart: string } }) {
  const { section, chart } = params;

  const sectionInstance = dashboardOrchestration.getSection(section);
  if (!sectionInstance) {
    return NextResponse.json({ error: 'Section not found' }, { status: 404 });
  }

  try {
    if (chart === 'statcard') {
      if ('getStatCardData' in sectionInstance && typeof sectionInstance.getStatCardData === 'function') {
        const data = await sectionInstance.getStatCardData();
        return NextResponse.json(data, { status: 200 });
      } else {
        return NextResponse.json({ error: 'Stat card data not available for this section' }, { status: 404 });
      }
    }
    // console.log(sectionInstance);
    // console.log(chart);
    // console.log(sectionInstance.getCharts());
    // console.log("Database");
    const chartInstance = sectionInstance.getCharts().get(chart);
    if (!chartInstance) {
      return NextResponse.json({ error: 'Chart not found' }, { status: 404 });
    }

    const data = await chartInstance.fetchData();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching chart data:', error);
    return NextResponse.json({ error: 'Failed to fetch chart data' }, { status: 500 });
  }
}
