export const StatCard = ({ icon, title, value, color, bgColor }) => (
  <div className={`bg-gradient-to-br ${bgColor} rounded-2xl shadow-xl border border-white/50 p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
      </div>
      <div className={`bg-gradient-to-br ${color} text-white p-3 rounded-xl`}>
        {icon}
      </div>
    </div>
  </div>
);