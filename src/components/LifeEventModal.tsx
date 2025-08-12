import { useState, useEffect } from 'react';
import type { LifeEvent, LifeEventInput } from '../types/memory';

interface LifeEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: LifeEventInput, file?: File) => void;
  event?: LifeEvent | null;
}

export default function LifeEventModal({ isOpen, onClose, onSave, event }: LifeEventModalProps) {
  const [formData, setFormData] = useState<LifeEventInput>({
    title: '',
    type: 'text',
    description: '',
    file_path: '',
    start_time: '',
    end_time: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        type: event.type,
        description: event.description,
        file_path: event.file_path || '',
        start_time: event.start_time,
        end_time: event.end_time || '',
      });
      if (event.file_path && event.type === 'image') {
        setPreviewUrl(event.file_path);
      }
    } else {
      setFormData({
        title: '',
        type: 'text',
        description: '',
        file_path: '',
        start_time: '',
        end_time: '',
      });
      setPreviewUrl('');
      setSelectedFile(null);
    }
  }, [event, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim() && formData.start_time && formData.description.trim()) {
      onSave(formData, selectedFile || undefined);
      onClose();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      
      
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
        
        
        setFormData(prev => ({
          ...prev,
          type: 'image',
        }));
      } else if (file.type.startsWith('video/')) {
        setFormData(prev => ({
          ...prev,
          type: 'video',
        }));
        setPreviewUrl('');
      } else if (file.type.startsWith('audio/')) {
        setFormData(prev => ({
          ...prev,
          type: 'audio',
        }));
        setPreviewUrl('');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
        
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-6 pb-6 pt-8 sm:p-8 sm:pb-6">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                  <h3 className="text-2xl font-bold leading-8 text-gray-900 mb-6">
                    {event ? 'Edit Memory' : 'Add New Memory'}
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="title" className="block text-lg font-semibold text-gray-700 mb-2">
                        Title *
                      </label>
                      <input
                        type="text"
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-lg focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-200"
                        placeholder="Enter event title..."
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="type" className="block text-lg font-semibold text-gray-700 mb-2">
                        Type *
                      </label>
                      <select
                        id="type"
                        value={formData.type}
                        onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as 'image' | 'text' | 'video' | 'audio' }))}
                        className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-lg focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-200"
                        required
                      >
                        <option value="text">Text</option>
                        <option value="image">Image</option>
                        <option value="video">Video</option>
                        <option value="audio">Audio</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="start_time" className="block text-lg font-semibold text-gray-700 mb-2">
                        Start Date *
                      </label>
                      <input
                        type="date"
                        id="start_time"
                        value={formData.start_time}
                        onChange={(e) => setFormData(prev => ({ ...prev, start_time: e.target.value }))}
                        className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-lg focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-200"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="end_time" className="block text-lg font-semibold text-gray-700 mb-2">
                        End Date
                      </label>
                      <input
                        type="date"
                        id="end_time"
                        value={formData.end_time}
                        onChange={(e) => setFormData(prev => ({ ...prev, end_time: e.target.value }))}
                        className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-lg focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-200"
                      />
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-lg font-semibold text-gray-700 mb-2">
                        Description *
                      </label>
                      <textarea
                        id="description"
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-lg focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-200"
                        placeholder="Tell us about this memory..."
                        required
                      />
                    </div>

                    {(formData.type === 'image' || formData.type === 'video' || formData.type === 'audio') && (
                      <div>
                        <label htmlFor="file" className="block text-lg font-semibold text-gray-700 mb-2">
                          {formData.type === 'image' ? 'Photo' : formData.type === 'video' ? 'Video' : 'Audio'}
                        </label>
                        <input
                          type="file"
                          id="file"
                          accept={
                            formData.type === 'image' ? 'image/*' : 
                            formData.type === 'video' ? 'video/*' : 
                            'audio/*'
                          }
                          onChange={handleFileUpload}
                          className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-lg focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-200"
                        />
                        {previewUrl && formData.type === 'image' && (
                          <div className="mt-3">
                            <img
                              src={previewUrl}
                              alt="Preview"
                              className="h-32 w-32 rounded-lg object-cover shadow-md"
                            />
                          </div>
                        )}
                        {selectedFile && formData.type !== 'image' && (
                          <div className="mt-3 text-lg text-gray-600 bg-gray-50 p-3 rounded-lg">
                            Selected: {selectedFile.name}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 px-6 py-6 sm:flex sm:flex-row-reverse sm:px-8">
              <button
                type="submit"
                className="inline-flex w-full justify-center rounded-lg bg-cyan-600 px-6 py-4 text-lg font-bold text-white shadow-lg hover:bg-cyan-500 transition-colors focus:outline-none focus:ring-4 focus:ring-cyan-300 sm:ml-4 sm:w-auto"
              >
                {event ? 'Update' : 'Add'} Memory
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-4 inline-flex w-full justify-center rounded-lg bg-white px-6 py-4 text-lg font-bold text-gray-900 shadow-md ring-2 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-4 focus:ring-gray-300 sm:mt-0 sm:w-auto"
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
