#!/usr/bin/env node

/**
 * Script de monitoring SEO pour Nexy
 * Vérifie l'indexation et les performances du site
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const LOG_FILE = path.join(__dirname, '../logs/seo-monitor.log');

// Créer le dossier logs s'il n'existe pas
if (!fs.existsSync(path.dirname(LOG_FILE))) {
  fs.mkdirSync(path.dirname(LOG_FILE), { recursive: true });
}

function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  console.log(logMessage.trim());
  fs.appendFileSync(LOG_FILE, logMessage);
}

function checkUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      resolve({
        status: res.statusCode,
        headers: res.headers,
        url: url
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function checkSEO() {
  log('🔍 Début du monitoring SEO pour Nexy');
  
  const urlsToCheck = [
    `${SITE_URL}/`,
    `${SITE_URL}/docs`,
    `${SITE_URL}/about`,
    `${SITE_URL}/blog`,
    `${SITE_URL}/sitemap.xml`,
    `${SITE_URL}/robots.txt`,
    `${SITE_URL}/manifest.json`,
  ];

  log(`📋 Vérification de ${urlsToCheck.length} URLs`);

  for (const url of urlsToCheck) {
    try {
      const result = await checkUrl(url);
      if (result.status === 200) {
        log(`✅ ${url} - Status: ${result.status}`);
        
        // Vérifier les headers SEO
        const seoHeaders = {
          'x-robots-tag': result.headers['x-robots-tag'],
          'cache-control': result.headers['cache-control'],
          'content-type': result.headers['content-type'],
        };
        
        log(`📊 Headers SEO pour ${url}: ${JSON.stringify(seoHeaders)}`);
      } else {
        log(`⚠️ ${url} - Status: ${result.status}`);
      }
    } catch (error) {
      log(`❌ ${url} - Erreur: ${error.message}`);
    }
  }

  // Vérifier les métadonnées importantes
  log('🔍 Vérification des métadonnées...');
  
  try {
    const homepage = await checkUrl(`${SITE_URL}/`);
    const html = await new Promise((resolve, reject) => {
      https.get(`${SITE_URL}/`, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(data));
      }).on('error', reject);
    });

    const checks = [
      { name: 'Title', pattern: /<title[^>]*>([^<]+)<\/title>/i },
      { name: 'Meta Description', pattern: /<meta[^>]*name="description"[^>]*content="([^"]+)"/i },
      { name: 'Open Graph', pattern: /<meta[^>]*property="og:title"[^>]*content="([^"]+)"/i },
      { name: 'Twitter Card', pattern: /<meta[^>]*name="twitter:card"[^>]*content="([^"]+)"/i },
      { name: 'Canonical', pattern: /<link[^>]*rel="canonical"[^>]*href="([^"]+)"/i },
      { name: 'JSON-LD', pattern: /<script[^>]*type="application\/ld\+json"[^>]*>/i },
    ];

    checks.forEach(check => {
      const match = html.match(check.pattern);
      if (match) {
        log(`✅ ${check.name}: Présent`);
      } else {
        log(`❌ ${check.name}: Manquant`);
      }
    });

  } catch (error) {
    log(`❌ Erreur lors de la vérification des métadonnées: ${error.message}`);
  }

  log('🎯 Monitoring SEO terminé');
  log('📈 Prochaines étapes recommandées:');
  log('   1. Soumettre le sitemap à Google Search Console');
  log('   2. Vérifier les performances avec PageSpeed Insights');
  log('   3. Tester les données structurées avec Rich Results Test');
  log('   4. Surveiller les erreurs dans Google Search Console');
}

// Exécuter le monitoring
checkSEO().catch(console.error);

