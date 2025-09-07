import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Blog Nexy - Actualités et Tutoriels",
  description: "Découvrez les dernières actualités, tutoriels et bonnes pratiques pour développer avec le framework Nexy. Conseils d'experts et guides pratiques.",
  keywords: [
    "blog Nexy",
    "tutoriels Python",
    "développement web",
    "FastAPI tutoriels",
    "actualités framework",
  ],
  openGraph: {
    title: "Blog Nexy - Actualités et Tutoriels",
    description: "Découvrez les dernières actualités, tutoriels et bonnes pratiques pour développer avec le framework Nexy.",
    type: "website",
    url: `${siteUrl}/blog`,
  },
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
};

const BlogPage = () => {
  const articles = [
    {
      title: "Pourquoi choisir Nexy pour votre prochain projet Python ?",
      excerpt: "Découvrez les avantages du framework Nexy et pourquoi il révolutionne le développement web Python.",
      date: "2024-01-15",
      slug: "pourquoi-choisir-nexy",
      category: "Framework",
    },
    {
      title: "Guide complet : Créer votre première API avec Nexy",
      excerpt: "Tutoriel étape par étape pour créer une API REST performante avec Nexy et FastAPI.",
      date: "2024-01-10",
      slug: "creer-api-nexy",
      category: "Tutoriel",
    },
    {
      title: "Optimiser les performances de votre application Nexy",
      excerpt: "Techniques avancées pour améliorer les performances et la scalabilité de vos applications.",
      date: "2024-01-05",
      slug: "optimiser-performances-nexy",
      category: "Performance",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog Nexy</h1>
      <p className="text-lg mb-8">
        Découvrez les dernières actualités, tutoriels et bonnes pratiques pour développer avec le framework Nexy.
      </p>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <article key={article.slug} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <span className="text-sm text-blue-600 font-medium">{article.category}</span>
            <h2 className="text-xl font-semibold mt-2 mb-3">
              <a href={`/blog/${article.slug}`} className="hover:text-blue-600">
                {article.title}
              </a>
            </h2>
            <p className="text-gray-600 mb-4">{article.excerpt}</p>
            <time className="text-sm text-gray-500">{article.date}</time>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
