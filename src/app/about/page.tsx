import type { Metadata } from "next";
import Script from "next/script";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "À Propos de Nexy - Framework Python Moderne",
  description: "Découvrez l'équipe derrière Nexy, notre mission de démocratiser le développement web Python et notre vision pour l'avenir du développement d'applications.",
  keywords: [
    "à propos Nexy",
    "équipe Nexy",
    "mission Nexy",
    "histoire Nexy",
    "développeurs Nexy",
  ],
  openGraph: {
    title: "À Propos de Nexy - Framework Python Moderne",
    description: "Découvrez l'équipe derrière Nexy et notre mission de démocratiser le développement web Python.",
    type: "website",
    url: `${siteUrl}/about`,
  },
  alternates: {
    canonical: `${siteUrl}/about`,
  },
};

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Structured Data - About Page */}
      <Script
        id="ld-json-about"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "À Propos de Nexy",
            description: "Découvrez l'équipe derrière Nexy et notre mission de démocratiser le développement web Python.",
            url: `${siteUrl}/about`,
            mainEntity: {
              "@type": "Organization",
              name: "Nexy",
              description: "Framework Python moderne basé sur FastAPI",
              url: siteUrl,
              sameAs: [
                "https://github.com/nexyframework",
                "https://twitter.com/nexyframework",
              ],
            },
          }),
        }}
      />

      <h1 className="text-4xl font-bold mb-8">À Propos de Nexy</h1>
      
      <div className="prose max-w-none">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Notre Mission</h2>
          <p className="text-lg mb-4">
            Nexy est né d'une vision simple : démocratiser le développement d'applications web performantes avec Python. 
            Nous croyons que la puissance de FastAPI combinée à une expérience développeur intuitive peut révolutionner 
            la façon dont nous construisons des applications web.
          </p>
          <p className="text-lg">
            Notre objectif est de fournir aux développeurs les outils nécessaires pour créer des applications 
            rapides, sécurisées et évolutives, tout en maintenant une courbe d'apprentissage accessible.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Pourquoi Nexy ?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">🚀 Performance</h3>
              <p>Bâti sur FastAPI, Nexy offre des performances exceptionnelles pour vos applications web.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">🛡️ Sécurité</h3>
              <p>Intégration native des meilleures pratiques de sécurité pour protéger vos applications.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">⚡ Simplicité</h3>
              <p>Une API intuitive qui vous permet de vous concentrer sur votre logique métier.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">🔧 Flexibilité</h3>
              <p>Adaptable à tous types de projets, du prototype au déploiement en production.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Notre Équipe</h2>
          <p className="text-lg mb-6">
            Nexy est développé par une équipe passionnée de développeurs Python qui croient en la puissance 
            de l'open source et de la communauté. Nous travaillons continuellement pour améliorer le framework 
            et créer la meilleure expérience possible pour nos utilisateurs.
          </p>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Rejoignez la Communauté</h3>
            <p className="mb-4">
              Contribuez au développement de Nexy, partagez vos expériences et aidez-nous à faire de Nexy 
              le framework Python de référence pour le développement web.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://github.com/nexyframework" 
                className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a 
                href="https://twitter.com/nexyframework" 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
