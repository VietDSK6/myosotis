import { useState, useEffect } from 'react';
import type { LifeEvent, LifeEventInput } from '../types/memory';

interface LifeEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: LifeEventInput) => void;
  event?: LifeEvent | null;
}

export default function LifeEventModal({ isOpen, onClose, onSave, event }: LifeEventModalProps) {
  const [formData, setFormData] = useState<LifeEventInput>({
    event_title: '',
    event_date: '',
    description: '',
    image_url: '',
    image_caption: '',
  });

  useEffect(() => {
    if (event) {
      setFormData({
        event_title: event.event_title,
        event_date: event.event_date,
        description: event.description,
        image_url: event.image_url || '',
        image_caption: event.image_caption || '',
      });
    } else {
      setFormData({
        event_title: '',
        event_date: '',
        description: '',
        image_url: '',
        image_caption: '',
      });
    }
  }, [event, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.event_title.trim() && formData.event_date && formData.description.trim()) {
      onSave(formData);
      onClose();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      
      
      const reader = new FileReader();
      reader.onload = () => {
        setFormData(prev => ({
          ...prev,
          image_url: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
        
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                  <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-4">
                    {event ? 'Edit Memory' : 'Add New Memory'}
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="event_title" className="block text-sm font-medium text-gray-700 mb-1">
                        Title *
                      </label>
                      <input
                        type="text"
                        id="event_title"
                        value={formData.event_title}
                        onChange={(e) => setFormData(prev => ({ ...prev, event_title: e.target.value }))}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                        placeholder="Enter event title..."
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="event_date" className="block text-sm font-medium text-gray-700 mb-1">
                        Date *
                      </label>
                      <input
                        type="date"
                        id="event_date"
                        value={formData.event_date}
                        onChange={(e) => setFormData(prev => ({ ...prev, event_date: e.target.value }))}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description *
                      </label>
                      <textarea
                        id="description"
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                        placeholder="Tell us about this memory..."
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                        Photo
                      </label>
                      <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                      />
                      {formData.image_url && (
                        <div className="mt-2">
                          <img
                            src={formData.image_url}
                            alt="Preview"
                            className="h-20 w-20 rounded-md object-cover"
                          />
                        </div>
                      )}
                    </div>

                    {formData.image_url && (
                      <div>
                        <label htmlFor="image_caption" className="block text-sm font-medium text-gray-700 mb-1">
                          Photo Caption
                        </label>
                        <input
                          type="text"
                          id="image_caption"
                          value={formData.image_caption}
                          onChange={(e) => setFormData(prev => ({ ...prev, image_caption: e.target.value }))}
                          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                          placeholder="Add a caption for this photo..."
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="submit"
                className="inline-flex w-full justify-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 sm:ml-3 sm:w-auto"
              >
                {event ? 'Update' : 'Add'} Memory
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
