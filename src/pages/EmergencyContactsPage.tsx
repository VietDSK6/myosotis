import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../features/auth/store';
import { getEmergencyContacts, createEmergencyContact, updateEmergencyContact, deleteEmergencyContact } from '../api/user';
import type { EmergencyContact, EmergencyContactPayload } from '../types/user';
import { EmergencyContactModal } from '../components/EmergencyContactModal';
import { ConfirmDeleteModal } from '../components/ConfirmDeleteModal';
import { PageHeader, LoadingSpinner } from '../components';

export const EmergencyContactsPage: React.FC = () => {
  const { user } = useAuthStore();
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<EmergencyContact | null>(null);
  const [deletingContact, setDeletingContact] = useState<EmergencyContact | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchUserInfo();
  }, [user?.id]);

  const fetchUserInfo = async () => {
    if (!user?.id) {
      setError('User ID not found');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await getEmergencyContacts(user.id);
      setEmergencyContacts(response.data || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch emergency contacts');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddContact = () => {
    setEditingContact(null);
    setIsModalOpen(true);
  };

  const handleEditContact = (contact: EmergencyContact) => {
    setEditingContact(contact);
    setIsModalOpen(true);
  };

  const handleDeleteContact = (contact: EmergencyContact) => {
    setDeletingContact(contact);
    setIsDeleteModalOpen(true);
  };

  const handleSaveContact = async (payload: EmergencyContactPayload) => {
    if (!user?.id) return;

    setIsSubmitting(true);
    try {
      if (editingContact) {
        await updateEmergencyContact(editingContact.id, payload);
      } else {
        await createEmergencyContact(user.id, payload);
      }
      await fetchUserInfo(); 
      setIsModalOpen(false);
      setEditingContact(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!user?.id || !deletingContact) return;

    setIsSubmitting(true);
    try {
      await deleteEmergencyContact(deletingContact.id);
      await fetchUserInfo(); 
      setIsDeleteModalOpen(false);
      setDeletingContact(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatRelation = (relation: string) => {
    return relation.charAt(0).toUpperCase() + relation.slice(1);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleEmail = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cyan-50 antialiased text-[18px] flex items-center justify-center">
        <LoadingSpinner text="Loading emergency contacts..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyan-50 antialiased text-[18px]">
      <PageHeader 
        title="Emergency Contacts"
        showBackButton={true}
        backTo="/dashboard"
      />

      <main className="max-w-5xl mx-auto px-6 py-8 lg:px-8 lg:py-12">
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

        {emergencyContacts.length === 0 && !error ? (
          <div className="bg-white rounded-3xl shadow-lg p-8 lg:p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">No emergency contacts found</h2>
            <p className="text-lg text-gray-600 mb-6">
              You don't have any emergency contacts set up yet. Consider adding important people who can help you in case of an emergency.
            </p>
            <button 
              onClick={handleAddContact}
              className="min-h-12 px-6 py-2 bg-cyan-600 text-white text-lg font-medium rounded-xl hover:bg-cyan-700 transition-all focus:outline-none focus:ring-4 focus:ring-cyan-300"
            >
              Add Emergency Contact
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {emergencyContacts.map((contact) => (
              <div key={contact.id} className="bg-white rounded-3xl shadow-lg p-8 lg:p-10">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-cyan-100 text-cyan-700 rounded-full flex items-center justify-center shrink-0">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-semibold text-gray-900">
                          {contact.contact_name}
                        </h3>
                        {contact.is_primary && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-cyan-100 text-cyan-800">
                            Primary Contact
                          </span>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span className="text-lg text-gray-600">{formatRelation(contact.relation)}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span className="text-lg text-gray-900 font-medium">{contact.phone}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span className="text-lg text-gray-600">{contact.email}</span>
                        </div>
                        
                        {contact.address && (
                          <div className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-lg text-gray-600">{contact.address}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-3">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Added on {formatDate(contact.created_at)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-row lg:flex-col gap-3 lg:shrink-0">
                    <button
                      onClick={() => handleCall(contact.phone)}
                      className="flex-1 lg:flex-none min-h-12 px-6 py-2 bg-cyan-600 text-white text-lg font-medium rounded-xl hover:bg-cyan-700 transition-all focus:outline-none focus:ring-4 focus:ring-cyan-300 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Call
                    </button>
                    
                    <button
                      onClick={() => handleEmail(contact.email)}
                      className="flex-1 lg:flex-none min-h-12 px-6 py-2 text-lg font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-all focus:outline-none focus:ring-4 focus:ring-gray-300 border border-gray-200 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email
                    </button>
                    
                    <button
                      onClick={() => handleEditContact(contact)}
                      className="flex-1 lg:flex-none min-h-12 px-6 py-2 text-lg font-medium text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50 rounded-xl transition-all focus:outline-none focus:ring-4 focus:ring-cyan-300 border border-cyan-200 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    
                    <button
                      onClick={() => handleDeleteContact(contact)}
                      className="flex-1 lg:flex-none min-h-12 px-6 py-2 text-lg font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all focus:outline-none focus:ring-4 focus:ring-red-300 border border-red-200 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="bg-white rounded-3xl shadow-lg p-8 lg:p-10 text-center border-2 border-dashed border-gray-200">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Add Another Contact</h3>
              <p className="text-lg text-gray-600 mb-4">
                Add more people who can help you in case of emergency
              </p>
              <button 
                onClick={handleAddContact}
                className="min-h-12 px-6 py-2 bg-gray-100 text-gray-700 text-lg font-medium rounded-xl hover:bg-gray-200 transition-all focus:outline-none focus:ring-4 focus:ring-gray-300"
              >
                Add Contact
              </button>
            </div>
          </div>
        )}
      </main>

      <EmergencyContactModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingContact(null);
        }}
        onSave={handleSaveContact}
        contact={editingContact}
        isLoading={isSubmitting}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingContact(null);
        }}
        onConfirm={handleConfirmDelete}
        contactName={deletingContact?.contact_name || ''}
        isLoading={isSubmitting}
      />
    </div>
  );
};
