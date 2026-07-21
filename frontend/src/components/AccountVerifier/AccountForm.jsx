import { useState } from 'react';
import { Loader2 } from 'lucide-react';

const platforms = [
  { id: 'twitter', name: 'Twitter/X' },
  { id: 'instagram', name: 'Instagram' },
  { id: 'linkedin', name: 'LinkedIn' },
  { id: 'facebook', name: 'Facebook' },
  { id: 'tiktok', name: 'TikTok' },
];

const AccountForm = ({ onVerify, isVerifying }) => {
  const [formData, setFormData] = useState({
    platform: 'twitter',
    username: '',
    followers: '',
    following: '',
    postCount: '',
    accountAgeDays: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onVerify(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-surface rounded-2xl border border-surface-light p-6 md:p-8">
      <h2 className="text-xl font-semibold text-white mb-6">Verify Social Account</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">Platform</label>
          <select
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            className="w-full bg-surface-dark border border-surface-light rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none"
          >
            {platforms.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">Username / Handle</label>
          <input
            type="text"
            name="username"
            required
            value={formData.username}
            onChange={handleChange}
            placeholder="@username"
            className="w-full bg-surface-dark border border-surface-light rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">Followers (Optional)</label>
          <input
            type="number"
            name="followers"
            value={formData.followers}
            onChange={handleChange}
            placeholder="e.g. 1500"
            className="w-full bg-surface-dark border border-surface-light rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-400">Following (Optional)</label>
          <input
            type="number"
            name="following"
            value={formData.following}
            onChange={handleChange}
            placeholder="e.g. 300"
            className="w-full bg-surface-dark border border-surface-light rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!formData.username || isVerifying}
          className={`
            flex items-center justify-center px-6 py-3 rounded-xl font-medium text-white transition-all
            ${!formData.username || isVerifying 
              ? 'bg-surface-light text-gray-400 cursor-not-allowed' 
              : 'bg-primary hover:bg-primary-light shadow-lg hover:shadow-primary/25'}
          `}
        >
          {isVerifying ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Verifying...
            </>
          ) : (
            'Verify Account'
          )}
        </button>
      </div>
    </form>
  );
};

export default AccountForm;
