import React from 'react';

const CMSOnboardingArchitecture: React.FC = () => (
  <div className="p-4">
    <h1 className="text-xl font-bold">CMS Onboarding & Magnifier Math</h1>
    <p>Denna fil dokumenterar den framtida ombyggnaden av guiden från en platt "Wizard" till ett CMS-drivet Story-format.</p>
    <ul className="list-disc ml-4">
      <li><strong>Datamodell (Hierarkisk):</strong> Guide -> Slides -> Blocks. En slide kan ha 1, 2 eller 3 kvadratiska (1:1) block i en responsiv CSS Grid (som tvingas till 1 kolumn på mobil).</li>
      <li><strong>Visuellt Gränssnitt:</strong> "Story"-streck i toppen för navigering (istället för siffror), samt stora, osynliga touch-zoner (&lt; &gt;) längs skärmens kanter för swipe/klick-bläddring.</li>
      <li><strong>Crop & Masking:</strong> Originalbilder (16:9) maskeras in i 1:1-kvadrater via CSS background-position istället för att beskäras fysiskt, för att bevara responsiviteten.</li>
      <li><strong>Matematik (Ray-Ellipse Intersection):</strong> Magnifier-motorn ritar sikte och glas som ellipser. Linjen mellan dem beräknas med trigonometrisk strål-korsning för att aldrig krascha vid fönsteromstorlek, skyddad av "debounce" och "null-checks".</li>
      <li><strong>In-Place Editor:</strong> Redigering sker genom att klicka på en penn-ikon som öppnar en "Takeover Modal" över skärmen, vilket skyddar CSS-griden från att gå sönder av redigeringsverktygen (sliders).</li>
    </ul>
  </div>
);

export default CMSOnboardingArchitecture;
