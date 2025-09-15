import React from 'react'

export default function HomePage() {
  return (
    <div className="min-h-screen w-full bg-white ">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-black text-amber-900 mb-6 leading-tight">
            Welcome to
            <span className="block bg-gradient-to-r from-amber-800 to-amber-900 bg-clip-text text-transparent">
              Easy Frontend
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-amber-800 mb-12 max-w-3xl mx-auto leading-relaxed">
            Build stunning web applications with ease. Modern tools, beautiful designs, and developer-friendly workflows.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Get Started
            </button>
            <button className="border-2 border-amber-800 text-amber-800 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-amber-800 hover:text-white transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="pt-32 pb-20 px-6  ">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-amber-900 text-center mb-16">
            Why Choose Easy Frontend?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 ">
            <div className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-600 to-amber-700 rounded-full flex items-center justify-center mb-6">
                <span className="text-white text-2xl font-bold">⚡</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Lightning Fast</h3>
              <p className="text-amber-800">Optimized performance and blazing fast load times for the best user experience.</p>
            </div>
            
            <div className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-600 to-amber-700 rounded-full flex items-center justify-center mb-6">
                <span className="text-white text-2xl font-bold">🎨</span>
              </div>
              <h3 className="text-2xl font-bold '  mb-4">Beautiful Design</h3>
              <p className="text-amber-800">Stunning, modern designs that captivate your users and enhance engagement.</p>
            </div>
            
            <div className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-600 to-amber-700 rounded-full flex items-center justify-center mb-6">
                <span className="text-white text-2xl font-bold">🚀</span>
              </div>
              <h3 className="text-2xl font-bold  mb-4">Easy to Use</h3>
              <p className="text-amber-800">Developer-friendly tools and intuitive workflows that accelerate development.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/30 backdrop-blur-sm rounded-3xl p-12 shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold   mb-6">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl text-amber-800 mb-8">
              Join thousands of developers who trust Easy Frontend for their projects.
            </p>
            <button className="bg-gradient-to-r from-amber-700 to-amber-800 text-white px-12 py-4 rounded-xl font-semibold text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Start Your Journey
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-white/40 backdrop-blur-sm p-6 rounded-xl">
              <h3 className="text-3xl font-bold   mb-2">10K+</h3>
              <p className="text-amber-800">Happy Developers</p>
            </div>
            <div className="bg-white/40 backdrop-blur-sm p-6 rounded-xl">
              <h3 className="text-3xl font-bold   mb-2">50K+</h3>
              <p className="text-amber-800">Projects Built</p>
            </div>
            <div className="bg-white/40 backdrop-blur-sm p-6 rounded-xl">
              <h3 className="text-3xl font-bold  mb-2">99.9%</h3>
              <p className="text-amber-800">Uptime</p>
            </div>
            <div className="bg-white/40 backdrop-blur-sm p-6 rounded-xl">
              <h3 className="text-3xl font-bold  mb-2">24/7</h3>
              <p className="text-amber-800">Support</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}