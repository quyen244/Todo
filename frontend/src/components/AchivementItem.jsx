
export const AchievementItem = ({ icon, title, description, earned }) => (
  <div className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 ${
    earned ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50 border border-gray-200'
  }`}>
    <div className={`p-3 rounded-lg ${earned ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-200 text-gray-400'}`}>
      {icon}
    </div>
    <div className="flex-1">
      <h4 className={`font-medium ${earned ? 'text-gray-800' : 'text-gray-500'}`}>{title}</h4>
      <p className={`text-sm ${earned ? 'text-gray-600' : 'text-gray-400'}`}>{description}</p>
    </div>
    {earned && <FaCheck className="text-green-500" />}
  </div>
);