import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../features/auth/store';
import { getUserInfo, updateUserInfo } from '../api/user';
import type { UserData } from '../types/user';

export const PersonalInfoPage: React.FC = () => {
  const { user } = useAuthStore();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    medicalNotes: ''
  });

  useEffect(() => {
    fetchUserData();
  }, [user?.id]);

  const fetchUserData = async () => {
    if (!user?.id) {
      setError('User ID not found');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await getUserInfo(user.id);
      setUserData(response.data);
      
      
      setFormData({
        fullName: response.data.profile?.full_name || '',
        email: response.data.email || '',
        phone: response.data.phone || '',
        dateOfBirth: response.data.profile?.date_of_birth || '',
        gender: response.data.profile?.gender || '',
        address: response.data.profile?.address || '',
        medicalNotes: ''
      });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user information');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    if (!user?.id) return;

    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      
      const payload = {
        phone: formData.phone,
        email: formData.email,
        profile: {
          full_name: formData.fullName,
          date_of_birth: formData.dateOfBirth,
          gender: formData.gender,
          address: formData.address,
        }
      };

      console.log('Sending payload:', payload);
      await updateUserInfo(user.id, payload);
      
      
      await fetchUserData();
      setIsEditing(false);
      setSuccessMessage('Personal information updated successfully!');
      
      
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save personal information');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (userData) {
      setFormData({
        fullName: userData.profile?.full_name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        dateOfBirth: userData.profile?.date_of_birth || '',
        gender: userData.profile?.gender || '',
        address: userData.profile?.address || '',
        medicalNotes: ''
      });
    }
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cyan-50 antialiased text-[18px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading personal information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyan-50 antialiased text-[18px]">
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Link to="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div className="text-xl font-semibold text-gray-900">
                  Myosotis
                </div>
              </Link>
            </div>
            <Link 
              to="/dashboard"
              className="min-h-12 px-6 py-2 text-lg font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-all focus:outline-none focus:ring-4 focus:ring-gray-300"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 lg:px-8 lg:py-12">
        <div className="bg-white rounded-3xl shadow-lg p-8 lg:p-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-semibold text-gray-900">
              Personal Information
            </h1>
            {!isEditing ? (
              <button
                onClick={() => {
                  setIsEditing(true);
                  setError(null);
                  setSuccessMessage(null);
                }}
                className="min-h-12 px-6 py-2 bg-cyan-600 text-white text-lg font-medium rounded-xl hover:bg-cyan-700 transition-all focus:outline-none focus:ring-4 focus:ring-cyan-300"
              >
                Edit Information
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="min-h-12 px-6 py-2 text-lg font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-all focus:outline-none focus:ring-4 focus:ring-gray-300 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="min-h-12 px-6 py-2 bg-cyan-600 text-white text-lg font-medium rounded-xl hover:bg-cyan-700 transition-all focus:outline-none focus:ring-4 focus:ring-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSaving ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-lg text-red-800">{error}</p>
              </div>
            </div>
          )}

          {successMessage && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-lg text-green-800">{successMessage}</p>
              </div>
            </div>
          )}

          <div className="space-y-8">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full min-h-12 px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:ring-4 focus:ring-cyan-200 outline-none transition-all"
                />
              ) : (
                <div className="w-full min-h-12 px-4 py-3 text-lg bg-gray-50 rounded-xl flex items-center">
                  {formData.fullName || 'Not provided'}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full min-h-12 px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:ring-4 focus:ring-cyan-200 outline-none transition-all"
                  />
                ) : (
                  <div className="w-full min-h-12 px-4 py-3 text-lg bg-gray-50 rounded-xl flex items-center">
                    {formData.email || 'Not provided'}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full min-h-12 px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:ring-4 focus:ring-cyan-200 outline-none transition-all"
                  />
                ) : (
                  <div className="w-full min-h-12 px-4 py-3 text-lg bg-gray-50 rounded-xl flex items-center">
                    {formData.phone || 'Not provided'}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full min-h-12 px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:ring-4 focus:ring-cyan-200 outline-none transition-all"
                  />
                ) : (
                  <div className="w-full min-h-12 px-4 py-3 text-lg bg-gray-50 rounded-xl flex items-center">
                    {formData.dateOfBirth || 'Not provided'}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Gender
                </label>
                {isEditing ? (
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full min-h-12 px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:ring-4 focus:ring-cyan-200 outline-none transition-all"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                ) : (
                  <div className="w-full min-h-12 px-4 py-3 text-lg bg-gray-50 rounded-xl flex items-center">
                    {formData.gender ? formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1) : 'Not provided'}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Address
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full min-h-12 px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:ring-4 focus:ring-cyan-200 outline-none transition-all"
                />
              ) : (
                <div className="w-full min-h-12 px-4 py-3 text-lg bg-gray-50 rounded-xl flex items-center">
                  {formData.address || 'Not provided'}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
