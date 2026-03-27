import React from 'react';

const SaaSMultiTenancyTranslation: React.FC = () => (
  <div className="p-4">
    <h1 className="text-xl font-bold">SaaS Multi-Tenancy & JIT Översättning</h1>
    <p>Denna fil definierar plattformens skalbarhet, användarmedverkan och globalisering.</p>
    <ul className="list-disc ml-4">
      <li><strong>Crowdsourcing (Drafts):</strong> Om en icke-admin föreslår en ändring i guiden, skrivs inte originalet över. Ändringen sparas i en suggestions-kollektion för godkännande av admin.</li>
      <li><strong>Global vs. Lokal Guide:</strong> Huvudguiden för att hämta nycklar ägs av systemet (global). Lokala församlingar kan endast bygga "Pre-roll" eller "Post-roll" slides, de får inte injicera steg mitt i säkerhetsflödet.</li>
      <li><strong>JIT (Just-In-Time) Översättning:</strong> När ett okänt språk efterfrågas översätts appens gränssnitt och guide en gång av Netlify BFF i bakgrunden. Detta görs alltid med Systemets Master-nyckel, för att skydda databasens skrivrättigheter. Resultatet sparas i Firestore (translations/&#123;lang&#125;).</li>
      <li><strong>BYOK för Driften:</strong> Användarens egna API-nycklar används uteslutande för den tunga, kontinuerliga driften (ljudtolkning och transkription i rummet), aldrig för plattformens UI-översättning.</li>
    </ul>
  </div>
);

export default SaaSMultiTenancyTranslation;
