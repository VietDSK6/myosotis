import React, { useState, useEffect } from 'react';
import type { EmergencyContact, EmergencyContactPayload } from '../types/user';

interface EmergencyContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (payload: EmergencyContactPayload) => Promise<void>;
  contact?: EmergencyContact | null;
  isLoading?: boolean;
}

export const EmergencyContactModal: React.FC<EmergencyContactModalProps> = ({
  isOpen,
  onClose,
  onSave,
  contact,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<EmergencyContactPayload>({
    contact_name: '',
    relation: '',
    phone: '',
    email: '',
    address: '',
    is_primary: false,
  });

  const [errors, setErrors] = useState<Partial<EmergencyContactPayload>>({});

  useEffect(() => {
    if (contact) {
      setFormData({
        contact_name: contact.contact_name,
        relation: contact.relation,
        phone: contact.phone,
        email: contact.email,
        address: contact.address,
        is_primary: contact.is_primary,
      });
    } else {
      setFormData({
        contact_name: '',
        relation: '',
        phone: '',
        email: '',
        address: '',
        is_primary: false,
      });
    }
    setErrors({});
  }, [contact, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    
    if (errors[name as keyof EmergencyContactPayload]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<EmergencyContactPayload> = {};

    if (!formData.contact_name.trim()) {
      newErrors.contact_name = 'Contact name is required';
    }

    if (!formData.relation.trim()) {
      newErrors.relation = 'Relation is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error saving contact:', error);
    }
  };

  const handleClose = () => {
    setFormData({
      contact_name: '',
      relation: '',
      phone: '',
      email: '',
      address: '',
      is_primary: false,
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold text-gray-900">
              {contact ? 'Edit Emergency Contact' : 'Add Emergency Contact'}
            </h2>
            <button
              onClick={handleClose}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors focus:outline-none focus:ring-4 focus:ring-gray-300"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Contact Name *
              </label>
              <input
                type="text"
                name="contact_name"
                value={formData.contact_name}
                onChange={handleInputChange}
                className={`w-full min-h-12 px-4 py-3 text-lg border-2 rounded-xl focus:ring-4 outline-none transition-all ${
                  errors.contact_name 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                    : 'border-gray-200 focus:border-cyan-500 focus:ring-cyan-200'
                }`}
                placeholder="Enter contact name"
              />
              {errors.contact_name && (
                <p className="mt-1 text-red-600">{errors.contact_name}</p>
              )}
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Relationship *
              </label>
              <select
                name="relation"
                value={formData.relation}
                onChange={handleInputChange}
                className={`w-full min-h-12 px-4 py-3 text-lg border-2 rounded-xl focus:ring-4 outline-none transition-all ${
                  errors.relation 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                    : 'border-gray-200 focus:border-cyan-500 focus:ring-cyan-200'
                }`}
              >
                <option value="">Select relationship</option>
                <option value="parent">Parent</option>
                <option value="spouse">Spouse</option>
                <option value="child">Child</option>
                <option value="sibling">Sibling</option>
                <option value="friend">Friend</option>
                <option value="caregiver">Caregiver</option>
                <option value="doctor">Doctor</option>
                <option value="other">Other</option>
              </select>
              {errors.relation && (
                <p className="mt-1 text-red-600">{errors.relation}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full min-h-12 px-4 py-3 text-lg border-2 rounded-xl focus:ring-4 outline-none transition-all ${
                    errors.phone 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                      : 'border-gray-200 focus:border-cyan-500 focus:ring-cyan-200'
                  }`}
                  placeholder="Enter phone number"
                />
                {errors.phone && (
                  <p className="mt-1 text-red-600">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full min-h-12 px-4 py-3 text-lg border-2 rounded-xl focus:ring-4 outline-none transition-all ${
                    errors.email 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                      : 'border-gray-200 focus:border-cyan-500 focus:ring-cyan-200'
                  }`}
                  placeholder="Enter email address"
                />
                {errors.email && (
                  <p className="mt-1 text-red-600">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Address *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={`w-full min-h-12 px-4 py-3 text-lg border-2 rounded-xl focus:ring-4 outline-none transition-all ${
                  errors.address 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                    : 'border-gray-200 focus:border-cyan-500 focus:ring-cyan-200'
                }`}
                placeholder="Enter address"
              />
              {errors.address && (
                <p className="mt-1 text-red-600">{errors.address}</p>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="is_primary"
                id="is_primary"
                checked={formData.is_primary}
                onChange={handleInputChange}
                className="w-5 h-5 text-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500 focus:ring-2"
              />
              <label htmlFor="is_primary" className="ml-3 text-lg text-gray-700">
                Set as primary emergency contact
              </label>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 min-h-12 px-6 py-2 text-lg font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-all focus:outline-none focus:ring-4 focus:ring-gray-300 border border-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 min-h-12 px-6 py-2 bg-cyan-600 text-white text-lg font-medium rounded-xl hover:bg-cyan-700 transition-all focus:outline-none focus:ring-4 focus:ring-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  contact ? 'Update Contact' : 'Add Contact'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
