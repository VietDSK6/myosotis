import React from 'react';
import { AlertMessage, LoadingSpinner } from '../components';

interface DashboardAccountPanelProps {
  isLoadingUserData: boolean;
  isEditing: boolean;
  isSaving: boolean;
  userDataError: string | null;
  successMessage: string | null;
  formData: {
    fullName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: string;
    address: string;
    city: string;
    hometown: string;
    country: string;
    medicalNotes: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSave: () => void;
  handleCancel: () => void;
  setIsEditing: (editing: boolean) => void;
}

export const DashboardAccountPanel: React.FC<DashboardAccountPanelProps> = ({
  isLoadingUserData,
  isEditing,
  isSaving,
  userDataError,
  successMessage,
  formData,
  handleInputChange,
  handleSave,
  handleCancel,
  setIsEditing,
}) => (
  <div>
    {isLoadingUserData ? (
      <div className="flex items-center justify-center py-6">
        <LoadingSpinner text="Loading personal information..." />
      </div>
    ) : (
      <div className="bg-white rounded-3xl shadow-lg px-8 lg:px-12 pb-8">
        <div className="flex justify-end items-center mb-8">
          {!isEditing ? (
            <button
              onClick={() => {
                setIsEditing(true);
              }}
              className="min-h-12 px-6 py-2 bg-[#5A6DD0] text-white text-lg font-medium rounded-xl hover:bg-[#0927bc] transition-all focus:outline-none focus:ring-4 focus:ring-cyan-300"
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
                className="min-h-12 px-6 py-2 bg-[#5A6DD0] text-white text-lg font-medium rounded-xl hover:bg-[#182c8f] transition-all focus:outline-none focus:ring-4 focus:ring-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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

        {userDataError && (
          <AlertMessage
            type="error"
            message={userDataError}
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
    )}
  </div>
);
