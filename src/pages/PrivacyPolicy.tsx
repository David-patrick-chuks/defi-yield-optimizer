
import MainLayout from "@/components/layout/MainLayout";

const PrivacyPolicy = () => {
  return (
    <MainLayout>
      <div className="safe-container py-12">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 mb-6">
          <h1 className="text-3xl font-bold text-slate-800 mb-6">Privacy Policy</h1>
          
          <div className="prose max-w-none text-slate-600">
            <p className="mb-4">
              Last Updated: {new Date().toLocaleDateString()}
            </p>
            
            <h2 className="text-xl font-semibold text-slate-800 mt-6 mb-3">1. Introduction</h2>
            <p>
              SafeSage ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we 
              collect, use, disclose, and safeguard your information when you use our service.
            </p>
            
            <h2 className="text-xl font-semibold text-slate-800 mt-6 mb-3">2. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Wallet Information:</strong> Public wallet addresses connected to our service.</li>
              <li><strong>Portfolio Data:</strong> Token holdings and transaction history required for analysis.</li>
              <li><strong>Usage Data:</strong> Information about how you interact with our service.</li>
              <li><strong>Device Information:</strong> Browser type, IP address, and device identifiers.</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-slate-800 mt-6 mb-3">3. How We Use Your Information</h2>
            <p>We use the collected information for various purposes, including:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Providing and maintaining our Service</li>
              <li>Generating portfolio risk analysis</li>
              <li>Improving and personalizing user experience</li>
              <li>Monitoring usage of our Service</li>
              <li>Detecting and preventing fraudulent activities</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-slate-800 mt-6 mb-3">4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect against unauthorized access or alteration of your data.
              However, no internet transmission is completely secure, and we cannot guarantee absolute security.
            </p>
            
            <h2 className="text-xl font-semibold text-slate-800 mt-6 mb-3">5. Third-Party Services</h2>
            <p>
              We may use third-party services, such as analytics providers and blockchain data services, that collect, 
              monitor, and analyze information to help us improve our Service. These third parties have their own privacy policies.
            </p>
            
            <h2 className="text-xl font-semibold text-slate-800 mt-6 mb-3">6. AI and Data Processing</h2>
            <p>
              Our Service uses artificial intelligence to analyze portfolio risk. Data sent to our AI systems is processed 
              according to this privacy policy and is not used to train AI models without consent.
            </p>
            
            <h2 className="text-xl font-semibold text-slate-800 mt-6 mb-3">7. Your Rights</h2>
            <p>Depending on your location, you may have rights to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Access personal information we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to our processing of your data</li>
              <li>Data portability</li>
            </ul>
            
            <h2 className="text-xl font-semibold text-slate-800 mt-6 mb-3">8. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
              Privacy Policy on this page and updating the "Last Updated" date.
            </p>
            
            <h2 className="text-xl font-semibold text-slate-800 mt-6 mb-3">9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@safesage.com.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PrivacyPolicy;
