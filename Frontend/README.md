# 🎨 Frontend - Sistema de Predicción de Desnutrición

Interfaz web moderna desarrollada con **React** y **TypeScript** que proporciona una experiencia de usuario intuitiva para la evaluación del estado nutricional en niños menores de 5 años.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Componentes Principales](#componentes-principales)
- [Diseño y Estilos](#diseño-y-estilos)
- [Integración con Backend](#integración-con-backend)

## ✨ Características

- 🎨 **Diseño moderno y responsivo** con Tailwind CSS
- 📱 **Mobile-first** - Adaptable a todos los dispositivos
- ⚡ **Tiempo real** - Predicciones instantáneas
- 🎯 **Validación de formularios** con feedback visual
- 📊 **Visualización de datos** con Chart.js
- 🌈 **Efectos glassmorphism** y gradientes modernos
- ♿ **Accesible** - Diseño inclusivo
- 🔄 **Estados de carga** animados
- 🎭 **Iconografía SVG** inline para mejor rendimiento
- 💎 **UX premium** con animaciones suaves

## 🛠 Tecnologías Utilizadas

### Core
- **React** v18.2+ - Biblioteca UI
- **TypeScript** v4.9+ - Tipado estático
- **React Router** v6.20+ - Navegación SPA

### Estilos
- **Tailwind CSS** v3.3+ - Framework CSS utility-first
- **PostCSS** - Procesamiento de CSS
- **Autoprefixer** - Compatibilidad de navegadores

### Visualización de Datos
- **Chart.js** v4.4+ - Gráficos interactivos
- **react-chartjs-2** v5.2+ - Wrapper de Chart.js para React

### Desarrollo
- **React Scripts** v5.0+ - Configuración de Create React App
- **ESLint** - Linter de código
- **TypeScript ESLint** - Reglas de TypeScript

### HTTP Client
- **Fetch API** - Peticiones HTTP nativas

## 📁 Estructura del Proyecto

```
Frontend/
├── public/
│   ├── index.html              # HTML base
│   └── favicon.ico             # Icono de la aplicación
├── src/
│   ├── components/             # Componentes reutilizables
│   │   ├── Formulario.tsx      # Formulario de entrada de datos
│   │   ├── GraficoRiesgo.tsx   # Visualización con gráficos
│   │   └── Resultado.tsx       # Presentación de resultados
│   ├── pages/                  # Páginas de la aplicación
│   │   ├── Dashboard.tsx       # Panel de evaluación
│   │   └── Home.tsx            # Página de inicio
│   ├── services/               # Servicios y API
│   │   └── api.ts              # Cliente de API
│   ├── App.tsx                 # Componente raíz
│   ├── index.tsx               # Punto de entrada
│   └── index.css               # Estilos globales y Tailwind
├── tailwind.config.js          # Configuración de Tailwind CSS
├── tsconfig.json               # Configuración de TypeScript
├── package.json                # Dependencias y scripts
└── README.md                   # Este archivo
```

## 📦 Instalación

### Requisitos Previos

- Node.js 16.0 o superior
- npm 8.0 o superior (incluido con Node.js)

### Pasos de Instalación

1. **Navega a la carpeta Frontend:**
   ```bash
   cd Frontend
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Verifica la instalación:**
   ```bash
   npm list react react-dom
   ```

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del Frontend (opcional):

```env
# URL del Backend API
REACT_APP_API_URL=http://localhost:8000

# Puerto de desarrollo (por defecto: 3000)
PORT=3000

# Abrir navegador automáticamente
BROWSER=none
```

### Configuración de API

La URL del backend se configura en `src/services/api.ts`:

```typescript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
```

## 🚀 Uso

### Modo Desarrollo

Inicia el servidor de desarrollo:

```bash
npm start
```

La aplicación estará disponible en:
- **Local**: http://localhost:3000
- **Red**: http://[tu-ip]:3000

### Build de Producción

Crea una versión optimizada para producción:

```bash
npm run build
```

Los archivos compilados estarán en la carpeta `build/`.

### Ejecutar Tests

```bash
npm test
```

### Análisis de Bundle

```bash
npm run build
npx source-map-explorer 'build/static/js/*.js'
```

## 🧩 Componentes Principales

### 1. Home.tsx (Página de Inicio)

**Ubicación**: `src/pages/Home.tsx`

**Descripción**: Landing page con presentación del sistema.

**Características**:
- Hero section con gradientes y animaciones
- Tarjetas de estadísticas del modelo
- Grid de características (6 cards)
- Sección CTA con llamado a la acción
- Footer glassmorphic

**Props**: Ninguna

**Uso**:
```typescript
import Home from './pages/Home';
<Route path="/" element={<Home />} />
```

### 2. Dashboard.tsx (Panel Principal)

**Ubicación**: `src/pages/Dashboard.tsx`

**Descripción**: Interfaz principal de evaluación nutricional.

**Características**:
- Diseño de dos paneles (formulario + resultados)
- Header con badge de estado animado
- Estados vacíos informativos
- Spinner de carga personalizado
- Gestión de errores visual

**Estado Interno**:
```typescript
{
  resultado: PredictionOutput | null,
  loading: boolean,
  error: string | null
}
```

**Uso**:
```typescript
import Dashboard from './pages/Dashboard';
<Route path="/dashboard" element={<Dashboard />} />
```

### 3. Formulario.tsx

**Ubicación**: `src/components/Formulario.tsx`

**Descripción**: Formulario de captura de datos antropométricos.

**Props**:
```typescript
interface FormularioProps {
  onSubmit: (resultado: PredictionOutput) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}
```

**Campos**:
- `edad_meses`: 0-60 meses
- `peso_kg`: 0-30 kg (step 0.1)
- `talla_cm`: 0-120 cm (step 0.1)
- `per_braqu_cm`: 0-30 cm (step 0.1, opcional)

**Validaciones**:
- Rangos numéricos
- Campos requeridos
- Mensajes de error descriptivos

**Uso**:
```typescript
<Formulario 
  onSubmit={handleResultado}
  setLoading={setLoading}
  setError={setError}
/>
```

### 4. Resultado.tsx

**Ubicación**: `src/components/Resultado.tsx`

**Descripción**: Presenta los resultados de la predicción.

**Props**:
```typescript
interface ResultadoProps {
  resultado: PredictionOutput | null;
}
```

**Secciones**:
- Header con ícono y badge según riesgo
- Barra de confianza del modelo
- Lista de recomendaciones numeradas
- Nota médica importante

**Colores Dinámicos**:
- Verde (Sin riesgo)
- Naranja (Riesgo moderado)
- Rojo (Alto riesgo)

**Uso**:
```typescript
<Resultado resultado={resultado} />
```

### 5. GraficoRiesgo.tsx

**Ubicación**: `src/components/Resultado.tsx`

**Descripción**: Visualización gráfica de resultados.

**Props**:
```typescript
interface GraficoRiesgoProps {
  resultado: PredictionOutput | null;
}
```

**Gráficos**:
1. **Pie Chart**: Confianza del modelo
2. **Bar Chart**: Categoría detectada

**Configuración**:
- Tooltips personalizados
- Colores según nivel de riesgo
- Responsive y animado

**Uso**:
```typescript
<GraficoRiesgo resultado={resultado} />
```

## 🎨 Diseño y Estilos

### Sistema de Diseño

**Paleta de Colores**:
```css
/* Gradientes principales */
Blue-Purple: from-blue-500 to-purple-600
Green-Emerald: from-green-500 to-emerald-600
Orange-Amber: from-orange-500 to-amber-600
Red-Rose: from-red-500 to-rose-600

/* Colores de estado */
Success: green-500
Warning: orange-500
Error: red-500
Info: blue-500
```

**Tipografía**:
```css
/* Títulos */
.font-black      /* 900 */
.font-bold       /* 700 */
.font-semibold   /* 600 */

/* Tamaños */
.text-7xl        /* Heros */
.text-4xl        /* Títulos principales */
.text-2xl        /* Subtítulos */
.text-base       /* Texto normal */
.text-sm         /* Texto pequeño */
.text-xs         /* Etiquetas */
```

**Espaciado**:
```css
/* Padding */
p-2, p-3, p-4, p-5, p-6, p-8

/* Margin */
mb-2, mb-3, mb-4, mb-5, mb-6

/* Gap */
gap-2, gap-3, gap-4, gap-5, gap-6
```

### Efectos y Animaciones

**Glassmorphism**:
```css
.backdrop-blur-md
.bg-white/10
.border-2
```

**Hover Effects**:
```css
.hover:scale-105
.hover:-translate-y-2
.hover:shadow-2xl
.transition-all
.duration-300
```

**Animaciones**:
```css
.animate-pulse    /* Pulsación */
.animate-spin     /* Rotación */
```

### Grid Responsivo

```css
/* Mobile first */
.grid-cols-1              /* 1 columna en móvil */
.md:grid-cols-2          /* 2 columnas en tablet */
.lg:grid-cols-3          /* 3 columnas en desktop */
```

## 🔗 Integración con Backend

### Servicio API

**Archivo**: `src/services/api.ts`

**Funciones**:

```typescript
// Predicción de riesgo nutricional
export async function predictDesnutricion(
  data: PredictionInput
): Promise<PredictionOutput>
```

**Tipos**:

```typescript
// Entrada
interface PredictionInput {
  edad_meses: number;
  peso_kg: number;
  talla_cm: number;
  per_braqu_cm: number;
}

// Salida
interface PredictionOutput {
  categoria: string;
  riesgo_nivel: number;
  probabilidad: number;
  recomendaciones: string[];
}
```

**Manejo de Errores**:
- Validación de respuesta HTTP
- Timeout de peticiones
- Mensajes de error descriptivos
- Fallback para errores de red

### Ejemplo de Uso

```typescript
import { predictDesnutricion } from '../services/api';

const handleSubmit = async (data: FormData) => {
  try {
    setLoading(true);
    const resultado = await predictDesnutricion({
      edad_meses: parseFloat(data.edad_meses),
      peso_kg: parseFloat(data.peso_kg),
      talla_cm: parseFloat(data.talla_cm),
      per_braqu_cm: parseFloat(data.per_braqu_cm)
    });
    onSubmit(resultado);
    setError(null);
  } catch (err) {
    setError('Error al realizar la predicción');
    console.error(err);
  } finally {
    setLoading(false);
  }
};
```

## 🧪 Testing

### Tests Unitarios

```bash
npm test
```

### Tests de Componentes

```bash
npm test -- --coverage
```

### E2E Testing (Opcional)

Si se configura Cypress o Playwright:

```bash
npm run test:e2e
```

## 🚀 Deployment

### Vercel (Recomendado)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Sube la carpeta build/
```

### Servidor Propio

```bash
npm run build
# Sirve la carpeta build/ con nginx o apache
```

## 📱 Progressive Web App (PWA)

Para habilitar PWA:

1. Descomentar el service worker en `src/index.tsx`
2. Configurar `public/manifest.json`
3. Build y deploy

## 🐛 Debugging

### React Developer Tools

Instala la extensión de React DevTools en tu navegador.

### Redux DevTools (Si se implementa)

```bash
npm install @reduxjs/toolkit react-redux
```

### Console Logs

El modo desarrollo muestra logs detallados en consola.

## 🔧 Troubleshooting

### Error: "Module not found"

```bash
rm -rf node_modules package-lock.json
npm install
```

### Error de CORS

Verifica que el backend tenga configurado CORS para `http://localhost:3000`.

### Puerto 3000 en uso

```bash
# Cambiar puerto
PORT=3001 npm start
```

## 📄 Licencia

Este proyecto es parte del sistema de predicción de desnutrición infantil.

## 👨‍💻 Desarrollador

Interfaz desarrollada con las mejores prácticas de React y TypeScript para proporcionar una experiencia de usuario excepcional.

---

**Nota**: Esta interfaz está diseñada para trabajar en conjunto con el Backend FastAPI. Asegúrate de que el backend esté corriendo en `http://localhost:8000`.
