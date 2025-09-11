// Calendar Page
const CalendarPage = () => {
  const [currentDate] = useState(new Date());
  const [events] = useState(mockEvents);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const days = getDaysInMonth(currentDate);
  const today = new Date().getDate();
  const isCurrentMonth = currentDate.getMonth() === new Date().getMonth() && 
                         currentDate.getFullYear() === new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Calendar</h1>
              <p className="text-gray-600">Plan your schedule and stay organized</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                {events.length} events
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{formatDate(currentDate)}</h2>
                <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-600 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="py-2">{day}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {days.map((day, index) => (
                    <div
                      key={index}
                      className={`aspect-square flex items-center justify-center text-sm rounded-lg transition-all duration-300 cursor-pointer ${
                        day
                          ? isCurrentMonth && day === today
                            ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold shadow-lg'
                            : 'hover:bg-blue-50 text-gray-700'
                          : ''
                      }`}
                    >
                      {day && (
                        <div className="relative">
                          {day}
                          {/* Event indicator */}
                          {events.some(event => new Date(event.date).getDate() === day) && (
                            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-orange-400 rounded-full"></div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Events Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaCalendarCheck className="mr-2 text-purple-500" />
                Upcoming Events
              </h3>
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-l-4 border-purple-500">
                    <h4 className="font-medium text-gray-800">{event.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{event.date} at {event.time}</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                      event.type === 'meeting' ? 'bg-blue-100 text-blue-600' :
                      event.type === 'deadline' ? 'bg-red-100 text-red-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {event.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <FaPlus className="mr-2" />
                  Add Event
                </button>
                <button className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white p-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <FaCalendarAlt className="mr-2" />
                  View Week
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage