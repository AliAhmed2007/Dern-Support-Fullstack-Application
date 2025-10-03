import { Suspense } from 'react';
import { useLoaderData, Await } from 'react-router-dom';
import { Spin } from 'antd';
import { motion } from 'framer-motion';
import useTheme from '../../hooks/useTheme';
import StatsCard from '../../components/userDashboard/StatsCard';
import TechniciansTable from '../../components/tables/TechniciansTable';
import PieChartComponent from '../../components/charts/PieChartComponent';
import BarChartComponent from '../../components/charts/BarChartComponent';
import ColumnChartComponent from '../../components/charts/ColumnChartComponent';
import AreaChartComponent from '../../components/charts/AreaChartComponent'; // New chart component

const Technicians = () => {
  const { darkMode } = useTheme();
  const loaderData = useLoaderData();

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Spin size="large" />
        </div>
      }
    >
      <Await resolve={loaderData.technicians}>
        {(resolvedData) => {
          // The resolved data is assumed to be in the form { data: [...] }
          const techniciansRaw = resolvedData.data || [];

          // Compute extra metrics for each technician.
          // Calculate completed repairs, ongoing repair requests, and format join date.
          const formattedTechnicians = techniciansRaw.map((tech) => {
            const repairRequests = tech.repair_requests || [];
            const completed = repairRequests.filter(req => req.status.toLowerCase() === 'completed').length;
            const ongoing = repairRequests.filter(req =>
              ['pending', 'diagnostics', 'in progress'].includes(req.status.toLowerCase())
            ).length;
            return {
              ...tech,
              completedRepairs: completed,
              ongoingRequests: ongoing, // New field for table column
              joinedAt: new Date(tech.created_at).toLocaleDateString(),
            };
          });

          // Compute technician statistics for the StatsCard.
          const totalTechs = techniciansRaw.length;
          const availableTechs = techniciansRaw.filter(tech => tech.status === 'available').length;
          const avgRating = totalTechs > 0
            ? (techniciansRaw.reduce((acc, tech) => acc + parseFloat(tech.rating), 0) / totalTechs).toFixed(1)
            : 0;
          const totalRepairs = techniciansRaw.reduce(
            (acc, tech) => acc + (tech.repair_requests ? tech.repair_requests.length : 0),
            0
          );
          const avgRepairsPerMonth = totalTechs > 0 ? Math.round(totalRepairs  / 12) : 0;
          
          const technicianStats = [
            {
              title: 'Total Technicians',
              value: totalTechs,
              backgroundColor: darkMode ? 'var(--dark-surface-secondary)' : 'var(--light-surface-secondary)',
              textColor: darkMode ? 'var(--dark-text-primary)' : 'var(--light-text-primary)',
            },
            {
              title: 'Available Now',
              value: availableTechs,
              backgroundColor: darkMode ? 'rgba(74, 222, 128, 0.2)' : 'rgba(74, 222, 128, 0.1)',
              textColor: '#4ADE80',
            },
            {
              title: 'Avg. Rating',
              value: avgRating,
              backgroundColor: darkMode ? 'rgba(250, 204, 21, 0.2)' : 'rgba(250, 204, 21, 0.1)',
              textColor: '#FACC15',
            },
            {
              title: 'Avg. Repairs/Month',
              value: avgRepairsPerMonth,
              backgroundColor: darkMode ? 'rgba(96, 165, 250, 0.2)' : 'rgba(96, 165, 250, 0.1)',
              textColor: '#60A5FA',
            },
          ];

          // Compute specialization data for PieChart (group by specialization)
          const specCounts = {};
          techniciansRaw.forEach(tech => {
            const spec = tech.specialization || 'Unknown';
            specCounts[spec] = (specCounts[spec] || 0) + 1;
          });
          const specializationData = Object.keys(specCounts).map(key => ({
            name: key.charAt(0).toUpperCase() + key.slice(1),
            value: specCounts[key],
          }));

          // Compute performance data for BarChart (completed repairs and rating for each technician)
          const performanceData = techniciansRaw.map(tech => ({
            name: tech.name,
            completed: tech.repair_requests ? tech.repair_requests.filter(r => r.status.toLowerCase() === 'completed').length : 0,
            rating: parseFloat(tech.rating),
          }));

          // Compute rating distribution for ColumnChart (rounded ratings)
          const ratingBuckets = {};
          techniciansRaw.forEach(tech => {
            const rounded = Math.round(parseFloat(tech.rating));
            ratingBuckets[rounded] = (ratingBuckets[rounded] || 0) + 1;
          });
          const ratingData = Object.keys(ratingBuckets)
            .sort((a, b) => a - b)
            .map(rating => ({
              rating,
              count: ratingBuckets[rating],
            }));

          // Compute repair comparison for each technician:
          // Compare ongoing (pending, diagnostics, in progress) with completed repair requests.
          const repairComparisonData = techniciansRaw.map(tech => {
            const repairRequests = tech.repair_requests || [];
            const completed = repairRequests.filter(req => req.status.toLowerCase() === 'completed').length;
            const ongoing = repairRequests.filter(req =>
              ['pending', 'diagnostics', 'in progress'].includes(req.status.toLowerCase())
            ).length;
            return {
              name: tech.name,
              completed,
              ongoing,
            };
          });

          // Define table columns with an added column for ongoing repair requests.
          const columns = [
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Specialization',
              dataIndex: 'specialization',
              key: 'specialization',
            },
            {
              title: 'Status',
              dataIndex: 'status',
              key: 'status',
            },
            {
              title: 'Completed Repairs',
              dataIndex: 'completedRepairs',
              key: 'completedRepairs',
              sorter: (a, b) => a.completedRepairs - b.completedRepairs,
            },
            {
              title: 'Ongoing Requests',
              dataIndex: 'ongoingRequests',
              key: 'ongoingRequests',
              sorter: (a, b) => a.ongoingRequests - b.ongoingRequests,
            },
            {
              title: 'Rating (5.0)',
              dataIndex: 'rating',
              key: 'rating',
              sorter: (a, b) => a.rating - b.rating,
            },
            {
              title: 'Joined',
              dataIndex: 'joinedAt',
              key: 'joinedAt',
            },
          ];

          return (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-6 p-6"
            >
              <h1
                className={`text-2xl font-bold ${
                  darkMode ? 'text-dark-primary' : 'text-light-primary'
                }`}
              >
                Technicians Management
              </h1>
              <StatsCard stats={technicianStats} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <PieChartComponent
                  data={specializationData}
                  dataKey="value"
                  nameKey="name"
                  containerProps={{
                    title: 'Technician Specialization',
                    description: 'Distribution of technicians by specialization',
                  }}
                  darkMode={darkMode}
                />

                <ColumnChartComponent
                  data={ratingData}
                  xKey="rating"
                  columns={[{ key: 'count', name: 'Technician Count' }]}
                  containerProps={{
                    title: 'Technician Rating Distribution',
                    description: 'Number of technicians by rounded rating',
                  }}
                  darkMode={darkMode}
                />
              </div>

              <div className="mb-6">
                <BarChartComponent
                  data={performanceData}
                  yKey="name"
                  bars={[
                    { key: 'completed', name: 'Completed Repairs' },
                    { key: 'rating', name: 'Rating' },
                  ]}
                  containerProps={{
                    title: 'Technician Performance',
                    description: 'Performance metrics per technician',
                  }}
                  darkMode={darkMode}
                />
              </div>

              {/* New Chart: Repair Comparison */}
              <div className="mb-6">
                <AreaChartComponent
                  data={repairComparisonData}
                  xKey="name"
                  areas={[
                    { key: 'ongoing', name: 'Ongoing Requests' },
                    { key: 'completed', name: 'Completed Requests' },
                  ]}
                  containerProps={{
                    title: 'Repair Requests Comparison',
                    description:
                      'Comparison between technicians with their completed and ongoing repair requests',
                  }}
                  darkMode={darkMode}
                />
              </div>

              <div
                className={`bg-${darkMode ? 'dark' : 'light'}-surface-primary rounded-lg w-fit shadow-lg p-6`}
              >
                <TechniciansTable columns={columns} technicians={formattedTechnicians} />
              </div>
            </motion.div>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default Technicians;
