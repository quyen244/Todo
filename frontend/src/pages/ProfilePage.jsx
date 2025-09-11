
// Profile Page
const ProfilePage = () => {
  const [user] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    joinDate: "January 2024",
    avatar: "AJ",
    tasksCompleted: 156,
    currentStreak: 12,
    totalPoints: 2340
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Profile</h1>
              <p className="text-gray-600">Manage your account and preferences</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
}
export default ProfilePage;