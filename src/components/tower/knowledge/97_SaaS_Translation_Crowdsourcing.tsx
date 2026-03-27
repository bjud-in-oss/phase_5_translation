import React from 'react';

const SaaSMultiTenancyTranslation: React.FC = () => (
  <div className="p-4">
    <h1 className="text-xl font-bold">SaaS Multi-Tenancy & JIT Översättning</h1>
    <p>Dokumentation för plattformens skalbarhet, användarmedverkan och globalisering.</p>
    <ul className="list-disc pl-5 mt-2">
      <li><strong>Crowdsourcing:</strong> Ändringar sparas i en suggestions-kollektion för admin-godkännande.</li>
      <li><strong>Global vs. Lokal Guide:</strong> Huvudguiden ägs av systemet, lokala församlingar kan bygga "Pre-roll" eller "Post-roll".</li>
      <li><strong>JIT (Just-In-Time) Översättning:</strong> Okända språk översätts av Netlify BFF med Systemets Master-nyckel, sparas i Firestore (translations/{lang}).</li>
      <li><strong>BYOK för Driften:</strong> Användarens egna API-nycklar används för ljudtolkning och transkription.</li>
    </ul>
  </div>
);

export default SaaSMultiTenancyTranslation;
