import React from 'react';

const EntryStrategiesDiscovery: React.FC = () => (
  <div className="p-4">
    <h1 className="text-xl font-bold">Inpassering & Discovery</h1>
    <p>Denna modul definierar hur användare hittar och ansluter till möten (rum), med fokus på friktionfri inpassering och integritet.</p>
    <ul className="list-disc pl-5 mt-2">
      <li><strong>QR-koder & Länkar:</strong> Appen stödjer inpassering via direktlänkar (t.ex. app.com/join/1234).</li>
      <li><strong>Manuell Pinkod:</strong> Huvudalternativ för de som saknar QR-läsare.</li>
      <li><strong>Rummens Integritet:</strong> Databasen för rum (rooms) har en visibility-flagga (public, unlisted, private).</li>
      <li><strong>Församlingslistor:</strong> Publik landningssida (app.com/utby) listar pågående möten (public).</li>
      <li><strong>Karta (Discovery):</strong> En kart-vy för att hitta församlingar, strikt separerad från Onboardingen.</li>
    </ul>
  </div>
);

export default EntryStrategiesDiscovery;
