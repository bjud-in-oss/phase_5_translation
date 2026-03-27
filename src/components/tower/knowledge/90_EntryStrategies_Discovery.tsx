import React from 'react';

const EntryStrategiesDiscovery: React.FC = () => (
  <div className="p-4">
    <h1 className="text-xl font-bold">Inpassering & Discovery</h1>
    <p>Denna fil definierar hur användare hittar och ansluter till möten (rum), med fokus på friktionfri inpassering och integritet.</p>
    <ul className="list-disc ml-4">
      <li><strong>QR-koder & Länkar (Primär Inpassering):</strong> Appen ska stödja inpassering via direktlänkar (t.ex. app.com/join/1234), vilka fysiskt kan skrivas ut som QR-koder i kyrksalen. Om användaren skannar med mobilens kamera-app, gårvas de direkt in i rummet.</li>
      <li><strong>Manuell Pinkod (Fallback):</strong> En stor textruta på startsidan förblir huvudalternativet för de som saknar QR-läsare, för att undvika skrämmande kamera-rättighets-popups direkt vid sidladdning. Kamera-skanning via webbläsaren erbjuds endast via ett explicit knapptryck.</li>
      <li><strong>Rummens Integritet (Visibility):</strong> Databasen för rum (rooms) utökas med en visibility-flagga (public, unlisted, private).</li>
      <li><strong>Församlingslistor:</strong> Varje organisation (församling) får en publik landningssida (app.com/utby) som listar pågående möten, men endast de som är markerade som public.</li>
      <li><strong>Karta (Discovery):</strong> En specifik flik ("Hitta församling") erbjuder en kart-vy. Denna är strikt separerad från den snabba Onboardingen för att inte störa användare som redan är på plats och bara vill ansluta snabbt.</li>
    </ul>
  </div>
);

export default EntryStrategiesDiscovery;
