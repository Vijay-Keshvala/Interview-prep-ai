import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BASE_URL, API_PATHS } from "../../utils/apiPath"; // adjust path as needed
import {
  Brain,
  BarChart3,
  Target,
  Trophy,
  Calendar,
  Clock,
  TrendingUp,
  Award,
  Play,
  Pause,
  RotateCcw,
  Settings,
  User,
  BookOpen,
  Mic,
  BarChart,
  ListChecks,
  Timer,
  Video,
  FileText,
  Star,
  ChevronRight,
  Plus,
  Filter,
  Search,
  Bell,
  Home
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/Layouts/DashboardLayout';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isRecording, setIsRecording] = useState(false);
  const [stats, setStats] = useState(null);
  const [skillProgress, setSkillProgress] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState();
  const [formData, setFormData] = useState({ name: "", email: "" })
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const iconMap = {
    trophy: Trophy,
    star: Star,
    award: Award,
    target: Target,
    bookopen: BookOpen, // lowercase key
    brain: Brain,
    clock: Clock,
    trendingup: TrendingUp,
    barChart: BarChart,
    listChecks: ListChecks,
    timer: Timer,
    // add more icons as needed
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // JWT from login
        const res = await fetch("http://localhost:8000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        if (res.ok) {
          setFormData({
            name: data.name,
            email: data.email,
          });
        } else {
          console.error("Error fetching profile:", data.message);
        }
      } catch (err) {
        console.error("Fetch profile failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Load profile data

  // Load profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(`${BASE_URL}${API_PATHS.AUTH.GET_PROFILE}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (res.ok && data.user) {
          setFormData({
            name: data.user.name || "",
            email: data.user.email || "",
          });
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, []);


  // Input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save only name
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}${API_PATHS.AUTH.UPDATE_PROFILE}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: formData.name }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Name updated successfully 🎉");
      } else {
        toast.error(data.message || "Failed to update name ❌");
      }
    } catch (err) {
      toast.error("Something went wrong ⚠️");
      console.error("Save failed:", err);
    }
  };



  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // redirect to index page if no token
      return;
    } const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        } else {
          navigate("/"); // redirect if token invalid
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        navigate("/");
      }
    };

    fetchProfile();
  }, [navigate]);

  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // JWT from login
        if (!token) return;

        const res = await fetch(`${BASE_URL}${API_PATHS.AUTH.GET_PROFILE}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        if (res.ok) {
          setUser(data); // dynamic user from MongoDB
        } else {
          console.error("Error:", data.message);
        }
      } catch (err) {
        console.error("Fetch profile failed", err);
      }
    };

    fetchProfile();
  }, []);


  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token || !user?._id) return; // skip if no user

        const res = await fetch(`http://localhost:8000/api/skills/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch skills");
        const data = await res.json();
        setSkillProgress(data);
      } catch (err) {
        console.error("Error fetching skills:", err);
      }
    };

    fetchSkills();
  }, [user]);




  // const stats = [
  //   {
  //     title: 'Total Sessions',
  //     value: '47',
  //     change: '+12%',
  //     icon: Target,
  //     color: 'bg-blue-50 text-blue-600'
  //   },
  //   {
  //     title: 'Average Score',
  //     value: '8.4',
  //     change: '+0.8',
  //     icon: Trophy,
  //     color: 'bg-green-50 text-green-600'
  //   },
  //   {
  //     title: 'Hours Practiced',
  //     value: '23.5',
  //     change: '+5.2h',
  //     icon: Clock,
  //     color: 'bg-purple-50 text-purple-600'
  //   },
  //   {
  //     title: 'Confidence Level',
  //     value: '87%',
  //     change: '+15%',
  //     icon: TrendingUp,
  //     color: 'bg-orange-50 text-orange-600'
  //   }
  // ];

  const recentSessions = [
    {
      id: 1,
      type: 'Technical Interview',
      company: 'Google',
      score: 8.7,
      duration: '45 min',
      date: '2 hours ago',
      status: 'completed'
    },
    {
      id: 2,
      type: 'Behavioral Interview',
      company: 'Apple',
      score: 9.2,
      duration: '30 min',
      date: '1 day ago',
      status: 'completed'
    },
    {
      id: 3,
      type: 'System Design',
      company: 'Microsoft',
      score: 7.8,
      duration: '60 min',
      date: '2 days ago',
      status: 'completed'
    }
  ];

  const upcomingSessions = [
    {
      id: 1,
      type: 'Mock Interview',
      company: 'Amazon',
      time: '2:00 PM',
      date: 'Today',
      interviewer: 'AI Assistant'
    },
    {
      id: 2,
      type: 'Technical Deep Dive',
      company: 'Meta',
      time: '10:00 AM',
      date: 'Tomorrow',
      interviewer: 'Senior Engineer AI'
    }
  ];

  // const skillProgress = [
  //   { skill: 'Communication', progress: 85, color: 'bg-blue-500' },
  //   { skill: 'Technical Knowledge', progress: 78, color: 'bg-green-500' },
  //   { skill: 'Problem Solving', progress: 92, color: 'bg-purple-500' },
  //   { skill: 'Leadership', progress: 67, color: 'bg-orange-500' },
  //   { skill: 'Cultural Fit', progress: 89, color: 'bg-pink-500' }
  // ];

  // const achievements = [
  //   { title: 'First Perfect Score', icon: Trophy, date: '3 days ago', color: 'text-yellow-600' },
  //   { title: '10 Sessions Milestone', icon: Target, date: '1 week ago', color: 'text-blue-600' },
  //   { title: 'Confidence Boost', icon: TrendingUp, date: '2 weeks ago', color: 'text-green-600' },
  //   { title: 'Quick Learner', icon: Brain, date: '3 weeks ago', color: 'text-purple-600' }
  // ];

  const handleStartSession = () => {
    setIsRecording(!isRecording);
  };




  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(`${BASE_URL}${API_PATHS.SESSION.GET_ALL}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (res.ok) {
          setSessions(data); // API response (all sessions)
        } else {
          console.error("Error fetching sessions:", data.message);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchSessions();
  }, []);

  // filter by role/company/etc
  const filteredSessions = sessions.filter(
    (s) =>
      s.role?.toLowerCase().includes(search.toLowerCase()) ||
      s.topicsToFocus?.toLowerCase().includes(search.toLowerCase())
  );


  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/interviews/stats", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ JWT token
          },
        });
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };

    fetchStats();
  }, []);


  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/achievements/${user?._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await res.json();
        setAchievements(data);
      } catch (err) {
        console.error("Error fetching achievements:", err);
      }
    };

    if (user?._id) {
      fetchAchievements();
    }
  }, [user]);

  // useEffect(() => {
  //   axios.get("http://localhost:8000/api/skills")
  //     .then((res) => setSkillProgress(res.data))
  //     .catch((err) => console.error("Error fetching skills:", err));
  // }, []);

  if (!stats) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-500">Loading stats...</p>
      </div>
    );
  }

  const statsArray = [
    {
      title: "Total Sessions",
      value: stats.totalSessions,
      change: "+12%",
      icon: BarChart,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Average Score",
      value: stats.avgScore,
      change: "+5%",
      icon: ListChecks,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Avg Time / Q",
      value: `${stats.avgTimePerQuestion}s`,
      change: "-3%",
      icon: Timer,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Total Time Spent",
      value: `${Math.round(stats.totalTimeSpent / 60)} mins`,
      change: "+8%",
      icon: Clock,
      color: "bg-red-100 text-red-600",
    },
  ];


  if (!stats) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-500">Loading stats...</p>
      </div>
    );
  }





  return (
    <DashboardLayout>

      <div className="min-h-screen bg-gray-50 mt-20">
        {/* Header */}

        < div className="max-w-7xl mx-auto px-6 py-8" >
          <div className="flex gap-8">
            {/* Sidebar */}
            <div className="w-64 flex-shrink-0">
              <nav className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'overview'
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    <Home className="w-5 h-5" />
                    <span className="font-medium">Overview</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('sessions')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'sessions'
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    <Play className="w-5 h-5" />
                    <span className="font-medium">Sessions</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('analytics')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'analytics'
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    <BarChart3 className="w-5 h-5" />
                    <span className="font-medium">Analytics</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('progress')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'progress'
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    <TrendingUp className="w-5 h-5" />
                    <span className="font-medium">Progress</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('library')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'library'
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    <BookOpen className="w-5 h-5" />
                    <span className="font-medium">Library</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'settings'
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">Settings</span>
                  </button>
                </div>
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  {/* Welcome Section */}
                  <div className="bg-gradient-to-r from-black to-gray-800 rounded-2xl p-8 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-3xl font-light mb-2">
                          {user ? `Welcome back, ${user.name}` : "Loading..."}
                        </h2>
                        <p className="text-gray-300 text-lg">
                          Ready to master your next interview?
                        </p>
                      </div>

                    </div>
                  </div>


                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statsArray.map((stat, index) => {
                      const Icon = stat.icon;
                      return (
                        <div
                          key={index}
                          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div
                              className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}
                            >
                              <Icon className="w-6 h-6" />
                            </div>
                            <span className="text-sm font-medium text-green-600">
                              {stat.change}
                            </span>
                          </div>
                          <h3 className="text-2xl font-light text-gray-900 mb-1">
                            {stat.value}
                          </h3>
                          <p className="text-gray-500 text-sm">{stat.title}</p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Recent Sessions & Upcoming */}
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Recent Sessions */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
                      <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-medium text-gray-900">Recent Sessions</h3>
                          <button onClick={() => setActiveTab('sessions')} className='cursor-pointer' >View All</button>
                        </div>
                      </div>

                      <div className="p-6 space-y-4">
                        {filteredSessions.length > 0 ? (
                          filteredSessions
                            .slice(0, 5) // 👈 only show latest 5 sessions
                            .map((s) => (
                              <div
                                key={s._id}
                                onClick={() => navigate(`/interview-prep/${s._id}`)}
                                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors"
                              >
                                {/* Left */}
                                <div className="flex items-center space-x-4">
                                  <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                                    <span className="text-white font-medium text-sm">
                                      {s.role ? s.role[0].toUpperCase() : "S"}
                                    </span>
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-gray-900 text-base">
                                      {s.role || "Interview"}
                                    </h4>
                                    <p className="text-sm text-gray-500">
                                      {s.experience || "-"} yrs • {s.topicsToFocus || "General"}
                                    </p>
                                  </div>
                                </div>

                                {/* Right */}
                                <div className="text-right">
                                  <div className="text-lg font-medium text-gray-900">
                                    {s.questions?.length || 0}
                                  </div>
                                  <div className="text-sm text-gray-500">Questions</div>
                                </div>
                              </div>
                            ))
                        ) : (
                          <p className="text-gray-500 text-center py-4">No recent sessions found.</p>
                        )}
                      </div>
                    </div>


                    {/* Upcoming Sessions */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
                      <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-medium text-gray-900">Upcoming Sessions</h3>
                          <button className="flex items-center space-x-1 text-sm text-black hover:text-gray-700">
                            <Plus className="w-4 h-4" />
                            <span>Schedule</span>
                          </button>
                        </div>
                      </div>
                      <div className="p-6 space-y-4">
                        {upcomingSessions.map((session) => (
                          <div key={session.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-gray-600" />
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">{session.type}</h4>
                                <p className="text-sm text-gray-500">{session.company} • {session.interviewer}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium text-gray-900">{session.time}</div>
                              <div className="text-sm text-gray-500">{session.date}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Skills Progress */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                      <h3 className="text-xl font-medium text-gray-900">Skill Development</h3>
                    </div>
                    <div className="p-6">
                      <div className="space-y-6">
                        {skillProgress.map((skill, index) => (
                          <div key={index} className="flex items-center space-x-6">
                            <div className="w-32 text-right">
                              <span className="font-medium text-gray-900">{skill.skill}</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between mb-2">
                                <span className="text-sm text-gray-500">Progress</span>
                                <span className="text-sm font-medium text-gray-900">{skill.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                  className={`${skill.color} h-3 rounded-full transition-all duration-1000`}
                                  style={{ width: `${skill.progress}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}

                      </div>
                    </div>
                  </div>

                  {/* Recent Achievements */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                      <h3 className="text-xl font-medium text-gray-900">Recent Achievements</h3>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {achievements.slice(0, 4).map((achievement, index) => {
                          const Icon = iconMap[achievement.icon?.toLowerCase()]; // normalize icon name
                          return (
                            <div
                              key={achievement._id || index}
                              className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl"
                            >
                              <div className={`w-10 h-10 bg-white rounded-lg flex items-center justify-center ${achievement.color}`}>
                                {Icon && <Icon className="w-5 h-5" />}
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                                <p className="text-sm text-gray-500">{achievement.date}</p>
                              </div>
                            </div>
                          );
                        })}


                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'sessions' && (
                <div className="space-y-8">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-light text-gray-900">Practice Sessions</h2>
                    <button
                      className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors flex items-center space-x-2"
                      onClick={() => navigate("/sessions/create")} // or open modal
                    >
                      <Plus className="w-5 h-5" />
                      <span>New Session</span>
                    </button>
                  </div>

                  {/* Sessions container */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    {/* Search + Filter */}
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="flex-1 relative">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search sessions..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                      </div>
                      <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Filter className="w-4 h-4" />
                        <span>Filter</span>
                      </button>
                    </div>

                    {/* Sessions list */}
                    <div className="space-y-4">
                      {filteredSessions.length > 0 ? (
                        filteredSessions.map((s) => (
                          <div
                            key={s._id}
                            onClick={() => navigate(`/interview-prep/${s._id}`)}
                            className="flex items-center justify-between p-6 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                          >
                            {/* Left */}
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                                <span className="text-white font-medium">
                                  {s.role ? s.role[0].toUpperCase() : "S"}
                                </span>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900 text-lg">
                                  {s.role || "Interview"}
                                </h4>
                                <p className="text-gray-500">
                                  {s.experience || "-"} yrs • {s.topicsToFocus || "General"}
                                </p>
                              </div>
                            </div>

                            {/* Right */}
                            <div className="flex items-center space-x-4">
                              <div className="text-right">
                                <div className="text-2xl font-light text-gray-900">
                                  {s.questions?.length || 0}
                                </div>
                                <div className="text-sm text-gray-500">Questions</div>
                              </div>
                              <ChevronRight className="w-5 h-5 text-gray-400" />
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 text-center py-4">
                          No sessions found.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'analytics' && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-light text-gray-900">Performance Analytics</h2>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                      <h3 className="text-xl font-medium text-gray-900 mb-6">Score Trends</h3>
                      <div className="h-64 flex items-center justify-center text-gray-500">
                        <div className="text-center">
                          <BarChart3 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                          <p>Chart visualization would go here</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                      <h3 className="text-xl font-medium text-gray-900 mb-6">Key Metrics</h3>
                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Avg Response Time</span>
                            <span className="font-medium">2.3s</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '76%' }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Clarity Score</span>
                            <span className="font-medium">8.7/10</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '87%' }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Confidence</span>
                            <span className="font-medium">87%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-purple-500 h-2 rounded-full" style={{ width: '87%' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'progress' && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-light text-gray-900">Learning Progress</h2>

                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                    <h3 className="text-xl font-medium text-gray-900 mb-8">Skill Development Overview</h3>
                    <div className="space-y-8">
                      {skillProgress.map((skill, index) => (
                        <div key={index} className="flex items-center space-x-6">
                          <div className="w-32 text-right">
                            <span className="font-medium text-gray-900">{skill.skill}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between mb-2">
                              <span className="text-sm text-gray-500">Progress</span>
                              <span className="text-sm font-medium text-gray-900">{skill.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div
                                className={`${skill.color} h-3 rounded-full transition-all duration-1000`}
                                style={{ width: `${skill.progress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'library' && (
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-light text-gray-900">Question Library</h2>
                    <button className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors">
                      Add Custom Question
                    </button>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="p-6 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                          <Brain className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="font-medium text-gray-900 mb-2">Technical Questions</h3>
                        <p className="text-gray-500 text-sm mb-4">Algorithm, data structures, system design</p>
                        <span className="text-sm text-blue-600 font-medium">247 questions</span>
                      </div>

                      <div className="p-6 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                          <User className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="font-medium text-gray-900 mb-2">Behavioral Questions</h3>
                        <p className="text-gray-500 text-sm mb-4">Leadership, teamwork, problem-solving</p>
                        <span className="text-sm text-green-600 font-medium">156 questions</span>
                      </div>

                      <div className="p-6 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                          <Target className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="font-medium text-gray-900 mb-2">Company Specific</h3>
                        <p className="text-gray-500 text-sm mb-4">FAANG, startups, enterprise</p>
                        <span className="text-sm text-purple-600 font-medium">89 questions</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-light text-gray-900">Settings</h2>

                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                          Profile Settings
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Full Name (editable) */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Full Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}        // ✅ value comes from state
                              onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                              }
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                            />
                          </div>

                          {/* Email (read-only) */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Email
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}      // ✅ show email
                              disabled                     // 👈 cannot edit
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                            />

                          </div>
                        </div>
                      </div>

                      {/* Save Button */}
                      <div className="pt-6 border-t border-gray-200">
                        <button
                          onClick={handleSave}
                          className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </ div>
      </div >
    </DashboardLayout >

  );
};

export default Dashboard;




// import React, { useEffect, useState } from 'react'
// import { LuPlus } from 'react-icons/lu'
// import { CARD_BAG } from '../../utils/data'
// import toast from 'react-hot-toast'
// import { useNavigate } from 'react-router-dom'
// import DashboardLayout from '../../components/Layouts/DashboardLayout'
// import axiosInstance from '../../utils/axiosInstance'
// import { API_PATHS } from '../../utils/apiPath'
// import SummaryCard from '../../components/Cards/SummaryCard'
// import moment from "moment"
// import CreateSessionForm from './CreateSessionForm'
// import Modal from '../../components/Modal'
// import DeleteAlertContent from '../../components/DeleteAlertContent'
// const Dashboard = () => {

//   const navigate = useNavigate()


//   const [openCreateModal, setOpenCreateModal] = useState(false)
//   const [session, setSession] = useState([])

//   const [openDeleteAlert, setOpenDeleteAlert] = useState({
//     open: false,
//     data: null,
//   });

//   const fetchAllSessions = async () => {
//     try {
//       const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
//       setSession(response.data);
//     } catch (error) {
//       console.log("Error fetching session data");
//     }

//   }

//   const deleteSession = async (sessionData) => {
//     try {
//       await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id));

//       toast.success("Session Deleted Successfully");
//       setOpenDeleteAlert({
//         open: false,
//         data: null,
//       });
//       fetchAllSessions()
//     } catch (error) {
//       console.log("Error deleting session data", error);
//     }
//   }

//   useEffect(() => {
//     fetchAllSessions();
//   }, [])
//   return (
//     <DashboardLayout>
//       <div className='container mx-auto pt-4 pb-4'>
//         <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0'>
//           {session?.map((data, index) => (
//             <SummaryCard
//               key={data._id}
//               colors={CARD_BAG[index % CARD_BAG.length]}
//               role={data?.role || ""}
//               topicsToFocus={data?.topicsToFocus || ""}
//               experience={data?.experience || "-"}
//               questions={data?.questions || "-"}
//               description={data?.description || ""}
//               lastUpdated={
//                 data?.updatedAt
//                   ? moment(data.updatedAt).format("D MM YYYY")
//                   : ""
//               }
//               onSelect={() => navigate(`/interview-prep/${data?._id}`)}
//               onDelete={() => setOpenDeleteAlert({ open: true, data })}
//             />
//           ))}
//         </div>
//         <button className='h-12 md:h-12 flex items-center justify-center gap-3 bg-linear-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer hover:shadow-2xl hover:shadow-orange-300 fixed bottom-10 md:bottom-20 right-10 md:right-20'
//           onClick={() => setOpenCreateModal(true)}>
//           <LuPlus className='text-2xl text-white' />
//           Add New
//         </button>
//       </div>
//       <Modal
//         isOpen={openCreateModal}
//         onClose={() => {
//           setOpenCreateModal(false);
//         }}
//         hideHeader
//       >
//         <div>
//           <CreateSessionForm />
//         </div>
//       </Modal>

//       <Modal isOpen={openDeleteAlert?.open}
//         onClose={() => {
//           setOpenDeleteAlert({ open: false, data: null })
//         }}
//         title="Delete Alert">
//         <div className='w-[30vw]'>
//           <DeleteAlertContent
//             content="Are you sure you want to delete this session?"
//             onDelete={() => deleteSession(openDeleteAlert.data)}
//           />
//         </div>
//       </Modal>

//     </DashboardLayout>
//   )
// }

// export default Dashboard
