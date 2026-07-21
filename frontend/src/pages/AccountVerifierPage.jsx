import { useState } from 'react';
import AccountForm from '../components/AccountVerifier/AccountForm';
import TrustScorePanel from '../components/TrustScore/TrustScorePanel';

const AccountVerifierPage = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState(null);

  const handleVerify = async (data) => {
    setIsVerifying(true);
    try {
      // Mock result
      setTimeout(() => {
        setResult({
          trust_score: 42,
          components: [
            { name: 'Profile Authenticity', score: 35, description: 'Profile picture appears stock/AI generated.' },
            { name: 'Network Analysis', score: 40, description: 'High ratio of bot-like followers.' },
            { name: 'Activity Patterns', score: 50, description: 'Irregular posting schedule.' }
          ]
        });
        setIsVerifying(false);
      }, 2500);
      
    } catch (error) {
      console.error("Verification failed", error);
      setIsVerifying(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Account Verifier</h1>
        <p className="text-gray-400">Verify social media accounts to detect impersonation and bots.</p>
      </div>

      <AccountForm onVerify={handleVerify} isVerifying={isVerifying} />

      {result && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <TrustScorePanel result={result} />
        </div>
      )}
    </div>
  );
};

export default AccountVerifierPage;
