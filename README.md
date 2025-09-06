# Herramienta Unificada de Marketing Digital con IA

## 📋 Descripción del Proyecto

Plataforma web todo-en-uno que permite a las agencias de marketing digital **gestionar y optimizar campañas de Facebook Ads** de manera centralizada, utilizando inteligencia artificial para la creación de contenido y análisis de rendimiento.

## 🎯 Objetivo Principal

Desarrollar un **MVP (Producto Mínimo Viable)** que permita validar la idea de negocio mediante una herramienta que centralice la gestión de campañas publicitarias de Facebook, reduciendo la fragmentación de herramientas y mejorando la eficiencia operativa.

## 🔍 Problemas que Resuelve

- **Gestión manual ineficiente** de múltiples campañas publicitarias
- **Fragmentación de herramientas** que requiere navegar entre diferentes plataformas
- **Falta de personalización** en la segmentación de audiencias
- **Reportes limitados** y dispersos entre diferentes herramientas
- **Proceso lento** en la creación de contenido publicitario

## ✨ Propuesta de Valor

### Centralización Completa
- Panel unificado para gestionar campañas de múltiples clientes
- Integración directa con Facebook Marketing API
- Interfaz intuitiva y fácil de usar

### IA Creativa Integrada
- Generación automática de copy publicitario
- Creación de imágenes para anuncios
- Personalización basada en audiencia objetivo

### Análisis y Reportes Avanzados
- Dashboards interactivos en tiempo real
- Métricas clave centralizadas (ROAS, CPA, CTR, etc.)
- Informes personalizados con marca blanca

## 🚀 Funcionalidades del MVP

### 1. Gestión Multi-cuenta
- Panel de control centralizado
- Conexión segura con cuentas de Facebook Ads via API
- Administración de múltiples clientes desde una interfaz

### 2. Creación de Campañas Inteligente
- Selección de objetivos publicitarios (Conversiones, Tráfico, etc.)
- Configuración de presupuestos y programación
- Segmentación básica de audiencias (ubicación, demografía, intereses)
- Segmentación avanzada con IA para públicos similares

### 3. IA para Contenido Publicitario
- **Generación de Copy:** Integración con OpenAI API (GPT-4o mini)
- **Creación de Imágenes:** Integración con DALL-E 3 para creatividades visuales
- **Publicación directa** en Facebook Ads con contenido generado por IA

### 4. Optimización Inteligente
- Reglas de optimización personalizables
- Aplicación masiva de reglas a campañas y ad sets
- Monitoreo automático de métricas clave (CPA, ROAS)

### 5. Reportes y Analytics
- Dashboard interactivo con métricas principales
- Gráficos en tiempo real de rendimiento
- Generación de informes PDF con marca blanca
- Métricas incluidas: Impresiones, Alcance, CTR, CPC, CPM, ROAS, Conversiones

## 🛠️ Stack Tecnológico

### Backend
- **Lenguaje:** TypeScript/JavaScript
- **Runtime:** Node.js
- **Framework:** Express.js o NestJS
- **Base de Datos:** PostgreSQL

### Frontend
- **Framework:** React.js
- **UI/UX:** Interfaz moderna y responsiva

### Integraciones
- **Facebook Marketing API:** Gestión programática de campañas
- **OpenAI API:** Generación de contenido con IA
- **DALL-E 3:** Creación de imágenes publicitarias

### Control de Versiones
- Git con GitHub/GitLab

## 🔧 Configuración e Instalación de Facebook Marketing API

### Prerrequisitos

1. **App de Facebook Developer**
   - Crear una app en [Facebook Developers](https://developers.facebook.com/)
   - Añadir el producto "Marketing API" a la app
   - Obtener App ID y App Secret

2. **Permisos necesarios**
   - `ads_management`: Gestión completa de campañas publicitarias
   - `ads_read`: Lectura de datos de anuncios
   - `business_management`: Gestión de cuentas publicitarias
   - `pages_manage_ads`: Gestión de anuncios de páginas

### Instalación del SDK

```bash
# Instalar Facebook Business SDK para Node.js
npm install --save facebook-nodejs-business-sdk

# Para TypeScript (opcional)
npm install --save-dev @types/facebook-nodejs-business-sdk
```

### Configuración Inicial

```javascript
const adsSdk = require('facebook-nodejs-business-sdk');

// Configuración de la API
const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
const appSecret = process.env.FACEBOOK_APP_SECRET;
const appId = process.env.FACEBOOK_APP_ID;

// Inicializar la API
const api = adsSdk.FacebookAdsApi.init(accessToken);

// Opcional: Habilitar App Secret Proof para mayor seguridad
api.setAppSecret(appSecret);

// Habilitar modo debug (solo en desarrollo)
if (process.env.NODE_ENV === 'development') {
    api.setDebug(true);
}
```

## 📊 Implementación de Funcionalidades Core

### 1. Gestión de Cuentas Publicitarias

#### Listar Cuentas Publicitarias del Usuario

```javascript
const { AdAccount, User } = adsSdk;

async function getAdAccounts() {
    try {
        const user = new User('me');
        const accounts = await user.getAdAccounts([
            AdAccount.Fields.id,
            AdAccount.Fields.name,
            AdAccount.Fields.account_status,
            AdAccount.Fields.amount_spent,
            AdAccount.Fields.balance,
            AdAccount.Fields.currency,
            AdAccount.Fields.timezone_name
        ]);

        console.log('Cuentas publicitarias:', accounts);
        return accounts;
    } catch (error) {
        console.error('Error al obtener cuentas:', error);
        throw error;
    }
}
```

#### Obtener Detalles de una Cuenta Específica

```javascript
async function getAccountDetails(accountId) {
    try {
        const account = new AdAccount(`act_${accountId}`);
        const accountData = await account.read([
            AdAccount.Fields.id,
            AdAccount.Fields.name,
            AdAccount.Fields.account_status,
            AdAccount.Fields.amount_spent,
            AdAccount.Fields.balance,
            AdAccount.Fields.currency,
            AdAccount.Fields.spend_cap,
            AdAccount.Fields.account_id,
            AdAccount.Fields.business_name,
            AdAccount.Fields.timezone_name,
            AdAccount.Fields.min_campaign_group_spend_cap,
            AdAccount.Fields.max_campaign_group_spend_cap
        ]);

        return accountData;
    } catch (error) {
        console.error('Error al obtener detalles de cuenta:', error);
        throw error;
    }
}
```

### 2. Gestión de Campañas

#### Crear Nueva Campaña

```javascript
const { Campaign } = adsSdk;

async function createCampaign(accountId, campaignData) {
    try {
        const account = new AdAccount(`act_${accountId}`);
        
        const campaignParams = {
            [Campaign.Fields.name]: campaignData.name,
            [Campaign.Fields.objective]: campaignData.objective, // 'CONVERSIONS', 'TRAFFIC', 'BRAND_AWARENESS', etc.
            [Campaign.Fields.status]: Campaign.Status.paused, // Crear pausada por defecto
            [Campaign.Fields.special_ad_categories]: campaignData.specialCategories || []
        };

        // Configuración de presupuesto si se especifica
        if (campaignData.dailyBudget) {
            campaignParams[Campaign.Fields.daily_budget] = campaignData.dailyBudget;
        }

        if (campaignData.lifetimeBudget) {
            campaignParams[Campaign.Fields.lifetime_budget] = campaignData.lifetimeBudget;
        }

        const campaign = await account.createCampaign([Campaign.Fields.id], campaignParams);
        
        console.log('Campaña creada:', campaign.id);
        return campaign;
    } catch (error) {
        console.error('Error al crear campaña:', error);
        throw error;
    }
}
```

#### Listar Campañas de una Cuenta

```javascript
async function getCampaigns(accountId, options = {}) {
    try {
        const account = new AdAccount(`act_${accountId}`);
        
        const fields = [
            Campaign.Fields.id,
            Campaign.Fields.name,
            Campaign.Fields.objective,
            Campaign.Fields.status,
            Campaign.Fields.daily_budget,
            Campaign.Fields.lifetime_budget,
            Campaign.Fields.created_time,
            Campaign.Fields.updated_time,
            Campaign.Fields.start_time,
            Campaign.Fields.stop_time
        ];

        const params = {
            limit: options.limit || 25,
            ...options.filters
        };

        const campaigns = await account.getCampaigns(fields, params);
        return campaigns;
    } catch (error) {
        console.error('Error al obtener campañas:', error);
        throw error;
    }
}
```

#### Actualizar Campaña

```javascript
async function updateCampaign(campaignId, updates) {
    try {
        const campaign = new Campaign(campaignId);
        
        const updateParams = {};
        
        if (updates.name) updateParams[Campaign.Fields.name] = updates.name;
        if (updates.status) updateParams[Campaign.Fields.status] = updates.status;
        if (updates.dailyBudget) updateParams[Campaign.Fields.daily_budget] = updates.dailyBudget;
        if (updates.lifetimeBudget) updateParams[Campaign.Fields.lifetime_budget] = updates.lifetimeBudget;

        const result = await campaign.update([], updateParams);
        console.log('Campaña actualizada:', campaignId);
        return result;
    } catch (error) {
        console.error('Error al actualizar campaña:', error);
        throw error;
    }
}
```

### 3. Gestión de Conjuntos de Anuncios (Ad Sets)

#### Crear Ad Set con Targeting

```javascript
const { AdSet, TargetingSpecs } = adsSdk;

async function createAdSet(campaignId, adSetData) {
    try {
        const campaign = new Campaign(campaignId);
        
        // Configurar targeting
        const targeting = {
            geo_locations: {
                countries: adSetData.targeting.countries || ['US'],
                regions: adSetData.targeting.regions,
                cities: adSetData.targeting.cities
            },
            age_min: adSetData.targeting.ageMin || 18,
            age_max: adSetData.targeting.ageMax || 65,
            genders: adSetData.targeting.genders || [1, 2], // 1: male, 2: female
            interests: adSetData.targeting.interests,
            behaviors: adSetData.targeting.behaviors,
            custom_audiences: adSetData.targeting.customAudiences,
            lookalike_audiences: adSetData.targeting.lookalike
        };

        // Filtrar valores undefined
        Object.keys(targeting).forEach(key => {
            if (targeting[key] === undefined) delete targeting[key];
        });

        const adSetParams = {
            [AdSet.Fields.name]: adSetData.name,
            [AdSet.Fields.campaign_id]: campaignId,
            [AdSet.Fields.daily_budget]: adSetData.dailyBudget,
            [AdSet.Fields.billing_event]: adSetData.billingEvent || 'IMPRESSIONS',
            [AdSet.Fields.optimization_goal]: adSetData.optimizationGoal || 'LINK_CLICKS',
            [AdSet.Fields.bid_amount]: adSetData.bidAmount,
            [AdSet.Fields.status]: AdSet.Status.paused,
            [AdSet.Fields.targeting]: targeting,
            [AdSet.Fields.promoted_object]: adSetData.promotedObject,
            [AdSet.Fields.start_time]: adSetData.startTime,
            [AdSet.Fields.end_time]: adSetData.endTime
        };

        const adSet = await campaign.createAdSet([AdSet.Fields.id], adSetParams);
        console.log('Ad Set creado:', adSet.id);
        return adSet;
    } catch (error) {
        console.error('Error al crear ad set:', error);
        throw error;
    }
}
```

#### Configuración de Targeting Avanzado

```javascript
// Ejemplo de targeting detallado
const advancedTargeting = {
    // Ubicación geográfica
    geo_locations: {
        countries: ['US', 'CA', 'GB'],
        regions: [
            { key: 'US:CA', name: 'California' },
            { key: 'US:NY', name: 'New York' }
        ],
        cities: [
            { key: '2418046', name: 'New York', region: 'New York', country: 'US' }
        ],
        location_types: ['home', 'recent'] // Dónde están las personas
    },
    
    // Demografía
    age_min: 25,
    age_max: 45,
    genders: [2], // Solo mujeres
    
    // Intereses (IDs específicos de Facebook)
    interests: [
        { id: '6003107902433', name: 'Digital marketing' },
        { id: '6003020834693', name: 'Online shopping' }
    ],
    
    // Comportamientos
    behaviors: [
        { id: '6002714895372', name: 'Small business owners' }
    ],
    
    // Audiencias personalizadas
    custom_audiences: [
        { id: 'CUSTOM_AUDIENCE_ID' }
    ],
    
    // Exclusiones
    excluded_custom_audiences: [
        { id: 'EXCLUDED_AUDIENCE_ID' }
    ],
    
    // Conexiones
    connections: [
        { id: 'PAGE_ID', connection_action: 'like' }
    ],
    
    // Idiomas
    locales: [1000, 1001], // Inglés US, Inglés UK
    
    // Dispositivos
    device_platforms: ['mobile', 'desktop'],
    publisher_platforms: ['facebook', 'instagram'],
    
    // Targeting flexible
    flexible_spec: [
        {
            interests: [
                { id: '6003107902433', name: 'Digital marketing' }
            ]
        },
        {
            behaviors: [
                { id: '6002714895372', name: 'Small business owners' }
            ]
        }
    ]
};
```

### 4. Gestión de Anuncios (Ads)

#### Crear Anuncio

```javascript
const { Ad, AdCreative } = adsSdk;

async function createAd(adSetId, adData) {
    try {
        const adSet = new AdSet(adSetId);
        
        // Primero crear el creativo
        const creative = await createAdCreative(adData.creative);
        
        const adParams = {
            [Ad.Fields.name]: adData.name,
            [Ad.Fields.adset_id]: adSetId,
            [Ad.Fields.creative]: { creative_id: creative.id },
            [Ad.Fields.status]: Ad.Status.paused
        };

        const ad = await adSet.createAd([Ad.Fields.id], adParams);
        console.log('Anuncio creado:', ad.id);
        return ad;
    } catch (error) {
        console.error('Error al crear anuncio:', error);
        throw error;
    }
}
```

#### Crear Creativos de Anuncios

```javascript
async function createAdCreative(creativeData) {
    try {
        const account = new AdAccount(`act_${creativeData.accountId}`);
        
        const creativeParams = {
            [AdCreative.Fields.name]: creativeData.name,
            [AdCreative.Fields.object_story_spec]: {
                page_id: creativeData.pageId,
                link_data: {
                    call_to_action: {
                        type: creativeData.callToAction || 'LEARN_MORE',
                        value: {
                            link: creativeData.link
                        }
                    },
                    description: creativeData.description,
                    link: creativeData.link,
                    message: creativeData.message,
                    name: creativeData.headline,
                    picture: creativeData.imageUrl
                }
            }
        };

        // Para video ads
        if (creativeData.videoId) {
            creativeParams[AdCreative.Fields.object_story_spec].video_data = {
                video_id: creativeData.videoId,
                message: creativeData.message,
                call_to_action: {
                    type: creativeData.callToAction || 'LEARN_MORE',
                    value: {
                        link: creativeData.link
                    }
                }
            };
            delete creativeParams[AdCreative.Fields.object_story_spec].link_data;
        }

        const creative = await account.createAdCreative([AdCreative.Fields.id], creativeParams);
        return creative;
    } catch (error) {
        console.error('Error al crear creativo:', error);
        throw error;
    }
}
```

### 5. Subida de Imágenes y Videos

#### Subir Imagen

```javascript
const { AdImage } = adsSdk;
const fs = require('fs');

async function uploadImage(accountId, imagePath, imageName) {
    try {
        const account = new AdAccount(`act_${accountId}`);
        
        const imageData = fs.readFileSync(imagePath);
        
        const imageParams = {
            [AdImage.Fields.filename]: imageName,
            [AdImage.Fields.bytes]: imageData
        };

        const image = await account.createAdImage([], imageParams);
        console.log('Imagen subida:', image.hash);
        return image;
    } catch (error) {
        console.error('Error al subir imagen:', error);
        throw error;
    }
}
```

#### Subir Video

```javascript
const { AdVideo } = adsSdk;

async function uploadVideo(accountId, videoPath, videoName) {
    try {
        const account = new AdAccount(`act_${accountId}`);
        
        const videoData = fs.readFileSync(videoPath);
        
        const videoParams = {
            [AdVideo.Fields.name]: videoName,
            [AdVideo.Fields.source]: videoData
        };

        const video = await account.createAdVideo([], videoParams);
        console.log('Video subido:', video.id);
        return video;
    } catch (error) {
        console.error('Error al subir video:', error);
        throw error;
    }
}
```

### 6. Audiencias Personalizadas

#### Crear Audiencia Personalizada

```javascript
const { CustomAudience } = adsSdk;

async function createCustomAudience(accountId, audienceData) {
    try {
        const account = new AdAccount(`act_${accountId}`);
        
        const audienceParams = {
            [CustomAudience.Fields.name]: audienceData.name,
            [CustomAudience.Fields.description]: audienceData.description,
            [CustomAudience.Fields.subtype]: audienceData.subtype || 'CUSTOM',
            [CustomAudience.Fields.customer_file_source]: 'USER_PROVIDED_ONLY'
        };

        // Para audiencia basada en píxel
        if (audienceData.pixelId) {
            audienceParams[CustomAudience.Fields.rule] = {
                inclusions: {
                    operator: 'or',
                    rules: [
                        {
                            event_sources: [
                                {
                                    id: audienceData.pixelId,
                                    type: 'pixel'
                                }
                            ],
                            retention_seconds: audienceData.retentionDays * 24 * 60 * 60,
                            filter: {
                                operator: 'and',
                                filters: audienceData.filters || []
                            }
                        }
                    ]
                }
            };
        }

        const audience = await account.createCustomAudience([CustomAudience.Fields.id], audienceParams);
        console.log('Audiencia creada:', audience.id);
        return audience;
    } catch (error) {
        console.error('Error al crear audiencia:', error);
        throw error;
    }
}
```

#### Crear Audiencia Lookalike

```javascript
async function createLookalikeAudience(accountId, sourceAudienceId, countries, ratio = 1) {
    try {
        const account = new AdAccount(`act_${accountId}`);
        
        const audienceParams = {
            [CustomAudience.Fields.name]: `Lookalike - ${sourceAudienceId}`,
            [CustomAudience.Fields.subtype]: 'LOOKALIKE',
            [CustomAudience.Fields.origin_audience_id]: sourceAudienceId,
            [CustomAudience.Fields.lookalike_spec]: {
                ratio: ratio, // 1-10% de la población
                country: countries[0], // País principal
                type: 'similarity'
            }
        };

        const audience = await account.createCustomAudience([CustomAudience.Fields.id], audienceParams);
        console.log('Audiencia lookalike creada:', audience.id);
        return audience;
    } catch (error) {
        console.error('Error al crear audiencia lookalike:', error);
        throw error;
    }
}
```

## 📈 Analytics y Reportes

### 1. Insights de Campañas

```javascript
async function getCampaignInsights(campaignId, dateRange) {
    try {
        const campaign = new Campaign(campaignId);
        
        const fields = [
            'impressions',
            'reach',
            'clicks',
            'spend',
            'ctr',
            'cpc',
            'cpp',
            'cpm',
            'frequency',
            'actions',
            'conversions',
            'conversion_values',
            'cost_per_action_type',
            'video_30_sec_watched_actions',
            'video_p25_watched_actions',
            'video_p50_watched_actions',
            'video_p75_watched_actions',
            'video_p100_watched_actions'
        ];

        const params = {
            time_range: dateRange,
            level: 'campaign'
        };

        const insights = await campaign.getInsights(fields, params);
        return insights;
    } catch (error) {
        console.error('Error al obtener insights:', error);
        throw error;
    }
}
```

### 2. Métricas por Breakdown

```javascript
async function getDetailedInsights(accountId, level, dateRange, breakdowns = []) {
    try {
        const account = new AdAccount(`act_${accountId}`);
        
        const fields = [
            'campaign_name',
            'adset_name',
            'ad_name',
            'impressions',
            'reach',
            'clicks',
            'spend',
            'ctr',
            'cpc',
            'cpm',
            'frequency',
            'actions',
            'conversions',
            'conversion_values'
        ];

        const params = {
            level: level, // 'campaign', 'adset', 'ad'
            time_range: dateRange,
            breakdowns: breakdowns, // ['age', 'gender', 'country', 'placement', etc.]
            limit: 100
        };

        const insights = await account.getInsights(fields, params);
        return insights;
    } catch (error) {
        console.error('Error al obtener insights detallados:', error);
        throw error;
    }
}
```

### 3. Reportes Personalizados

```javascript
async function generateCustomReport(accountId, reportConfig) {
    try {
        const account = new AdAccount(`act_${accountId}`);
        
        // Crear reporte asíncrono para datasets grandes
        const reportRunParams = {
            level: reportConfig.level,
            fields: reportConfig.fields,
            time_range: reportConfig.dateRange,
            breakdowns: reportConfig.breakdowns,
            filtering: reportConfig.filters,
            sort: reportConfig.sort
        };

        const reportRun = await account.createAsyncReportRun(reportRunParams);
        
        // Esperar a que el reporte esté listo
        let isReady = false;
        let attempts = 0;
        const maxAttempts = 60; // 5 minutos máximo
        
        while (!isReady && attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 5000)); // Esperar 5 segundos
            
            const status = await reportRun.read(['async_status']);
            console.log('Estado del reporte:', status.async_status);
            
            if (status.async_status === 'Job Completed') {
                isReady = true;
            } else if (status.async_status === 'Job Failed') {
                throw new Error('Reporte falló');
            }
            
            attempts++;
        }

        if (!isReady) {
            throw new Error('Timeout en generación de reporte');
        }

        // Obtener resultados del reporte
        const results = await reportRun.getInsights();
        return results;
    } catch (error) {
        console.error('Error al generar reporte:', error);
        throw error;
    }
}
```

## 🤖 Integración con IA

### 1. Generación de Copy con OpenAI

```javascript
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function generateAdCopy(productInfo, targetAudience, adObjective) {
    try {
        const prompt = `
Crea un copy para anuncio de Facebook con las siguientes características:
- Producto/Servicio: ${productInfo.name}
- Descripción: ${productInfo.description}
- Audiencia objetivo: ${targetAudience}
- Objetivo del anuncio: ${adObjective}
- Tono: Persuasivo pero natural
- Incluir call-to-action fuerte
- Máximo 125 caracteres para el headline
- Máximo 125 caracteres para el texto principal
- Máximo 30 caracteres para el CTA

Formato de respuesta JSON:
{
    "headline": "...",
    "primaryText": "...",
    "description": "...",
    "callToAction": "..."
}
        `;

        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
            max_tokens: 500
        });

        const adCopy = JSON.parse(response.choices[0].message.content);
        return adCopy;
    } catch (error) {
        console.error('Error generando copy:', error);
        throw error;
    }
}
```

### 2. Generación de Imágenes con DALL-E

```javascript
async function generateAdImage(productDescription, style = 'professional') {
    try {
        const prompt = `
Create a ${style} advertising image for: ${productDescription}.
Style: Modern, clean, eye-catching, suitable for Facebook ads.
Format: Square (1:1 ratio), high quality.
No text overlays.
        `;

        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: prompt,
            n: 1,
            size: "1024x1024",
            quality: "standard"
        });

        const imageUrl = response.data[0].url;
        
        // Descargar y subir a Facebook
        const imageBuffer = await downloadImage(imageUrl);
        const facebookImage = await uploadImageFromBuffer(accountId, imageBuffer);
        
        return {
            originalUrl: imageUrl,
            facebookHash: facebookImage.hash
        };
    } catch (error) {
        console.error('Error generando imagen:', error);
        throw error;
    }
}

async function downloadImage(url) {
    const https = require('https');
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            const chunks = [];
            res.on('data', chunk => chunks.push(chunk));
            res.on('end', () => resolve(Buffer.concat(chunks)));
            res.on('error', reject);
        });
    });
}
```

## 🔧 Optimización Automática

### 1. Reglas de Optimización

```javascript
class AdOptimizer {
    constructor(accountId) {
        this.accountId = accountId;
        this.rules = [];
    }

    addRule(rule) {
        this.rules.push(rule);
    }

    async applyRules() {
        for (const rule of this.rules) {
            try {
                await this.executeRule(rule);
            } catch (error) {
                console.error(`Error aplicando regla ${rule.name}:`, error);
            }
        }
    }

    async executeRule(rule) {
        const insights = await this.getInsightsForRule(rule);
        
        for (const insight of insights) {
            if (this.shouldApplyRule(insight, rule)) {
                await this.applyRuleAction(insight, rule);
            }
        }
    }

    shouldApplyRule(insight, rule) {
        const metric = insight[rule.metric];
        
        switch (rule.condition) {
            case 'greater_than':
                return parseFloat(metric) > rule.threshold;
            case 'less_than':
                return parseFloat(metric) < rule.threshold;
            case 'equals':
                return parseFloat(metric) === rule.threshold;
            default:
                return false;
        }
    }

    async applyRuleAction(insight, rule) {
        console.log(`Aplicando regla ${rule.name} a ${insight.campaign_name || insight.adset_name || insight.ad_name}`);
        
        switch (rule.action) {
            case 'pause':
                await this.pauseEntity(insight, rule.level);
                break;
            case 'increase_budget':
                await this.adjustBudget(insight, rule.level, rule.adjustment);
                break;
            case 'decrease_budget':
                await this.adjustBudget(insight, rule.level, -rule.adjustment);
                break;
            case 'increase_bid':
                await this.adjustBid(insight, rule.level, rule.adjustment);
                break;
            case 'decrease_bid':
                await this.adjustBid(insight, rule.level, -rule.adjustment);
                break;
        }
    }

    async pauseEntity(insight, level) {
        try {
            if (level === 'campaign') {
                const campaign = new Campaign(insight.campaign_id);
                await campaign.update([], { [Campaign.Fields.status]: Campaign.Status.paused });
            } else if (level === 'adset') {
                const adSet = new AdSet(insight.adset_id);
                await adSet.update([], { [AdSet.Fields.status]: AdSet.Status.paused });
            } else if (level === 'ad') {
                const ad = new Ad(insight.ad_id);
                await ad.update([], { [Ad.Fields.status]: Ad.Status.paused });
            }
            console.log(`${level} pausado: ${insight[level + '_id']}`);
        } catch (error) {
            console.error(`Error pausando ${level}:`, error);
        }
    }

    async adjustBudget(insight, level, adjustment) {
        try {
            if (level === 'campaign') {
                const campaign = new Campaign(insight.campaign_id);
                const currentBudget = parseFloat(insight.daily_budget) || parseFloat(insight.lifetime_budget);
                const newBudget = Math.max(currentBudget + adjustment, 100); // Mínimo $1
                
                const updateParams = insight.daily_budget 
                    ? { [Campaign.Fields.daily_budget]: newBudget }
                    : { [Campaign.Fields.lifetime_budget]: newBudget };
                
                await campaign.update([], updateParams);
                console.log(`Presupuesto de campaña ajustado: ${newBudget}`);
            } else if (level === 'adset') {
                const adSet = new AdSet(insight.adset_id);
                const currentBudget = parseFloat(insight.daily_budget) || parseFloat(insight.lifetime_budget);
                const newBudget = Math.max(currentBudget + adjustment, 100);
                
                const updateParams = insight.daily_budget 
                    ? { [AdSet.Fields.daily_budget]: newBudget }
                    : { [AdSet.Fields.lifetime_budget]: newBudget };
                
                await adSet.update([], updateParams);
                console.log(`Presupuesto de ad set ajustado: ${newBudget}`);
            }
        } catch (error) {
            console.error(`Error ajustando presupuesto:`, error);
        }
    }
}

// Ejemplo de uso
const optimizer = new AdOptimizer('act_123456789');

// Regla: Pausar ad sets con CPA > $50
optimizer.addRule({
    name: 'Alto CPA - Pausar',
    level: 'adset',
    metric: 'cost_per_action_type',
    condition: 'greater_than',
    threshold: 5000, // $50 en centavos
    action: 'pause'
});

// Regla: Aumentar presupuesto si ROAS > 4
optimizer.addRule({
    name: 'Alto ROAS - Aumentar Presupuesto',
    level: 'adset',
    metric: 'purchase_roas',
    condition: 'greater_than',
    threshold: 4,
    action: 'increase_budget',
    adjustment: 1000 // $10 en centavos
});
```

### 2. Monitoreo de Rendimiento

```javascript
class PerformanceMonitor {
    constructor(accountId) {
        this.accountId = accountId;
        this.alerts = [];
    }

    async monitorAccount() {
        const insights = await this.getAccountInsights();
        
        for (const insight of insights) {
            await this.checkAlerts(insight);
        }
    }

    async getAccountInsights() {
        const account = new AdAccount(`act_${this.accountId}`);
        
        const dateRange = {
            since: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Ayer
            until: new Date().toISOString().split('T')[0] // Hoy
        };

        return await account.getInsights([
            'campaign_name',
            'adset_name',
            'spend',
            'impressions',
            'clicks',
            'conversions',
            'cost_per_action_type',
            'purchase_roas'
        ], {
            level: 'adset',
            time_range: dateRange
        });
    }

    addAlert(alertConfig) {
        this.alerts.push(alertConfig);
    }

    async checkAlerts(insight) {
        for (const alert of this.alerts) {
            if (this.shouldTriggerAlert(insight, alert)) {
                await this.sendAlert(insight, alert);
            }
        }
    }

    shouldTriggerAlert(insight, alert) {
        const value = this.getMetricValue(insight, alert.metric);
        
        switch (alert.condition) {
            case 'above':
                return value > alert.threshold;
            case 'below':
                return value < alert.threshold;
            case 'equals':
                return value === alert.threshold;
            default:
                return false;
        }
    }

    getMetricValue(insight, metric) {
        if (metric === 'cpa' && insight.cost_per_action_type) {
            const purchase = insight.cost_per_action_type.find(item => item.action_type === 'purchase');
            return purchase ? parseFloat(purchase.value) : 0;
        }
        
        return parseFloat(insight[metric]) || 0;
    }

    async sendAlert(insight, alert) {
        const message = `
🚨 ALERTA: ${alert.name}
📊 Campaña: ${insight.campaign_name}
🎯 Ad Set: ${insight.adset_name}
💰 Gasto: ${(parseFloat(insight.spend) / 100).toFixed(2)}
📈 Métrica: ${alert.metric} = ${this.getMetricValue(insight, alert.metric)}
⚠️ Umbral: ${alert.threshold}
        `;

        console.log(message);
        
        // Aquí puedes integrar con sistemas de notificación
        // await this.sendSlackNotification(message);
        // await this.sendEmailNotification(message);
    }
}
```

### 3. A/B Testing Automático

```javascript
class ABTestManager {
    constructor(accountId) {
        this.accountId = accountId;
    }

    async createABTest(testConfig) {
        const adSet = new AdSet(testConfig.adSetId);
        
        // Crear variaciones de anuncios
        const ads = [];
        for (let i = 0; i < testConfig.variations.length; i++) {
            const variation = testConfig.variations[i];
            const creative = await this.createVariationCreative(variation);
            
            const ad = await adSet.createAd([Ad.Fields.id], {
                [Ad.Fields.name]: `${testConfig.name} - Variación ${i + 1}`,
                [Ad.Fields.creative]: { creative_id: creative.id },
                [Ad.Fields.status]: Ad.Status.active
            });
            
            ads.push(ad);
        }

        // Configurar seguimiento del test
        const test = {
            id: `test_${Date.now()}`,
            name: testConfig.name,
            adSetId: testConfig.adSetId,
            ads: ads,
            metric: testConfig.metric,
            duration: testConfig.duration,
            startDate: new Date(),
            endDate: new Date(Date.now() + testConfig.duration * 24 * 60 * 60 * 1000)
        };

        return test;
    }

    async analyzeTest(testId) {
        const test = await this.getTestById(testId);
        
        if (new Date() < test.endDate) {
            return { status: 'running', message: 'Test aún en curso' };
        }

        // Obtener métricas de cada variación
        const results = [];
        for (const ad of test.ads) {
            const insights = await ad.getInsights([
                'impressions',
                'clicks',
                'spend',
                'conversions',
                'ctr',
                'cpc',
                'cost_per_action_type'
            ]);

            results.push({
                adId: ad.id,
                name: ad.name,
                metrics: insights[0] || {}
            });
        }

        // Determinar ganador
        const winner = this.determineWinner(results, test.metric);
        
        // Pausar perdedores
        for (const result of results) {
            if (result.adId !== winner.adId) {
                const ad = new Ad(result.adId);
                await ad.update([], { [Ad.Fields.status]: Ad.Status.paused });
            }
        }

        return {
            status: 'completed',
            winner: winner,
            results: results
        };
    }

    determineWinner(results, metric) {
        let bestResult = results[0];
        let bestValue = this.getMetricValue(bestResult.metrics, metric);

        for (const result of results) {
            const value = this.getMetricValue(result.metrics, metric);
            
            // Para métricas donde menor es mejor (CPC, CPA)
            if (['cpc', 'cpa'].includes(metric)) {
                if (value < bestValue && value > 0) {
                    bestResult = result;
                    bestValue = value;
                }
            } else {
                // Para métricas donde mayor es mejor (CTR, conversions)
                if (value > bestValue) {
                    bestResult = result;
                    bestValue = value;
                }
            }
        }

        return bestResult;
    }
}
```

## 🔍 Herramientas de Debugging y Troubleshooting

### 1. Manejo de Errores

```javascript
class FacebookAdsErrorHandler {
    static handleError(error) {
        if (error.response && error.response.body && error.response.body.error) {
            const fbError = error.response.body.error;
            
            switch (fbError.code) {
                case 1:
                    return {
                        type: 'API_UNKNOWN',
                        message: 'Error desconocido de la API',
                        suggestion: 'Revisar los parámetros de la petición'
                    };
                case 2:
                    return {
                        type: 'API_SERVICE',
                        message: 'Servicio temporalmente no disponible',
                        suggestion: 'Reintentar después de unos minutos'
                    };
                case 4:
                    return {
                        type: 'API_TOO_MANY_CALLS',
                        message: 'Demasiadas llamadas a la API',
                        suggestion: 'Implementar throttling o reducir frecuencia'
                    };
                case 10:
                    return {
                        type: 'AUTHORIZATION_ERROR',
                        message: 'No autorizado',
                        suggestion: 'Verificar permisos y token de acceso'
                    };
                case 100:
                    return {
                        type: 'INVALID_PARAMETER',
                        message: 'Parámetro inválido',
                        suggestion: `Error en: ${fbError.error_user_title || fbError.message}`
                    };
                case 190:
                    return {
                        type: 'ACCESS_TOKEN_ERROR',
                        message: 'Token de acceso inválido o expirado',
                        suggestion: 'Renovar token de acceso'
                    };
                default:
                    return {
                        type: 'UNKNOWN_FACEBOOK_ERROR',
                        message: fbError.message || 'Error desconocido',
                        suggestion: 'Revisar documentación de Facebook'
                    };
            }
        }

        return {
            type: 'GENERAL_ERROR',
            message: error.message || 'Error no especificado',
            suggestion: 'Revisar logs para más detalles'
        };
    }

    static async withRetry(operation, maxRetries = 3, delay = 1000) {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                return await operation();
            } catch (error) {
                const errorInfo = this.handleError(error);
                
                if (attempt === maxRetries || errorInfo.type === 'AUTHORIZATION_ERROR') {
                    throw error;
                }

                console.log(`Intento ${attempt} falló: ${errorInfo.message}. Reintentando en ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay * attempt));
            }
        }
    }
}
```

### 2. Rate Limiting

```javascript
class RateLimiter {
    constructor(requestsPerHour = 200) {
        this.requestsPerHour = requestsPerHour;
        this.requests = [];
    }

    async makeRequest(requestFunction) {
        await this.waitIfNeeded();
        
        try {
            const result = await requestFunction();
            this.logRequest();
            return result;
        } catch (error) {
            this.logRequest();
            throw error;
        }
    }

    async waitIfNeeded() {
        const now = Date.now();
        const oneHourAgo = now - (60 * 60 * 1000);
        
        // Limpiar requests antiguos
        this.requests = this.requests.filter(time => time > oneHourAgo);
        
        if (this.requests.length >= this.requestsPerHour) {
            const oldestRequest = Math.min(...this.requests);
            const waitTime = (oldestRequest + 60 * 60 * 1000) - now;
            
            if (waitTime > 0) {
                console.log(`Rate limit alcanzado. Esperando ${waitTime}ms...`);
                await new Promise(resolve => setTimeout(resolve, waitTime));
            }
        }
    }

    logRequest() {
        this.requests.push(Date.now());
    }
}
```

## 📊 Sistema de Reportes Avanzado

### 1. Generador de Reportes PDF

```javascript
const PDFDocument = require('pdfkit');
const fs = require('fs');

class ReportGenerator {
    constructor(accountId) {
        this.accountId = accountId;
    }

    async generatePDFReport(reportData, options = {}) {
        const doc = new PDFDocument();
        const filename = `reporte_${this.accountId}_${Date.now()}.pdf`;
        
        doc.pipe(fs.createWriteStream(filename));

        // Encabezado
        this.addHeader(doc, options.clientName || 'Cliente');
        
        // Resumen ejecutivo
        this.addExecutiveSummary(doc, reportData.summary);
        
        // Métricas principales
        this.addKeyMetrics(doc, reportData.metrics);
        
        // Gráficos de rendimiento
        if (reportData.charts) {
            this.addCharts(doc, reportData.charts);
        }

        // Recomendaciones
        if (reportData.recommendations) {
            this.addRecommendations(doc, reportData.recommendations);
        }

        doc.end();
        return filename;
    }

    addHeader(doc, clientName) {
        doc.fontSize(20)
           .text('Reporte de Rendimiento - Facebook Ads', 50, 50)
           .fontSize(14)
           .text(`Cliente: ${clientName}`, 50, 80)
           .text(`Período: ${new Date().toLocaleDateString()}`, 50, 100);
        
        doc.moveDown();
    }

    addExecutiveSummary(doc, summary) {
        doc.fontSize(16).text('Resumen Ejecutivo', 50, doc.y + 20);
        doc.fontSize(12);
        
        doc.text(`Total Gastado: ${(summary.spend / 100).toFixed(2)}`, 50, doc.y + 10);
        doc.text(`Total Impresiones: ${summary.impressions.toLocaleString()}`, 50, doc.y + 5);
        doc.text(`Total Clics: ${summary.clicks.toLocaleString()}`, 50, doc.y + 5);
        doc.text(`CTR Promedio: ${summary.ctr}%`, 50, doc.y + 5);
        doc.text(`CPC Promedio: ${(summary.cpc / 100).toFixed(2)}`, 50, doc.y + 5);
        doc.text(`Conversiones: ${summary.conversions}`, 50, doc.y + 5);
        doc.text(`ROAS: ${summary.roas}`, 50, doc.y + 5);
        
        doc.moveDown();
    }

    addKeyMetrics(doc, metrics) {
        doc.fontSize(16).text('Métricas por Campaña', 50, doc.y + 20);
        doc.fontSize(10);

        const tableTop = doc.y + 20;
        const headers = ['Campaña', 'Gasto', 'Impresiones', 'Clics', 'CTR', 'CPC', 'Conversiones'];
        const columnWidths = [120, 60, 80, 60, 50, 50, 80];
        let x = 50;

        // Headers
        headers.forEach((header, i) => {
            doc.text(header, x, tableTop, { width: columnWidths[i] });
            x += columnWidths[i];
        });

        // Data rows
        let y = tableTop + 20;
        metrics.forEach(metric => {
            x = 50;
            const values = [
                metric.campaign_name,
                `${(metric.spend / 100).toFixed(2)}`,
                metric.impressions.toLocaleString(),
                metric.clicks.toLocaleString(),
                `${metric.ctr}%`,
                `${(metric.cpc / 100).toFixed(2)}`,
                metric.conversions
            ];

            values.forEach((value, i) => {
                doc.text(value.toString(), x, y, { width: columnWidths[i] });
                x += columnWidths[i];
            });
            y += 15;
        });
    }
}
```

### 2. Dashboard en Tiempo Real

```javascript
class DashboardService {
    constructor(accountId) {
        this.accountId = accountId;
        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutos
    }

    async getDashboardData(dateRange = 'today') {
        const cacheKey = `dashboard_${this.accountId}_${dateRange}`;
        const cached = this.cache.get(cacheKey);
        
        if (cached && (Date.now() - cached.timestamp) < this.cacheTimeout) {
            return cached.data;
        }

        try {
            const [accountData, campaignData, insights] = await Promise.all([
                this.getAccountSummary(),
                this.getCampaignsSummary(dateRange),
                this.getRealtimeInsights(dateRange)
            ]);

            const dashboardData = {
                account: accountData,
                campaigns: campaignData,
                insights: insights,
                lastUpdated: new Date().toISOString()
            };

            this.cache.set(cacheKey, {
                data: dashboardData,
                timestamp: Date.now()
            });

            return dashboardData;
        } catch (error) {
            console.error('Error obteniendo datos del dashboard:', error);
            throw error;
        }
    }

    async getAccountSummary() {
        const account = new AdAccount(`act_${this.accountId}`);
        
        return await account.read([
            AdAccount.Fields.name,
            AdAccount.Fields.account_status,
            AdAccount.Fields.balance,
            AdAccount.Fields.amount_spent,
            AdAccount.Fields.spend_cap,
            AdAccount.Fields.currency
        ]);
    }

    async getCampaignsSummary(dateRange) {
        const account = new AdAccount(`act_${this.accountId}`);
        
        const campaigns = await account.getCampaigns([
            Campaign.Fields.id,
            Campaign.Fields.name,
            Campaign.Fields.status,
            Campaign.Fields.objective,
            Campaign.Fields.daily_budget,
            Campaign.Fields.lifetime_budget
        ]);

        // Obtener insights para cada campaña
        const campaignsWithInsights = await Promise.all(
            campaigns.map(async (campaign) => {
                try {
                    const insights = await campaign.getInsights([
                        'spend',
                        'impressions',
                        'clicks',
                        'ctr',
                        'cpc',
                        'conversions'
                    ], {
                        time_range: this.getTimeRange(dateRange)
                    });

                    return {
                        ...campaign,
                        insights: insights[0] || {}
                    };
                } catch (error) {
                    return { ...campaign, insights: {} };
                }
            })
        );

        return campaignsWithInsights;
    }

    getTimeRange(dateRange) {
        const today = new Date();
        const ranges = {
            today: {
                since: today.toISOString().split('T')[0],
                until: today.toISOString().split('T')[0]
            },
            yesterday: {
                since: new Date(today.getTime() - 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                until: new Date(today.getTime() - 24 * 60 * 60 * 1000).toISOString().split('T')[0]
            },
            last_7_days: {
                since: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                until: today.toISOString().split('T')[0]
            },
            last_30_days: {
                since: new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                until: today.toISOString().split('T')[0]
            }
        };

        return ranges[dateRange] || ranges.today;
    }
}
```

## 🔐 Seguridad y Mejores Prácticas

### 1. Gestión Segura de Tokens

```javascript
class TokenManager {
    constructor() {
        this.tokens = new Map();
    }

    async generateAppSecretProof(accessToken, appSecret) {
        const crypto = require('crypto');
        return crypto
            .createHmac('sha256', appSecret)
            .update(accessToken)
            .digest('hex');
    }

    async refreshToken(userId, currentToken) {
        try {
            // Implementar lógica de refresh usando el token de larga duración
            const response = await fetch(`https://graph.facebook.com/oauth/access_token?` +
                `grant_type=fb_exchange_token&` +
                `client_id=${process.env.FACEBOOK_APP_ID}&` +
                `client_secret=${process.env.FACEBOOK_APP_SECRET}&` +
                `fb_exchange_token=${currentToken}`);

            const data = await response.json();
            
            if (data.access_token) {
                this.tokens.set(userId, {
                    token: data.access_token,
                    expiresAt: Date.now() + (data.expires_in * 1000),
                    refreshedAt: Date.now()
                });

                return data.access_token;
            }
            
            throw new Error('No se pudo renovar el token');
        } catch (error) {
            console.error('Error renovando token:', error);
            throw error;
        }
    }

    validateToken(token) {
        // Implementar validación básica del token
        return token && token.length > 0 && token.startsWith('EAA');
    }

    async getValidToken(userId) {
        const tokenData = this.tokens.get(userId);
        
        if (!tokenData) {
            throw new Error('Token no encontrado');
        }

        // Si el token expira en menos de 1 hora, renovarlo
        if (tokenData.expiresAt - Date.now() < 60 * 60 * 1000) {
            return await this.refreshToken(userId, tokenData.token);
        }

        return tokenData.token;
    }
}
```

### 2. Middleware de Autenticación

```javascript
const jwt = require('jsonwebtoken');

class AuthMiddleware {
    static verifyToken(req, res, next) {
        const token = req.headers.authorization?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ error: 'Token no proporcionado' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ error: 'Token inválido' });
        }
    }

    static checkFacebookPermissions(requiredPermissions) {
        return async (req, res, next) => {
            try {
                const userToken = await tokenManager.getValidToken(req.user.id);
                const permissions = await this.getUserPermissions(userToken);
                
                const hasAllPermissions = requiredPermissions.every(perm => 
                    permissions.some(userPerm => userPerm.permission === perm && userPerm.status === 'granted')
                );

                if (!hasAllPermissions) {
                    return res.status(403).json({ 
                        error: 'Permisos insuficientes',
                        required: requiredPermissions,
                        current: permissions.filter(p => p.status === 'granted').map(p => p.permission)
                    });
                }

                next();
            } catch (error) {
                return res.status(500).json({ error: 'Error verificando permisos' });
            }
        };
    }

    static async getUserPermissions(accessToken) {
        const response = await fetch(`https://graph.facebook.com/me/permissions?access_token=${accessToken}`);
        const data = await response.json();
        return data.data || [];
    }
}
```

## 📈 Métricas de Éxito y KPIs

### 1. Calculadora de ROI

```javascript
class ROICalculator {
    static calculateROAS(adSpend, revenue) {
        return adSpend > 0 ? (revenue / adSpend).toFixed(2) : 0;
    }

    static calculateCPA(adSpend, conversions) {
        return conversions > 0 ? (adSpend / conversions).toFixed(2) : 0;
    }

    static calculateLifetimeValue(averageOrderValue, purchaseFrequency, customerLifespan) {
        return (averageOrderValue * purchaseFrequency * customerLifespan).toFixed(2);
    }

    static calculateBreakEvenCPA(averageOrderValue, marginPercent) {
        return (averageOrderValue * (marginPercent / 100)).toFixed(2);
    }

    static generateInsightsReport(campaignData) {
        const totalSpend = campaignData.reduce((sum, campaign) => sum + parseFloat(campaign.spend), 0);
        const totalRevenue = campaignData.reduce((sum, campaign) => sum + parseFloat(campaign.revenue || 0), 0);
        const totalConversions = campaignData.reduce((sum, campaign) => sum + parseInt(campaign.conversions || 0), 0);

        return {
            totalSpend: totalSpend.toFixed(2),
            totalRevenue: totalRevenue.toFixed(2),
            overallROAS: this.calculateROAS(totalSpend, totalRevenue),
            overallCPA: this.calculateCPA(totalSpend, totalConversions),
            profitMargin: ((totalRevenue - totalSpend) / totalRevenue * 100).toFixed(2),
            campaigns: campaignData.map(campaign => ({
                name: campaign.name,
                spend: parseFloat(campaign.spend).toFixed(2),
                revenue: parseFloat(campaign.revenue || 0).toFixed(2),
                roas: this.calculateROAS(parseFloat(campaign.spend), parseFloat(campaign.revenue || 0)),
                cpa: this.calculateCPA(parseFloat(campaign.spend), parseInt(campaign.conversions || 0)),
                performance: this.classifyPerformance(
                    this.calculateROAS(parseFloat(campaign.spend), parseFloat(campaign.revenue || 0))
                )
            }))
        };
    }

    static classifyPerformance(roas) {
        const roasValue = parseFloat(roas);
        if (roasValue >= 4) return 'Excelente';
        if (roasValue >= 2) return 'Bueno';
        if (roasValue >= 1) return 'Regular';
        return 'Necesita optimización';
    }
}
```

## 🎯 Roadmap de Desarrollo

### Fase 1: Configuración Básica (Semanas 1-2)
- [ ] Configurar proyecto Node.js con TypeScript
- [ ] Instalar y configurar Facebook Business SDK
- [ ] Implementar autenticación básica con Facebook
- [ ] Crear modelos de base de datos
- [ ] Configurar variables de entorno y seguridad

### Fase 2: Funcionalidades Core (Semanas 3-6)
- [ ] Implementar gestión de cuentas publicitarias
- [ ] Desarrollar CRUD completo para campañas
- [ ] Crear sistema de gestión de Ad Sets
- [ ] Implementar creación y gestión de anuncios
- [ ] Configurar subida de imágenes y videos
- [ ] Desarrollar sistema de targeting básico

### Fase 3: IA y Automatización (Semanas 7-9)
- [ ] Integrar OpenAI API para generación de copy
- [ ] Implementar DALL-E para creación de imágenes
- [ ] Desarrollar sistema de reglas de optimización
- [ ] Crear A/B testing automático
- [ ] Implementar monitoreo de rendimiento
- [ ] Configurar alertas automáticas

### Fase 4: Reportes y Analytics (Semanas 10-12)
- [ ] Desarrollar dashboard interactivo
- [ ] Implementar generación de reportes PDF
- [ ] Crear sistema de métricas en tiempo real
- [ ] Configurar exportación de datos
- [ ] Implementar comparativas de rendimiento
- [ ] Desarrollar insights automáticos

### Fase 5: Testing y Optimización (Semanas 13-15)
- [ ] Implementar testing unitario y de integración
- [ ] Configurar testing con Facebook Sandbox
- [ ] Optimizar rendimiento de consultas
- [ ] Implementar cache y rate limiting
- [ ] Realizar testing de seguridad
- [ ] Documentar APIs y funcionalidades

### Fase 6: Deploy y Validación (Semanas 16-18)
- [ ] Configurar entorno de producción
- [ ] Implementar CI/CD pipeline
- [ ] Realizar piloto con agencias seleccionadas
- [ ] Recopilar feedback de usuarios
- [ ] Iterar basado en feedback
- [ ] Preparar para escalabilidad

## 🧪 Testing y Validación

### 1. Testing con Facebook Sandbox

```javascript
class FacebookTestingUtils {
    constructor() {
        this.sandboxMode = process.env.NODE_ENV === 'test';
    }

    async createTestAdAccount() {
        if (!this.sandboxMode) {
            throw new Error('Solo disponible en modo sandbox');
        }

        const testAccount = {
            name: `Test Account ${Date.now()}`,
            currency: 'USD',
            timezone_id: 1, // UTC
            end_advertiser_id: process.env.FACEBOOK_APP_ID
        };

        // En sandbox, Facebook permite crear cuentas de prueba
        return testAccount;
    }

    generateTestData() {
        return {
            campaigns: [
                {
                    name: 'Test Campaign 1',
                    objective: 'CONVERSIONS',
                    status: 'PAUSED',
                    daily_budget: 1000 // $10
                }
            ],
            adSets: [
                {
                    name: 'Test AdSet 1',
                    daily_budget: 500, // $5
                    targeting: {
                        geo_locations: { countries: ['US'] },
                        age_min: 18,
                        age_max: 65
                    }
                }
            ],
            ads: [
                {
                    name: 'Test Ad 1',
                    creative: {
                        title: 'Test Headline',
                        body: 'Test ad copy',
                        call_to_action_type: 'LEARN_MORE'
                    }
                }
            ]
        };
    }

    async runIntegrationTest() {
        console.log('🧪 Iniciando tests de integración...');
        
        try {
            // Test 1: Conexión a API
            await this.testAPIConnection();
            console.log('✅ Conexión a API exitosa');

            // Test 2: Listar cuentas
            await this.testAccountAccess();
            console.log('✅ Acceso a cuentas confirmado');

            // Test 3: Crear campaña
            await this.testCampaignCreation();
            console.log('✅ Creación de campaña exitosa');

            // Test 4: Obtener insights
            await this.testInsightsRetrieval();
            console.log('✅ Obtención de insights exitosa');

            console.log('🎉 Todos los tests pasaron correctamente');
            return true;
        } catch (error) {
            console.error('❌ Test falló:', error.message);
            return false;
        }
    }

    async testAPIConnection() {
        const api = adsSdk.FacebookAdsApi.init(process.env.FACEBOOK_ACCESS_TOKEN);
        const user = new adsSdk.User('me');
        await user.read(['id', 'name']);
    }

    async testAccountAccess() {
        const user = new adsSdk.User('me');
        await user.getAdAccounts([adsSdk.AdAccount.Fields.id]);
    }

    async testCampaignCreation() {
        // Implementar creación de campaña de prueba
        const testData = this.generateTestData();
        // ... lógica de testing
    }

    async testInsightsRetrieval() {
        // Test básico de obtención de insights
        const account = new adsSdk.AdAccount(`act_${process.env.TEST_ACCOUNT_ID}`);
        await account.getInsights(['impressions', 'spend'], {
            time_range: { since: '2024-01-01', until: '2024-01-01' },
            level: 'account'
        });
    }
}
```

### 2. Unit Testing

```javascript
// tests/campaign.test.js
const { describe, it, expect, beforeEach, afterEach } = require('@jest/globals');
const CampaignManager = require('../src/managers/CampaignManager');

describe('CampaignManager', () => {
    let campaignManager;
    let mockAccount;

    beforeEach(() => {
        mockAccount = {
            createCampaign: jest.fn(),
            getCampaigns: jest.fn()
        };
        campaignManager = new CampaignManager('test_account_id');
    });

    describe('createCampaign', () => {
        it('should create campaign with correct parameters', async () => {
            const campaignData = {
                name: 'Test Campaign',
                objective: 'CONVERSIONS',
                dailyBudget: 1000
            };

            const mockCampaign = { id: 'test_campaign_id' };
            mockAccount.createCampaign.mockResolvedValue(mockCampaign);

            const result = await campaignManager.createCampaign(campaignData);

            expect(mockAccount.createCampaign).toHaveBeenCalledWith(
                expect.any(Array),
                expect.objectContaining({
                    name: campaignData.name,
                    objective: campaignData.objective,
                    daily_budget: campaignData.dailyBudget
                })
            );
            expect(result).toEqual(mockCampaign);
        });

        it('should handle creation errors gracefully', async () => {
            const campaignData = { name: 'Invalid Campaign' };
            const error = new Error('Invalid parameters');
            
            mockAccount.createCampaign.mockRejectedValue(error);

            await expect(campaignManager.createCampaign(campaignData))
                .rejects.toThrow('Invalid parameters');
        });
    });

    describe('getCampaigns', () => {
        it('should return campaigns with specified fields', async () => {
            const mockCampaigns = [
                { id: '1', name: 'Campaign 1' },
                { id: '2', name: 'Campaign 2' }
            ];

            mockAccount.getCampaigns.mockResolvedValue(mockCampaigns);

            const result = await campaignManager.getCampaigns();

            expect(mockAccount.getCampaigns).toHaveBeenCalledWith(
                expect.arrayContaining([
                    'id', 'name', 'objective', 'status'
                ]),
                expect.any(Object)
            );
            expect(result).toEqual(mockCampaigns);
        });
    });
});
```

## 🚀 Deployment y DevOps

### 1. Dockerfile

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Instalar dependencias del sistema
RUN apk add --no-cache python3 make g++

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production && npm cache clean --force

# Copiar código fuente
COPY . .

# Crear usuario no-root
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Cambiar permisos
RUN chown -R nodejs:nodejs /app
USER nodejs

# Exponer puerto
EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node healthcheck.js

# Comando de inicio
CMD ["node", "dist/index.js"]
```

### 2. Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - FACEBOOK_APP_ID=${FACEBOOK_APP_ID}
      - FACEBOOK_APP_SECRET=${FACEBOOK_APP_SECRET}
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - REDIS_URL=${REDIS_URL}
    depends_on:
      - postgres
      - redis
    restart: unless-stopped
    networks:
      - app-network

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=facebook_ads_mvp
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"
    networks:
      - app-network

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    networks:
      - app-network

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    networks:
      - app-network

volumes:
  postgres_data:
  redis_data:

networks:
  app-network:
    driver: bridge
```

### 3. CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test_db
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linter
      run: npm run lint
    
    - name: Run type check
      run: npm run type-check
    
    - name: Run tests
      run: npm test
      env:
        DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db
        NODE_ENV: test
    
    - name: Run integration tests
      run: npm run test:integration
      env:
        FACEBOOK_ACCESS_TOKEN: ${{ secrets.FACEBOOK_TEST_TOKEN }}

  build:
    needs: test
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v2
    
    - name: Login to DockerHub
      uses: docker/login-action@v2
      with:
        username: ${{ secrets.DOCKERHUB_USERNAME }}
        password: ${{ secrets.DOCKERHUB_TOKEN }}
    
    - name: Build and push
      uses: docker/build-push-action@v3
      with:
        context: .
        push: true
        tags: |
          your-dockerhub-username/facebook-ads-mvp:latest
          your-dockerhub-username/facebook-ads-mvp:${{ github.sha }}

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - name: Deploy to production
      uses: appleboy/ssh-action@v0.1.5
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.KEY }}
        script: |
          cd /app
          docker-compose pull
          docker-compose up -d
          docker system prune -f
```

### 4. Monitoreo y Logging

```javascript
// src/utils/logger.js
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'facebook-ads-mvp' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

// Middleware para Express
const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info('HTTP Request', {
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: duration,
      userAgent: req.get('User-Agent'),
      ip: req.ip
    });
  });
  
  next();
};

module.exports = { logger, requestLogger };
```

## 📊 Métricas de Éxito del MVP

### Métricas Técnicas
- **Uptime:** >99.5%
- **Response Time API:** <500ms promedio
- **Error Rate:** <1%
- **Facebook API Rate Limit:** <80% de uso
- **Database Query Performance:** <100ms promedio

### Métricas de Usuario
- **User Onboarding Success:** >90% completan configuración inicial
- **Daily Active Users:** Mínimo 50% de usuarios registrados
- **Feature Adoption:** >70% usan generación de copy con IA
- **Session Duration:** >15 minutos promedio
- **User Retention:** >60% regresan después de 7 días

### Métricas de Negocio
- **Campaign Creation Rate:** >2 campañas por usuario por semana
- **Ad Performance Improvement:** >15% mejora en ROAS promedio
- **Time Savings:** >50% reducción en tiempo de gestión
- **Customer Satisfaction:** NPS >7/10
- **Conversion to Paid:** >40% de usuarios beta

## 🔮 Funcionalidades Futuras (Post-MVP)

### Fase 7: Integraciones Adicionales
- Google Ads integration
- LinkedIn Ads integration
- TikTok Ads integration
- Instagram Shopping integration
- WhatsApp Business integration

### Fase 8: IA Avanzada
- Predicción de rendimiento de anuncios
- Optimización automática de presupuestos
- Recomendaciones de targeting por IA
- Análisis de sentimiento en comentarios
- Generación automática de landing pages

### Fase 9: Funcionalidades Empresariales
- White-label solution
- Multi-tenant architecture
- Advanced role management
- API para integraciones externas
- Webhook notifications

### Fase 10: Analytics Avanzado
- Attribution modeling
- Cross-platform analytics
- Predictive analytics
- Cohort analysis
- Customer lifetime value tracking

## 📚 Recursos y Documentación

### Documentación Oficial
- [Facebook Marketing API](https://developers.facebook.com/docs/marketing-api)
- [Facebook Business SDK for Node.js](https://github.com/facebook/facebook-nodejs-business-sdk)
- [Facebook Graph Explorer](https://developers.facebook.com/tools/explorer)
- [Facebook Ads Manager](https://business.facebook.com/adsmanager)

### Herramientas de Desarrollo
- [Facebook App Dashboard](https://developers.facebook.com/apps/)
- [Facebook Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper/)
- [Facebook Debugger](https://developers.facebook.com/tools/debug/)

### Recursos de Aprendizaje
- [Facebook Blueprint](https://www.facebook.com/business/learn)
- [Facebook Developer Community](https://developers.facebook.com/community/)
- [Marketing API Best Practices](https://developers.facebook.com/docs/marketing-api/best-practices)

## 🤝 Contribución y Soporte

### Cómo Contribuir
1. Fork el repositorio
2. Crear feature branch: `git checkout -b feature/nueva-funcionalidad`
3. Commit cambios: `git commit -am 'Add nueva funcionalidad'`
4. Push branch: `git push origin feature/nueva-funcionalidad`
5. Crear Pull Request

### Reportar Issues
- Usar templates de issues en GitHub
- Incluir logs relevantes
- Especificar versión y entorno
- Pasos para reproducir el problema

### Soporte
- **Email:** support@tu-empresa.com
- **Slack:** Canal #facebook-ads-mvp
- **Documentación:** Wiki del repositorio

---

**Versión:** MVP 1.0  
**Estado:** En Desarrollo  
**Licencia:** Propietaria  
**Última actualización:** Septiembre 2025

Token de facebook: EAAsZA9ZBw1ZAJcBPSWXrNaNv3uArITTRlZAPCHFZBuVY7LM4SfN2SZAnPJlGHs0UiTAqZAdFcKz8aZBbLjrmO96CeT7Dsg56BPX1HGJxKBOic9sQyfhwKGlFIdiYr7nk9OlSvvHbaRydnwAVU1rdf0RUUuyCv0ZBUuEZAYa2AK2zW6JFxMEBUhrRJpeFVaiciM92nSD26Hbm5ZC4mbX5M4J6AGcfQsK