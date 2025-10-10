export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://lejellabsmedia.com/#organization",
        "name": "Lejel Labs Media",
        "url": "https://lejellabsmedia.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://lejellabsmedia.com/lejel-labs-logo-white.png",
          "width": 250,
          "height": 60
        },
        "sameAs": [
          "https://www.instagram.com/lejel.shopping/",
          "https://www.tiktok.com/@lejel.shopping",
          "https://www.youtube.com/@lejelhomeshopping"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+62-822-4290-8154",
          "contactType": "Customer Service",
          "areaServed": "ID",
          "availableLanguage": ["Indonesian"]
        }
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://lejellabsmedia.com/#localbusiness",
        "name": "Lejel Labs Media",
        "image": "https://lejellabsmedia.com/lejel-labs-media-1.png",
        "description": "Lejel Labs Media menyediakan jasa pembuatan video promosi restoran GRATIS. Konten video kuliner profesional untuk TikTok, Instagram & YouTube.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Jl. Contoh No. 123", // Update with actual address
          "addressLocality": "Jakarta",
          "addressRegion": "DKI Jakarta",
          "postalCode": "12345", // Update with actual postal code
          "addressCountry": "ID"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -6.2088, // Update with actual coordinates
          "longitude": 106.8456
        },
        "telephone": "+62-822-4290-8154",
        "email": "contact@lejellabsmedia.com", // Update with actual email
        "priceRange": "Rp 0 - Rp 2,000,000",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Saturday",
            "opens": "09:00",
            "closes": "14:00"
          }
        ]
      },
      {
        "@type": "Service",
        "@id": "https://lejellabsmedia.com/#service",
        "serviceType": "Video Production & Marketing",
        "provider": {
          "@id": "https://lejellabsmedia.com/#organization"
        },
        "areaServed": {
          "@type": "Country",
          "name": "Indonesia"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Video Marketing Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Promosi Gratis untuk Restoran",
                "description": "Video promosi restoran gratis dengan publikasi di TikTok, Instagram, dan YouTube Lejel Home Shopping"
              },
              "price": "0",
              "priceCurrency": "IDR"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Paket TikTok",
                "description": "10 video promosi untuk TikTok dalam 4 minggu"
              },
              "price": "2000000",
              "priceCurrency": "IDR"
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Paket Instagram",
                "description": "10 video promosi untuk Instagram dalam 4 minggu"
              },
              "price": "2000000",
              "priceCurrency": "IDR"
            }
          ]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://lejellabsmedia.com/#website",
        "url": "https://lejellabsmedia.com",
        "name": "Lejel Labs Media",
        "description": "Jasa Video Promosi Restoran & Kuliner Gratis",
        "publisher": {
          "@id": "https://lejellabsmedia.com/#organization"
        },
        "inLanguage": "id-ID"
      },
      {
        "@type": "WebPage",
        "@id": "https://lejellabsmedia.com/#webpage",
        "url": "https://lejellabsmedia.com",
        "name": "Lejel Labs Media - Jasa Video Promosi Restoran & Kuliner Gratis",
        "isPartOf": {
          "@id": "https://lejellabsmedia.com/#website"
        },
        "about": {
          "@id": "https://lejellabsmedia.com/#organization"
        },
        "description": "Dapatkan video promosi restoran GRATIS dari Lejel Labs Media. Tim profesional siap membantu restoran Anda viral di TikTok, Instagram & YouTube.",
        "inLanguage": "id-ID"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

