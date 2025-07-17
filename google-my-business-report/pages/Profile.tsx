
import React, { useState, useEffect } from 'react';
import type { BusinessDataHook, BusinessProfile } from '../types';
import Spinner from '../components/Spinner';

interface ProfileProps {
  businessData: BusinessDataHook;
}

const Profile: React.FC<ProfileProps> = ({ businessData }) => {
  const { profile, updateProfile } = businessData;
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<BusinessProfile | null>(profile);

  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  if (!profile || !formData) {
    return (
        <div className="flex justify-center items-center h-full">
            <Spinner size="lg" />
        </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => prev ? ({ ...prev, [name]: value }) : null);
  };

  const handleSave = () => {
    if (formData) {
        updateProfile(formData);
    }
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  const renderField = (label: string, name: keyof BusinessProfile, value: string) => (
    <div>
        <label className="block text-sm font-medium text-on-muted">{label}</label>
        {isEditing ? (
            <input
                type="text"
                name={name}
                value={value}
                onChange={handleInputChange}
                className="mt-1 block w-full bg-muted border-slate-600 rounded-md shadow-sm py-2 px-3 text-on-surface focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
        ) : (
            <p className="mt-1 text-on-surface">{value}</p>
        )}
    </div>
  );

  return (
    <div className="bg-surface p-6 sm:p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-on-surface">Business Profile</h2>
        {!isEditing && (
            <button onClick={() => setIsEditing(true)} className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700">
                Edit Profile
            </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderField('Business Name', 'name', formData.name)}
        {renderField('Category', 'category', formData.category)}
        {renderField('Address', 'address', formData.address)}
        {renderField('Phone Number', 'phone', formData.phone)}
        {renderField('Website', 'website', formData.website)}
      </div>

       <div className="mt-8">
        <h3 className="text-lg font-medium text-on-surface">Business Hours</h3>
        <div className="mt-4 space-y-2">
            {profile.hours.map(h => (
                <div key={h.day} className="flex justify-between text-sm">
                    <span className="text-on-muted">{h.day}</span>
                    <span className="text-on-surface font-medium">{h.time}</span>
                </div>
            ))}
        </div>
      </div>
      
      {isEditing && (
        <div className="mt-8 flex justify-end gap-3">
          <button onClick={handleCancel} className="px-4 py-2 text-sm font-medium text-on-muted bg-muted rounded-md hover:bg-slate-600">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
