import React from 'react';

const CMSOnboardingArchitecture: React.FC = () => (
  <div className="p-4">
    <h1 className="text-xl font-bold">CMS Onboarding & Magnifier Math</h1>
    <p>Dokumentation för ombyggnaden av guiden från en platt "Wizard" till ett CMS-drivet Story-format.</p>
    <ul className="list-disc pl-5 mt-2">
      <li><strong>Datamodell:</strong> Guide -> Slides -> Blocks (1, 2 eller 3 kvadratiska block).</li>
      <li><strong>Visuellt Gränssnitt:</strong> "Story"-streck för navigering, touch-zoner för swipe/klick.</li>
      <li><strong>Crop & Masking:</strong> 16:9-bilder maskeras till 1:1 via CSS background-position.</li>
      <li><strong>Matematik:</strong> Magnifier-motorn ritar sikte/glas som ellipser, beräknar linjer med trigonometrisk strål-korsning.</li>
      <li><strong>In-Place Editor:</strong> Penn-ikon öppnar "Takeover Modal" för redigering.</li>
    </ul>
  </div>
);

export default CMSOnboardingArchitecture;
