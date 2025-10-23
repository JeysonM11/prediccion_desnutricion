# 📖 Diccionario de Datos - Dataset de Desnutrición

Este documento describe detalladamente cada una de las columnas del dataset `datos_desnutricion.csv` utilizado para el entrenamiento del modelo de predicción de desnutrición infantil.

## 📊 Información General del Dataset

- **Nombre del archivo**: `datos_desnutricion.csv`
- **Ubicación**: `Backend/app/data/`
- **Número total de registros**: 2,803 casos
- **Número total de columnas**: 27 variables
- **Periodo**: Datos recopilados en 2016
- **Población objetivo**: Niños menores de 5 años
- **Evento**: Desnutrición aguda en menores de 5 años

---

## 📝 Descripción de Columnas

### 1. Variables de Identificación

#### `id`
- **Tipo de dato**: Entero (Integer)
- **Descripción**: Identificador único del registro
- **Rango**: 1 - 2,803
- **Valores nulos**: No
- **Ejemplo**: 1, 2, 3...

#### `semana`
- **Tipo de dato**: Entero (Integer)
- **Descripción**: Semana epidemiológica en la que se registró el caso
- **Rango**: 1 - 52
- **Valores nulos**: No
- **Ejemplo**: 19, 27, 43

#### `year_`
- **Tipo de dato**: Entero (Integer)
- **Descripción**: Año en que se registró el caso
- **Valores**: 2016
- **Valores nulos**: No
- **Uso**: Clasificación temporal de los datos

---

### 2. Variables Demográficas

#### `edad_`
- **Tipo de dato**: Entero (Integer)
- **Descripción**: Edad del niño/niña
- **Rango**: 1 - 60 (según unidad de medida)
- **Valores nulos**: Posible
- **Relación**: Debe interpretarse con `uni_med_`

#### `uni_med_`
- **Tipo de dato**: Entero (Integer)
- **Descripción**: Unidad de medida de la edad
- **Valores**:
  - `1` = Meses
  - `2` = Años
  - `3` = Días
- **Valores nulos**: No
- **Ejemplo**: Si edad_=24 y uni_med_=1, entonces 24 meses (2 años)

#### `sexo_`
- **Tipo de dato**: Texto (String)
- **Descripción**: Sexo biológico del paciente
- **Valores**:
  - `M` = Masculino
  - `F` = Femenino
- **Valores nulos**: No
- **Distribución**: ~50% cada género

---

### 3. Variables Geográficas

#### `nombre_barrio`
- **Tipo de dato**: Texto (String)
- **Descripción**: Nombre del barrio de residencia del paciente
- **Valores**: Variables (múltiples barrios de Medellín)
- **Valores especiales**: 
  - `"SIN INFORMACION"` cuando no se conoce
- **Ejemplo**: "Picacho", "Santo Domingo Savio No.2", "Villa Hermosa"

#### `comuna`
- **Tipo de dato**: Texto (String)
- **Descripción**: Comuna o corregimiento de residencia
- **Valores**: 16 comunas + corregimientos de Medellín
- **Valores nulos**: Puede tener "SIN INFORMACION"
- **Ejemplo**: "Doce de Octubre", "Popular", "Villa Hermosa", "Belen"

---

### 4. Variables del Sistema de Salud

#### `tipo_ss_`
- **Tipo de dato**: Texto (String)
- **Descripción**: Tipo de sistema de seguridad social
- **Valores**:
  - `S` = Subsidiado
  - `C` = Contributivo
  - `P` = Particular
  - `N` = No afiliado
- **Valores nulos**: Puede tener valores vacíos
- **Uso**: Clasificación socioeconómica

#### `cod_ase_`
- **Tipo de dato**: Texto (String)
- **Descripción**: Código de la aseguradora o entidad de salud
- **Formato**: Alfanumérico (EPS001, CCF002, ESS133, etc.)
- **Valores**: Múltiples aseguradoras
- **Ejemplo**: "CCF002", "EPS010", "EPSS16", "RES004"

---

### 5. Variables Clínicas Temporales

#### `fec_con_`
- **Tipo de dato**: Fecha (String en formato DD/MM/YYYY)
- **Descripción**: Fecha de la consulta o registro del caso
- **Formato**: DD/MM/YYYY
- **Rango**: Año 2016
- **Ejemplo**: "30/03/2016", "05/07/2016"

#### `ini_sin_`
- **Tipo de dato**: Fecha (String en formato DD/MM/YYYY)
- **Descripción**: Fecha de inicio de síntomas
- **Formato**: DD/MM/YYYY
- **Valores especiales**: 
  - `01/01/1900` indica fecha no disponible o no reportada
- **Ejemplo**: "30/03/2016", "01/06/2016"

---

### 6. Variables de Clasificación del Caso

#### `tip_cas_`
- **Tipo de dato**: Entero (Integer)
- **Descripción**: Tipo de caso epidemiológico
- **Valores**:
  - `4` = Caso confirmado (predominante en el dataset)
- **Valores nulos**: No
- **Uso**: Clasificación epidemiológica

#### `pac_hos_`
- **Tipo de dato**: Entero (Integer)
- **Descripción**: Paciente hospitalizado
- **Valores**:
  - `1` = Sí, paciente hospitalizado
  - `2` = No, paciente ambulatorio
- **Valores nulos**: No
- **Uso**: Indicador de severidad del caso

---

### 7. Variables Perinatales

#### `peso_nac`
- **Tipo de dato**: Entero (Integer)
- **Descripción**: Peso al nacer en gramos
- **Rango**: 900 - 4,500 gramos (aprox.)
- **Valores**: `0` indica dato no disponible
- **Valores nulos**: Sí (representados como 0)
- **Ejemplo**: 2800, 2600, 3300

#### `talla_nac`
- **Tipo de dato**: Entero (Integer)
- **Descripción**: Talla (longitud) al nacer en centímetros
- **Rango**: 30 - 54 cm (aprox.)
- **Valores**: `0` indica dato no disponible
- **Valores nulos**: Sí (representados como 0)
- **Ejemplo**: 49, 48, 52

#### `edad_ges`
- **Tipo de dato**: Entero (Integer)
- **Descripción**: Edad gestacional en semanas
- **Rango**: 26 - 42 semanas
- **Valores**: `0` indica dato no disponible
- **Valores nulos**: Sí (representados como 0)
- **Interpretación**:
  - < 37 semanas = Prematuro
  - 37-42 semanas = A término
  - > 42 semanas = Postérmino
- **Ejemplo**: 40, 39, 38

---

### 8. Variables Nutricionales y de Cuidado

#### `t_lechem`
- **Tipo de dato**: Entero (Integer)
- **Descripción**: Tipo de lactancia materna
- **Valores**:
  - `0` = No información
  - `1` = Lactancia materna exclusiva 0-6 meses
  - `2` = Lactancia complementaria
  - `3` = Lactancia hasta los 6 meses
  - `6` = Sin lactancia materna
  - Otros códigos específicos del sistema
- **Ejemplo**: 6, 0, 1

#### `e_complem`
- **Tipo de dato**: Entero (Integer)
- **Descripción**: Estado de alimentación complementaria
- **Valores**:
  - `0` = No información
  - `1` = Adecuada
  - `6` = Inadecuada o tardía
  - `7` = Iniciada tempranamente
  - Otros valores
- **Ejemplo**: 0, 1, 6

#### `crec_dllo`
- **Tipo de dato**: Entero (Integer)
- **Descripción**: Seguimiento de crecimiento y desarrollo
- **Valores**:
  - `1` = Asiste a controles
  - `2` = No asiste regularmente
- **Valores nulos**: No
- **Uso**: Indicador de adherencia a controles médicos

#### `esq_vac`
- **Tipo de dato**: Entero (Integer)
- **Descripción**: Estado del esquema de vacunación
- **Valores**:
  - `1` = Completo para la edad
  - `2` = Incompleto
  - `3` = Sin vacunas
- **Valores nulos**: No
- **Uso**: Indicador de acceso a servicios de salud

#### `carne_vac`
- **Tipo de dato**: Entero (Integer)
- **Descripción**: Posesión de carné de vacunación
- **Valores**:
  - `1` = Tiene carné
  - `2` = No tiene carné
- **Valores nulos**: No
- **Uso**: Verificación de registros de salud

---

### 9. Variables Antropométricas Actuales ⭐ (PRINCIPALES)

Estas son las variables clave utilizadas por el modelo de Machine Learning para la predicción.

#### `peso_act`
- **Tipo de dato**: Decimal (Float)
- **Descripción**: Peso actual del niño en kilogramos
- **Rango**: 4.9 - 20.0 kg (aprox.)
- **Decimales**: 1-2 decimales
- **Valores nulos**: Raros (dataset limpio)
- **Ejemplo**: 8.5, 11.0, 6.6
- **Importancia**: ⭐⭐⭐⭐⭐ Variable crítica para el modelo

#### `talla_act`
- **Tipo de dato**: Decimal (Float)
- **Descripción**: Talla (altura) actual del niño en centímetros
- **Rango**: 62.5 - 120.0 cm (aprox.)
- **Decimales**: 0-2 decimales
- **Valores nulos**: Raros (dataset limpio)
- **Ejemplo**: 79, 90, 81.6
- **Importancia**: ⭐⭐⭐⭐⭐ Variable crítica para el modelo

#### `per_braqu`
- **Tipo de dato**: Decimal (Float)
- **Descripción**: Perímetro braquial (circunferencia del brazo) en centímetros
- **Rango**: 0 - 16.0 cm (aprox.)
- **Valores**: `0` indica dato no disponible
- **Valores nulos**: Muchos casos con 0
- **Interpretación**:
  - < 11.5 cm = Desnutrición severa
  - 11.5 - 12.5 cm = Riesgo de desnutrición
  - > 12.5 cm = Normal
- **Ejemplo**: 0, 13, 13.5, 14.5, 15
- **Importancia**: ⭐⭐⭐⭐ Variable importante (opcional en el modelo)

---

### 10. Variable de Clasificación (Target)

#### `evento`
- **Tipo de dato**: Texto (String)
- **Descripción**: Tipo de evento epidemiológico
- **Valor único**: "DESNUTRICION AGUDA EN MENORES DE 5 AÑOS"
- **Uso**: Clasificación del dataset
- **Nota**: Todos los registros corresponden al mismo evento

---

## 🎯 Variables Utilizadas en el Modelo ML

El modelo de Machine Learning utiliza las siguientes **4 variables principales**:

| Variable | Nombre en Modelo | Tipo | Importancia |
|----------|------------------|------|-------------|
| `edad_` + `uni_med_` | `edad_meses` | Float | ⭐⭐⭐⭐⭐ |
| `peso_act` | `peso_kg` | Float | ⭐⭐⭐⭐⭐ |
| `talla_act` | `talla_cm` | Float | ⭐⭐⭐⭐⭐ |
| `per_braqu` | `per_braqu_cm` | Float | ⭐⭐⭐⭐ |

### Transformaciones Aplicadas

1. **Edad**: Se convierte a meses según `uni_med_`
   - Si `uni_med_ = 1` (meses): edad directa
   - Si `uni_med_ = 2` (años): edad * 12
   - Si `uni_med_ = 3` (días): edad / 30.44

2. **Perímetro Braquial**: Valores 0 se tratan como datos faltantes

3. **Normalización**: Las variables se normalizan antes del entrenamiento

---

## 📈 Estadísticas Descriptivas

### Variables Antropométricas (Valores Aproximados)

| Variable | Mínimo | Máximo | Media | Mediana |
|----------|--------|--------|-------|---------|
| Edad (meses) | 0 | 60 | 18 | 15 |
| Peso (kg) | 4.9 | 20.0 | 9.5 | 9.0 |
| Talla (cm) | 62.5 | 120.0 | 85.0 | 83.0 |
| Perímetro (cm) | 0 | 16.0 | 13.0 | 13.5 |

---

## 🔍 Notas Importantes

### Valores Especiales

- **`0`**: En variables como `peso_nac`, `talla_nac`, `per_braqu` indica dato no disponible
- **`01/01/1900`**: En fechas indica fecha no reportada
- **`"SIN INFORMACION"`**: En variables de texto indica dato desconocido

### Calidad de Datos

- **Completitud**: ~85% de los datos principales están completos
- **Consistencia**: Datos validados por el sistema de vigilancia epidemiológica
- **Precisión**: Mediciones realizadas por personal de salud capacitado

### Consideraciones Éticas

- Los datos han sido **anonimizados**
- No contienen información personal identificable
- Uso exclusivo para **investigación y desarrollo** de herramientas de apoyo diagnóstico

---

## 📚 Referencias

- **Sistema de Vigilancia Epidemiológica**: SIVIGILA
- **Entidad**: Secretaría de Salud de Medellín
- **Periodo**: Año 2016
- **Clasificación**: Desnutrición aguda en menores de 5 años (Código CIE-10)

---

## 📞 Contacto

Para más información sobre el dataset o el modelo de predicción, consulte el README principal del proyecto.

---

**Última actualización**: Octubre 2025  
**Versión del documento**: 1.0
