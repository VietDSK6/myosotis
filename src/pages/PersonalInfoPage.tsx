import React, { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '../features/auth/store';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getUserInfo, updateUserInfo } from '../api/user';
import type { UserData } from '../types/user';
import { PageHeader, LoadingSpinner, AlertMessage } from '../components';

export const PersonalInfoPage: React.FC = () => {
  const { user, updateUser } = useAuthStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(searchParams.get('edit') === 'true');
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    hometown: '',
    country: '',
    medicalNotes: ''
  });

  const fetchUserData = useCallback(async () => {
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
        city: response.data.profile?.city || '',
        hometown: response.data.profile?.hometown || '',
        country: response.data.profile?.country || '',
        medicalNotes: ''
      });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user information');
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

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
          city: formData.city,
          hometown: formData.hometown,
          country: formData.country,
        }
      };

      console.log('Sending payload:', payload);
      await updateUserInfo(user.id, payload);
      
      
      const freshUserData = await getUserInfo(user.id);
      setUserData(freshUserData.data);
      
      
      const updatedUser = {
        ...user,
        email: freshUserData.data.email,
        phone: freshUserData.data.phone,
        profile: {
          ...user.profile,
          id: freshUserData.data.profile?.id || user.profile?.id || user.id,
          user_id: user.id,
          full_name: freshUserData.data.profile?.full_name || '',
          date_of_birth: freshUserData.data.profile?.date_of_birth,
          gender: freshUserData.data.profile?.gender as 'male' | 'female' | undefined,
          phone: freshUserData.data.profile?.phone,
          address: freshUserData.data.profile?.address,
          city: freshUserData.data.profile?.city,
          hometown: freshUserData.data.profile?.hometown,
          country: freshUserData.data.profile?.country,
          avatar_url: freshUserData.data.profile?.avatar_url,
          created_at: user.profile?.created_at || new Date().toISOString(),
        }
      };
      updateUser(updatedUser);
      
      setIsEditing(false);
      setSuccessMessage('Personal information updated successfully!');
      
      
      
      if (searchParams.get('edit')) {
        navigate('/personal-info', { replace: true });
      }
      
      
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
        city: userData.profile?.city || '',
        hometown: userData.profile?.hometown || '',
        country: userData.profile?.country || '',
        medicalNotes: ''
      });
    }
    setIsEditing(false);
    
    // Replace the current URL to remove the edit query parameter
    // This prevents the back button from going back to edit mode
    if (searchParams.get('edit')) {
      navigate('/personal-info', { replace: true });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cyan-50 antialiased text-[18px] flex items-center justify-center">
        <LoadingSpinner text="Loading personal information..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyan-50 antialiased text-[18px]">
      <PageHeader 
        title="Personal Information"
        showBackButton={true}
        backTo="/dashboard"
      />

      <main className="max-w-4xl mx-auto px-6 py-8 lg:px-8 lg:py-12">
        {searchParams.get('edit') === 'true' && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Welcome to Myosotis!</h3>
                <p className="text-blue-800 leading-relaxed">
                  Please take a moment to complete your personal information. This helps us provide better personalized care and support.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-lg p-8 lg:p-12">
          <div className="flex justify-end items-center mb-8">
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
            <AlertMessage
              type="error"
              message={error}
            />
          )}

          {successMessage && (
            <AlertMessage
              type="success"
              message={successMessage}
            />
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Current City
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full min-h-12 px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:ring-4 focus:ring-cyan-200 outline-none transition-all"
                  />
                ) : (
                  <div className="w-full min-h-12 px-4 py-3 text-lg bg-gray-50 rounded-xl flex items-center">
                    {formData.city || 'Not provided'}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Hometown
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="hometown"
                    value={formData.hometown}
                    onChange={handleInputChange}
                    className="w-full min-h-12 px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:ring-4 focus:ring-cyan-200 outline-none transition-all"
                  />
                ) : (
                  <div className="w-full min-h-12 px-4 py-3 text-lg bg-gray-50 rounded-xl flex items-center">
                    {formData.hometown || 'Not provided'}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Country
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full min-h-12 px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:ring-4 focus:ring-cyan-200 outline-none transition-all"
                  />
                ) : (
                  <div className="w-full min-h-12 px-4 py-3 text-lg bg-gray-50 rounded-xl flex items-center">
                    {formData.country || 'Not provided'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
