// Progress Page
const ProgressPage = () => {
  const stats = {
    totalTasks: 45,
    completed: 32,
    pending: 13,
    productivity: 87,
    streak: 12
  };

  const completionRate = Math.round((stats.completed / stats.totalTasks) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Progress Dashboard</h1>
              <p className="text-gray-600">Track your productivity and achievements</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                {completionRate}% Complete
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-6">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<FaTasks />}
            title="Total Tasks"
            value={stats.totalTasks}
            color="from-blue-500 to-blue-600"
            bgColor="from-blue-50 to-blue-100"
          />
          <StatCard
            icon={<FaCheck />}
            title="Completed"
            value={stats.completed}
            color="from-green-500 to-green-600"
            bgColor="from-green-50 to-green-100"
          />
          <StatCard
            icon={<FaClock />}
            title="Pending"
            value={stats.pending}
            color="from-orange-500 to-orange-600"
            bgColor="from-orange-50 to-orange-100"
          />
          <StatCard
            icon={<FaFire />}
            title="Daily Streak"
            value={`${stats.streak} days`}
            color="from-red-500 to-red-600"
            bgColor="from-red-50 to-red-100"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Progress Chart */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <FaChartPie className="mr-2 text-green-500" />
              Task Completion
            </h3>
            <div className="relative w-48 h-48 mx-auto">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-gray-200"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={`${completionRate * 2.51} 251`}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800">{completionRate}%</div>
                  <div className="text-sm text-gray-600">Complete</div>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <FaTrophy className="mr-2 text-yellow-500" />
              Achievements
            </h3>
            <div className="space-y-4">
              <AchievementItem
                icon={<FaTarget />}
                title="Goal Achiever"
                description="Completed 30+ tasks this month"
                earned={true}
              />
              <AchievementItem
                icon={<FaFire />}
                title="Streak Master"
                description="Maintain a 10-day streak"
                earned={true}
              />
              <AchievementItem
                icon={<FaArrowUp />}
                title="Productivity Boost"
                description="Achieve 90% completion rate"
                earned={false}
              />
              <AchievementItem
                icon={<FaStar />}
                title="Task Champion"
                description="Complete 50 tasks"
                earned={false}
              />
            </div>
          </div>
        </div>

        {/* Weekly Overview */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Weekly Overview</h3>
          <div className="grid grid-cols-7 gap-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
              const height = Math.random() * 60 + 20; // Random height for demo
              return (
                <div key={day} className="text-center">
                  <div className="bg-gray-100 rounded-lg h-20 flex items-end justify-center mb-2">
                    <div
                      className="bg-gradient-to-t from-green-500 to-emerald-400 rounded w-8 transition-all duration-1000 ease-out"
                      style={{ height: `${height}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600">{day}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage