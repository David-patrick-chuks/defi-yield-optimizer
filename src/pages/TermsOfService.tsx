
import MainLayout from "@/components/layout/MainLayout";

const TermsOfService = () => {
  return (
    <MainLayout>
      <div className="safe-container py-12">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 mb-6">
          <h1 className="text-3xl font-bold text-slate-800 mb-6">Terms of Service</h1>
          
          <div className="prose max-w-none text-slate-600">
            <p className="mb-4">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
            
            <h2 className="text-xl font-semibold text-slate-800 mt-6 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using SafeSage ("the Service"), you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use the Service.
            </p>
            
            <h2 className="text-xl font-semibold text-slate-800 mt-6 mb-3">2. Description of Service</h2>
            <p>
              SafeSage provides AI-powered analytics and risk assessment for cryptocurrency portfolios. Our analysis is for 
              informational purposes only and should not be considered financial advice.
            </p>
            
            <h2 className="text-xl font-semibold text-slate-800 mt-6 mb-3">3. User Accounts</h2>
            <p>
              To use certain features of the Service, you may need to connect your wallet. You are responsible for maintaining 
              the security of your wallet and agree not to share access with others.
            </p>
            
            <h2 className="text-xl font-semibold text-slate-800 mt-6 mb-3">4. Data Usage</h2>
            <p>
              We collect information about your portfolio to provide our services. This data is used only for analysis purposes 
              and to improve our services. We do not sell your data to third parties.
            </p>
            
            <h2 className="text-xl font-semibold text-slate-800 mt-6 mb-3">5. Prohibited Activities</h2>
            <p>Users agree not to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Use the Service for illegal purposes</li>
              <li>Attempt to gain unauthorized access to the Service</li>
              <li>Use the Service to manipulate markets or engage in fraudulent activities</li>
              <li>Interfere with other users' access to the Service</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-slate-800 mt-6 mb-3">6. Disclaimers</h2>
            <p>
              THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DO NOT GUARANTEE THE ACCURACY OF OUR ANALYSIS.
              CRYPTOCURRENCY INVESTMENTS CARRY HIGH RISK. DO NOT INVEST BASED SOLELY ON OUR RECOMMENDATIONS.
            </p>
            
            <h2 className="text-xl font-semibold text-slate-800 mt-6 mb-3">7. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, SAFESAGE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, 
              CONSEQUENTIAL, OR PUNITIVE DAMAGES RESULTING FROM YOUR USE OF OR INABILITY TO USE THE SERVICE.
            </p>
            
            <h2 className="text-xl font-semibold text-slate-800 mt-6 mb-3">8. Changes to Terms</h2>
            <p>
              We reserve the right to update these Terms of Service at any time. Continued use of the Service after changes 
              constitutes acceptance of the new terms.
            </p>
            
            <h2 className="text-xl font-semibold text-slate-800 mt-6 mb-3">9. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which the 
              company operates, without regard to its conflict of law provisions.
            </p>
            
            <h2 className="text-xl font-semibold text-slate-800 mt-6 mb-3">10. Contact</h2>
            <p>
              For questions about these Terms, please contact us at support@safesage.com.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TermsOfService;
