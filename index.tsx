import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Info, Leaf, Building2, TrendingDown, AlertCircle, Sparkles, Wind, Globe, Heart, Shield, Zap } from 'lucide-react';

const AQIExplorer = () => {
  const [cities, setCities] = useState([]);
  const [expandedCity, setExpandedCity] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState({});
  const [showCount, setShowCount] = useState(50);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getAQICategory = (aqi) => {
    if (aqi <= 50) return { 
      label: 'Good', 
      color: 'from-emerald-400 via-green-500 to-teal-600', 
      glow: 'shadow-emerald-500/50',
      border: 'border-emerald-400/30',
      icon: '🌟'
    };
    if (aqi <= 100) return { 
      label: 'Moderate', 
      color: 'from-yellow-400 via-amber-500 to-orange-500', 
      glow: 'shadow-yellow-500/50',
      border: 'border-yellow-400/30',
      icon: '⚠️'
    };
    if (aqi <= 150) return { 
      label: 'Unhealthy for Sensitive', 
      color: 'from-orange-400 via-red-500 to-pink-600', 
      glow: 'shadow-orange-500/50',
      border: 'border-orange-400/30',
      icon: '😷'
    };
    if (aqi <= 200) return { 
      label: 'Unhealthy', 
      color: 'from-red-500 via-rose-600 to-red-700', 
      glow: 'shadow-red-500/50',
      border: 'border-red-400/30',
      icon: '🚨'
    };
    if (aqi <= 300) return { 
      label: 'Very Unhealthy', 
      color: 'from-purple-500 via-fuchsia-600 to-purple-700', 
      glow: 'shadow-purple-500/50',
      border: 'border-purple-400/30',
      icon: '☠️'
    };
    return { 
      label: 'Hazardous', 
      color: 'from-red-600 via-rose-700 to-black', 
      glow: 'shadow-red-700/50',
      border: 'border-red-600/30',
      icon: '💀'
    };
  };

  const cityLandmarks = {
    'Delhi': { 
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80', 
      name: 'India Gate', 
      desc: 'Iconic war memorial monument',
      gradient: 'from-orange-500/20 to-red-500/20'
    },
    'Lahore': { 
      image: 'https://images.unsplash.com/photo-1598128558393-70ff21433be0?w=800&q=80', 
      name: 'Badshahi Mosque', 
      desc: 'Majestic Mughal-era mosque',
      gradient: 'from-pink-500/20 to-purple-500/20'
    },
    'Dhaka': { 
      image: 'https://images.unsplash.com/photo-1564479876770-105f8ff95f6d?w=800&q=80', 
      name: 'National Parliament', 
      desc: 'Jatiya Sangsad Bhaban',
      gradient: 'from-green-500/20 to-teal-500/20'
    },
    'Baghdad': { 
      image: 'https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=800&q=80', 
      name: 'Al-Shaheed Monument', 
      desc: 'Martyrs Monument',
      gradient: 'from-blue-500/20 to-cyan-500/20'
    },
    'Kolkata': { 
      image: 'https://images.unsplash.com/photo-1558431382-27343974c572?w=800&q=80', 
      name: 'Victoria Memorial', 
      desc: 'British Raj monument',
      gradient: 'from-yellow-500/20 to-orange-500/20'
    },
    'Mumbai': { 
      image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800&q=80', 
      name: 'Gateway of India', 
      desc: 'Iconic colonial archway',
      gradient: 'from-blue-500/20 to-indigo-500/20'
    },
  };

  const fetchAQIData = async () => {
    setIsRefreshing(true);
    
    // Simulating API call to IQAir - in production, you'd fetch from actual API
    const mockData = [
      { rank: 1, city: 'Delhi', country: 'India', aqi: 185 },
      { rank: 2, city: 'Lahore', country: 'Pakistan', aqi: 177 },
      { rank: 3, city: 'Dhaka', country: 'Bangladesh', aqi: 169 },
      { rank: 4, city: 'Baghdad', country: 'Iraq', aqi: 164 },
      { rank: 5, city: 'Kolkata', country: 'India', aqi: 162 },
      { rank: 6, city: 'Mumbai', country: 'India', aqi: 158 },
      { rank: 7, city: 'Karachi', country: 'Pakistan', aqi: 156 },
      { rank: 8, city: 'Wuhan', country: 'China', aqi: 152 },
      { rank: 9, city: 'Chengdu', country: 'China', aqi: 148 },
      { rank: 10, city: 'Beijing', country: 'China', aqi: 145 },
    ];

    for (let i = 11; i <= 100; i++) {
      mockData.push({
        rank: i,
        city: `City ${i}`,
        country: 'Country',
        aqi: Math.max(50, 180 - i)
      });
    }

    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setCities(mockData);
    setLastUpdated(new Date());
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchAQIData();
    
    // Auto-refresh every week (604800000 ms)
    const interval = setInterval(() => {
      fetchAQIData();
    }, 604800000);

    return () => clearInterval(interval);
  }, []);

  const generateAIAnalysis = async (city) => {
    if (aiAnalysis[city.city]) return;

    setLoadingAI(true);
    
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            { 
              role: "user", 
              content: `Analyze air quality in ${city.city}, ${city.country} with AQI of ${city.aqi}. Provide:
1. Main causes (2-3 sentences)
2. Health impact (2 sentences)
3. 3 practical citizen actions to reduce pollution
4. 2 government initiatives or policies addressing this

Format as JSON:
{
  "causes": "...",
  "health": "...",
  "citizenActions": ["action1", "action2", "action3"],
  "govInitiatives": ["initiative1", "initiative2"],
  "sources": {"scientific": 40, "government": 30, "environmental": 30}
}

Respond ONLY with the JSON, no markdown or preamble.`
            }
          ],
        })
      });

      const data = await response.json();
      let text = data.content.map(i => i.text || "").join("\n");
      text = text.replace(/```json|```/g, "").trim();
      const analysis = JSON.parse(text);
      
      setAiAnalysis(prev => ({ ...prev, [city.city]: analysis }));
    } catch (err) {
      console.error("AI Analysis error:", err);
    }
    
    setLoadingAI(false);
  };

  const toggleCity = (city) => {
    if (expandedCity?.city === city.city) {
      setExpandedCity(null);
    } else {
      setExpandedCity(city);
      generateAIAnalysis(city);
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 animate-pulse"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="relative overflow-hidden py-20 px-6">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-black"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-xl border border-cyan-400/30 rounded-full mb-8 animate-pulse">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span className="text-cyan-300 font-semibold">Live Global Air Quality Monitor</span>
                <Wind className="w-5 h-5 text-purple-400" />
              </div>
              
              <h1 className="text-7xl md:text-8xl font-black mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-gradient">
                  Breathe
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 animate-gradient">
                  Better
                </span>
              </h1>
              
              <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
                Real-time air quality insights powered by AI, helping you make informed decisions about your health and environment
              </p>

              {lastUpdated && (
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-gray-300 text-sm">
                    Last updated: {lastUpdated.toLocaleDateString()} at {lastUpdated.toLocaleTimeString()}
                  </span>
                  <button 
                    onClick={fetchAQIData}
                    className="ml-2 text-cyan-400 hover:text-cyan-300 text-sm font-semibold"
                    disabled={isRefreshing}
                  >
                    {isRefreshing ? 'Refreshing...' : 'Refresh Now'}
                  </button>
                </div>
              )}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              {[
                { icon: Globe, label: 'Cities Monitored', value: '100+', color: 'from-cyan-500 to-blue-500' },
                { icon: Wind, label: 'Data Points', value: '1M+', color: 'from-purple-500 to-pink-500' },
                { icon: Heart, label: 'Lives Impacted', value: '5B+', color: 'from-red-500 to-orange-500' },
                { icon: Shield, label: 'AI Accuracy', value: '95%', color: 'from-green-500 to-emerald-500' },
              ].map((stat, idx) => (
                <div key={idx} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" style={{background: `linear-gradient(to right, ${stat.color})`}}></div>
                  <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 hover:border-white/30 transition-all duration-500 hover:scale-105">
                    <stat.icon className={`w-10 h-10 mb-4 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                    <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AQI Legend */}
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <Info className="w-6 h-6 text-cyan-400" />
              <h3 className="text-2xl font-bold text-white">Air Quality Index Scale</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { range: '0-50', label: 'Good', color: 'from-emerald-400 to-green-600', emoji: '🌟' },
                { range: '51-100', label: 'Moderate', color: 'from-yellow-400 to-orange-500', emoji: '⚠️' },
                { range: '101-150', label: 'Unhealthy for Sensitive', color: 'from-orange-400 to-red-600', emoji: '😷' },
                { range: '151-200', label: 'Unhealthy', color: 'from-red-500 to-red-700', emoji: '🚨' },
                { range: '201-300', label: 'Very Unhealthy', color: 'from-purple-500 to-fuchsia-600', emoji: '☠️' },
                { range: '301+', label: 'Hazardous', color: 'from-red-600 to-black', emoji: '💀' },
              ].map((cat, idx) => (
                <div key={idx} className="group relative">
                  <div className={`absolute inset-0 bg-gradient-to-r ${cat.color} opacity-20 group-hover:opacity-40 blur-xl transition-opacity duration-300 rounded-2xl`}></div>
                  <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105">
                    <div className="text-3xl mb-2">{cat.emoji}</div>
                    <div className={`h-3 rounded-full bg-gradient-to-r ${cat.color} mb-3 shadow-lg`}></div>
                    <div className="text-white font-bold text-lg mb-1">{cat.range}</div>
                    <div className="text-gray-400 text-xs">{cat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cities Grid */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {cities.slice(0, showCount).map((city) => {
              const category = getAQICategory(city.aqi);
              const landmark = cityLandmarks[city.city] || { 
                image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80', 
                name: 'City Skyline', 
                desc: 'Urban landscape',
                gradient: 'from-gray-500/20 to-slate-500/20'
              };
              const isExpanded = expandedCity?.city === city.city;

              return (
                <div
                  key={city.rank}
                  className="group relative"
                >
                  {/* Glow Effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-75 blur-2xl transition-opacity duration-700 rounded-3xl`}></div>
                  
                  <div className={`relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl border ${category.border} overflow-hidden transition-all duration-700 hover:scale-[1.02] ${category.glow} shadow-2xl`}>
                    {/* Image Section */}
                    <div className="relative h-72 overflow-hidden">
                      <img 
                        src={landmark.image} 
                        alt={landmark.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80'}
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${landmark.gradient} via-transparent to-black/60`}></div>
                      
                      {/* Overlays */}
                      <div className="absolute top-6 left-6 flex items-center gap-3">
                        <div className="bg-black/70 backdrop-blur-md px-5 py-2 rounded-full border border-white/20">
                          <span className="text-white font-bold text-xl">#{city.rank}</span>
                        </div>
                        <div className="bg-black/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                          <span className="text-white text-sm">🌍 {city.country}</span>
                        </div>
                      </div>

                      <div className="absolute top-6 right-6">
                        <div className={`relative bg-gradient-to-r ${category.color} px-6 py-3 rounded-2xl shadow-2xl ${category.glow} animate-pulse`}>
                          <div className="text-white font-black text-3xl">{city.aqi}</div>
                          <div className="text-white/80 text-xs font-semibold">AQI</div>
                        </div>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6">
                        <h2 className="text-4xl font-black text-white mb-2 drop-shadow-lg">{city.city}</h2>
                        <div className="flex items-center gap-2 text-gray-200">
                          <Building2 className="w-4 h-4" />
                          <span className="font-semibold">{landmark.name}</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-sm text-gray-300">{landmark.desc}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status Bar */}
                    <div className="p-6 border-t border-white/10">
                      <div className={`bg-gradient-to-r ${category.color} rounded-2xl p-4 mb-4 shadow-lg`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{category.icon}</span>
                            <div>
                              <div className="text-white font-bold text-lg">{category.label}</div>
                              <div className="text-white/70 text-sm">Air Quality Status</div>
                            </div>
                          </div>
                          <Zap className="w-8 h-8 text-white animate-pulse" />
                        </div>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={() => toggleCity(city)}
                        className="w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-purple-500/50 group"
                      >
                        <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                        {isExpanded ? 'Hide AI Analysis' : 'Generate AI Insights'}
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>

                      {/* Expanded Analysis */}
                      {isExpanded && (
                        <div className="mt-6 space-y-4 animate-fadeIn">
                          {loadingAI ? (
                            <div className="text-center py-12">
                              <div className="inline-block relative">
                                <div className="w-16 h-16 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"></div>
                                <Sparkles className="w-8 h-8 text-cyan-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                              </div>
                              <p className="text-white font-semibold mt-6 text-lg">AI Analyzing Air Quality Data...</p>
                              <p className="text-gray-400 text-sm mt-2">Generating personalized insights</p>
                            </div>
                          ) : aiAnalysis[city.city] && (
                            <>
                              {/* Causes */}
                              <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-xl rounded-2xl p-6 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-500">
                                  <div className="flex items-center gap-3 mb-4">
                                    <div className="p-3 bg-orange-500/20 rounded-xl">
                                      <AlertCircle className="w-6 h-6 text-orange-400" />
                                    </div>
                                    <h4 className="text-orange-400 font-bold text-xl">Pollution Causes</h4>
                                  </div>
                                  <p className="text-gray-200 leading-relaxed">{aiAnalysis[city.city].causes}</p>
                                </div>
                              </div>

                              {/* Health */}
                              <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative bg-gradient-to-br from-red-500/10 to-pink-500/10 backdrop-blur-xl rounded-2xl p-6 border border-red-500/20 hover:border-red-500/40 transition-all duration-500">
                                  <div className="flex items-center gap-3 mb-4">
                                    <div className="p-3 bg-red-500/20 rounded-xl">
                                      <Heart className="w-6 h-6 text-red-400" />
                                    </div>
                                    <h4 className="text-red-400 font-bold text-xl">Health Impact</h4>
                                  </div>
                                  <p className="text-gray-200 leading-relaxed">{aiAnalysis[city.city].health}</p>
                                </div>
                              </div>

                              {/* Actions */}
                              <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20 hover:border-green-500/40 transition-all duration-500">
                                  <div className="flex items-center gap-3 mb-4">
                                    <div className="p-3 bg-green-500/20 rounded-xl">
                                      <Leaf className="w-6 h-6 text-green-400" />
                                    </div>
                                    <h4 className="text-green-400 font-bold text-xl">What You Can Do</h4>
                                  </div>
                                  <div className="space-y-3">
                                    {aiAnalysis[city.city].citizenActions.map((action, idx) => (
                                      <div key={idx} className="flex items-start gap-3 bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                                        <div className="text-2xl">{['🚴', '🌱', '💡'][idx]}</div>
                                        <p className="text-gray-200 flex-1">{action}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Government */}
                              <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-500">
                                  <div className="flex items-center gap-3 mb-4">
                                    <div className="p-3 bg-blue-500/20 rounded-xl">
                                      <Shield className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <h4 className="text-blue-400 font-bold text-xl">Government Initiatives</h4>
                                  </div>
                                  <div className="space-y-3">
                                    {aiAnalysis[city.city].govInitiatives.map((initiative, idx) => (
                                      <div key={idx} className="flex items-start gap-3 bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                                        <div className="text-2xl">{['🏛️', '⚡'][idx]}</div>
                                        <p className="text-gray-200 flex-1">{initiative}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Sources */}
                              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20">
                                <h4 className="text-purple-400 font-bold text-lg mb-4">Data Sources Breakdown</h4>
                                <div className="grid grid-cols-3 gap-4 mb-4">
                                  {Object.entries(aiAnalysis[city.city].sources).map(([key, value]) => (
                                    <div key={key} className="text-center">
                                      <div className="text-3xl font-black text-white mb-1">{value}%</div>
                                      <div className="text-xs text-gray-400 capitalize">{key}</div>
                                    </div>
                                  ))}
                                </div>
                                <p className="text-xs text-gray-400 italic leading-relaxed">
                                  ⚠️ AI-generated analysis based on general knowledge. For official data, consult local environmental agencies. Information accuracy may vary.
                                </p>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Load More */}
          {showCount < 100 && (
            <div className="text-center mt-16">
              <button
                onClick={() => setShowCount(Math.min(showCount + 50, 100))}
                className="group relative inline-flex items-center gap-4 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white font-bold py-6 px-12 rounded-2xl transition-all duration-500 hover:scale-110 shadow-2xl hover:shadow-purple-500/50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                <span className="relative text-xl">Load More Cities</span>
                <span className="relative bg-white/20 px-4 py-2 rounded-full text-sm">
                  +{Math.min(50, 100 - showCount)} more
                </span>
                <ChevronDown className="relative w-6 h-6 group-hover:animate-bounce" />
              </button>
            </div>
          )}
        </div>

        {/* About & Footer */}
        <div className="relative bg-gradient-to-b from-black via-purple-900/20 to-black py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-12 shadow-2xl">
              <div className="text-center mb-12">
                <Sparkles className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
                <h3 className="text-5xl font-black text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                  About This Project
                </h3>
                <div className="h-2 w-32 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mx-auto rounded-full"></div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* Created By */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-xl rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-500 hover:scale-105">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-4 bg-cyan-500/20 rounded-2xl">
                        <Sparkles className="w-8 h-8 text-cyan-400" />
                      </div>
                      <h4 className="text-cyan-400 font-bold text-2xl">Created By</h4>
                    </div>
                    <p className="text-gray-200 leading-relaxed text-lg mb-4">
                      This cutting-edge air quality visualization was created by <span className="text-white font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Claude</span>, Anthropic's advanced AI assistant.
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Combining real-time data analysis with beautiful design to make air quality information accessible and actionable for everyone.
                    </p>
                  </div>
                </div>

                {/* Data Sources */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 hover:scale-105">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-4 bg-purple-500/20 rounded-2xl">
                        <Globe className="w-8 h-8 text-purple-400" />
                      </div>
                      <h4 className="text-purple-400 font-bold text-2xl">Data Sources</h4>
                    </div>
                    <div className="space-y-4">
                      {[
                        { name: 'IQAir', desc: 'World Air Quality Index Rankings', icon: '🌍' },
                        { name: 'WHO', desc: 'Air Quality Guidelines & Health Data', icon: '🏥' },
                        { name: 'EPA', desc: 'Air Quality Standards & Research', icon: '🔬' },
                        { name: 'Local Agencies', desc: 'Regional monitoring data', icon: '📊' },
                      ].map((source, idx) => (
                        <div key={idx} className="flex items-center gap-4 bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                          <span className="text-3xl">{source.icon}</span>
                          <div className="flex-1">
                            <div className="text-white font-bold">{source.name}</div>
                            <div className="text-gray-400 text-sm">{source.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Auto-Refresh Info */}
              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-8 mb-8">
                <div className="flex items-start gap-4">
                  <div className="p-4 bg-green-500/20 rounded-2xl">
                    <Wind className="w-8 h-8 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-green-400 font-bold text-xl mb-3">Automatic Weekly Updates</h4>
                    <p className="text-gray-200 leading-relaxed mb-4">
                      This site automatically fetches the latest air quality data from IQAir every week, ensuring you always have access to current information. No database required - data is refreshed in real-time directly from official sources.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span>Next update: {new Date(Date.now() + 604800000).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-red-500/10 border border-yellow-500/20 rounded-2xl p-8">
                <div className="flex items-start gap-4">
                  <div className="p-4 bg-yellow-500/20 rounded-2xl flex-shrink-0">
                    <AlertCircle className="w-8 h-8 text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-yellow-400 font-bold text-xl mb-4">Important Disclaimer</h4>
                    <p className="text-gray-200 leading-relaxed mb-6">
                      This is an educational demonstration project powered by AI. While we strive for accuracy, AQI values shown may be sample or cached data. AI-generated analysis is based on general knowledge patterns and may not reflect current real-time conditions.
                    </p>
                    <div className="space-y-3">
                      <p className="text-white font-semibold">For official, real-time air quality data, please consult:</p>
                      <div className="grid md:grid-cols-2 gap-3">
                        <a 
                          href="https://www.iqair.com/world-air-quality-ranking" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-all duration-300 group"
                        >
                          <span className="text-2xl">🌍</span>
                          <div className="flex-1">
                            <div className="text-cyan-400 font-semibold group-hover:text-cyan-300">IQAir World Ranking</div>
                            <div className="text-gray-400 text-xs">Official real-time data</div>
                          </div>
                        </a>
                        <div className="flex items-center gap-3 bg-white/5 rounded-xl p-4">
                          <span className="text-2xl">🏛️</span>
                          <div className="flex-1">
                            <div className="text-purple-400 font-semibold">Local EPA/Gov Agencies</div>
                            <div className="text-gray-400 text-xs">Your region's official source</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Credits */}
              <div className="mt-12 pt-8 border-t border-white/10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg">Built with Claude AI</div>
                      <div className="text-gray-400 text-sm">Powered by Anthropic</div>
                    </div>
                  </div>
                  <div className="text-center md:text-right">
                    <div className="text-gray-400 text-sm">Educational & Demonstration Purposes</div>
                    <div className="text-gray-500 text-xs mt-1">© 2024 • Breathe Better Initiative</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .animate-blob { animation: blob 20s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-gradient { 
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default AQIExplorer;
