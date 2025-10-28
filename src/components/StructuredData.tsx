import { useEffect } from 'react';

export const StructuredData = () => {
  useEffect(() => {
    // Organization Schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://billigelektriker.dk",
      "name": "Billig Elektriker",
      "alternateName": "ASA ApS",
      "url": "https://billigelektriker.dk",
      "logo": "https://billigelektriker.dk/logo.png",
      "image": "https://billigelektriker.dk/hero-image.jpg",
      "description": "Professionel og billig elektriker i København. Certificerede elektrikere til installation, fejlfinding og smart home. Webshop med el-produkter som Philips Hue, IKEA Trådfri og smarte stikkontakter.",
      "priceRange": "$$",
      "telephone": "+4512345678",
      "email": "info@billigelektriker.dk",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Lyngby-Taarbæk",
        "addressRegion": "Hovedstaden",
        "addressCountry": "DK"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "55.770249",
        "longitude": "12.481379"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "08:00",
          "closes": "17:00"
        }
      ],
      "areaServed": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": "55.770249",
          "longitude": "12.481379"
        },
        "geoRadius": "50000"
      },
      "sameAs": [
        "https://www.facebook.com/billigelektriker",
        "https://www.instagram.com/billigelektriker",
        "https://www.youtube.com/@billigelektriker"
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "127"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "El-service og produkter",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "El-installation",
              "description": "Professionel installation af el-anlæg, stikkontakter og afbrydere"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Fejlfinding",
              "description": "Hurtig diagnosticering og reparation af el-fejl"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Smart Home Installation",
              "description": "Installation og opsætning af smart belysning og home automation"
            }
          }
        ]
      }
    };

    // WebSite Schema
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Billig Elektriker",
      "url": "https://billigelektriker.dk",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://billigelektriker.dk/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    };

    // Breadcrumb Schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Forside",
          "item": "https://billigelektriker.dk"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Webshop",
          "item": "https://billigelektriker.dk/#webshop"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Services",
          "item": "https://billigelektriker.dk/#services"
        }
      ]
    };

    // Insert schemas into head
    const script1 = document.createElement('script');
    script1.type = 'application/ld+json';
    script1.text = JSON.stringify(organizationSchema);
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.type = 'application/ld+json';
    script2.text = JSON.stringify(websiteSchema);
    document.head.appendChild(script2);

    const script3 = document.createElement('script');
    script3.type = 'application/ld+json';
    script3.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(script3);

    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
      document.head.removeChild(script3);
    };
  }, []);

  return null;
};
