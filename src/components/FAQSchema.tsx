import { useEffect } from 'react';

export const FAQSchema = () => {
  useEffect(() => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Hvad koster en elektriker i København?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Hos Billig Elektriker tilbyder vi konkurrencedygtige priser på alle el-installationer. Prisen afhænger af opgavens omfang. Kontakt os for et uforpligtende tilbud på din specifikke opgave. Vi er certificerede elektrikere med fair priser."
          }
        },
        {
          "@type": "Question",
          "name": "Er I certificerede elektrikere?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ja, alle vores elektrikere er fuldt certificerede og autoriserede. Vi overholder alle sikkerhedsregler og standarder for el-arbejde i Danmark. Du får altid professionelt håndværk med garanti."
          }
        },
        {
          "@type": "Question",
          "name": "Hvor hurtigt kan I komme ud?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Vi tilbyder hurtig responstid og kan ofte komme samme dag eller næste dag, afhængigt af opgavens karakter. Ved akutte el-problemer prioriterer vi altid hurtig udrykning for din sikkerhed."
          }
        },
        {
          "@type": "Question",
          "name": "Hvilke smart home produkter sælger I?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Vores webshop har et bredt udvalg af smart home produkter inklusiv Philips Hue, IKEA Trådfri, smarte stikkontakter, LED strips og meget mere. Vi tilbyder også installation af alle produkter vi sælger."
          }
        },
        {
          "@type": "Question",
          "name": "Tilbyder I garanti på arbejdet?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ja, alt vores arbejde er omfattet af håndværkergaranti. Vi står 100% bag vores arbejde og sørger for at alle installationer er udført korrekt og sikkert."
          }
        },
        {
          "@type": "Question",
          "name": "Kan I hjælpe med fejlfinding?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolut! Vi er specialister i fejlfinding og diagnosticering af el-problemer. Vores erfarne elektrikere kan hurtigt identificere og løse problemet, så du kan være tryg ved din el-installation."
          }
        },
        {
          "@type": "Question",
          "name": "Arbejder I i hele København?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Vi dækker København og omegn, primært med fokus på Lyngby-Taarbæk Kommune og omkringliggende områder. Kontakt os for at høre om vi dækker dit område."
          }
        },
        {
          "@type": "Question",
          "name": "Hvad er jeres åbningstider?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Vi holder åbent mandag til fredag fra 8-17. Weekend-aftaler kan laves efter individuel aftale. Kontakt os på telefon eller email for at booke tid."
          }
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
};
