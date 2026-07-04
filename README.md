# 🎯 Today App

[![React](https://img.shields.io/badge/React-19.0-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646cff?style=flat-square&logo=vite)](https://vite.dev/)

Una aplicación web de productividad minimalista diseñada para optimizar la gestión de tareas diarias mediante una interfaz fluida con busqueda y filtrado por categorias, junto con persistencia de datos local. El proyecto se desarrolló enfocandose en la separación de responsabilidades y principios de arquitectura limpia por capas basandose en las prácticas de `DDD` (Domain-Driven Design) y `Atomic Design` (UI/UX) para garantizar código robusto, mantenible y escalable.


## 💻 App

> 🚀 **¡Probá la aplicación en tiempo real!** Podés usar la app siguiendo el enlace: **[example.app](https://tu-url.app)**


## 🌟 Features

* **Arquitectura por Capas:** Implementación de un Dominio, Estado y Presentación. Usando interfaces, hooks y componentes para asegurar un contrato solido.
* **Componentes Modulares y Estilizados:** Interfaz minimalista construida íntegramente con `Styled Components`, asegurando un aislamiento absoluto de estilos y un diseño altamente responsivo.
* **Búsqueda y Filtrado Dinámico:** Sistema de filtrado y búsqueda ágil en tiempo real integrado en la interfaz para segmentar y localizar tareas de forma inmediata.
* **Persistencia de Datos Local:** Todas las tareas están a salvó en el navegador!
* **Fácil de Usar:** Una UI pensada para la comodidad visual y de uso. Se divide en una sección dedicada a la busqueda y filtrado para dar paso al corazón de la app: Anotar todas tus tareas que necesitas cumplir! 


## 🛠️ Stack Tecnológico

| Categoría | Tecnología | Propósito / Justificación |
| :--- | :--- | :--- |
| **Core Frontend** | React | Construcción de una interfaz de usuario declarativa, basada en componentes modulares. |
| **Lenguaje** | TypeScript | Implementación de tipado estricto para garantizar la robustez del código y prevenir errores en desarrollo. |
| **Empaquetador** | Vite | Entorno de desarrollo ultra veloz con hot-reload inmediato y optimización avanzada del build de producción gracias Rolldown a escrito en Rust. |
| **Estilos** | Styled Components | Estilos encapsulados a nivel de componente (CSS-in-JS), facilitando el mantenimiento y evitando colisiones globales. |
| **Calidad de Código** | EsLint y StyleLint | Analizadores estáticos para asegurar las mejores prácticas de código. |
| **Entorno de Pruebas** | Vitest y RTL | Suite de testing moderna y de alto rendimiento, totalmente integrada con la configuración nativa del empaquetador. |


## 🏗️ Arquitectura y Estructura de Carpetas

El proyecto implementa un enfoque modular basado en la separación absoluta de responsabilidades (Separation of Concerns). Los componentes visuales, la lógica de estado global y los esquemas de tipado se encuentran estrictamente desacoplados:

```text
src/
├── components/             # Capa de Presentación: Componentes de la interfaz de usuario (UI)
│   ├── atoms/              # Componentes atómicos reutilizables e indivisibles (Button, Input, etc)
│   ├── molecules/          # Unidades funcionales que combinan componentes atómicos
│   ├── organisms/          # Componentes con características completas: pueden manejar eventos y lógica de ui interna
│   ├── pages/              # Componentes inteligentes que unen las capas de la aplicación
│   └── templates/          # Componentes estructurales de UI la aplicación
├── core/                   # Capa de Dominio: define entidades y reglas de negocio
│   ├── task.entity.ts      # Define la fuente de verdad del dominio, qué datos se aceptan
│   └── task.logic.ts       # Comportamiento del dominio: funciones puras asociadas a la entidad. Define cómo se usaran los datos
├── hooks/                  # Capa de Estado: Custom Hooks para extraer la lógica
│   └── useTasks.ts         # Orquestador entre la UI y el sistema para exponer las acciones que puede realizar en la app
├── services/               # Da acceso al almacenamiento de datos
│   └── storage.service.ts  # Servicio que hace posible la persistencia de datos       
├── store/                  # Define las Acciones: lenguaje con el que la interfaz de usuario se comunica con el estado de la aplicación
│   └── task.reducer.ts     # Define los cambios que se producen en el sistema
├── styles/                 # Define los estilos que se usan en la app
│   ├── GlobalStyles.ts     # Estilo base de la aplicación
│   └── theme.ts            # Tokens de estilo que consumiran los componentes
├── App.tsx                 # Componente raíz y Orquestador de la aplicación
└── main.tsx                # Punto de entrada de la aplicación y renderizado en el DOM
```

## 🚀 Instalación y Ejecución Local

Para levantar el entorno de desarrollo local y ejecutar la aplicación en tu computadora, seguí estos pasos secuenciales:

1. **Clonar el repositorio:**
   Descargá una copia completa del proyecto a tu máquina local mediante la terminal.
   ```sh
   git clone [https://github.com/tu-usuario/today-app.git](https://github.com/tu-usuario/today-app.git)
   ```

2. Acceder al directorio:
Navegá hacia la carpeta raíz donde se encuentra la configuración del proyecto.

```sh
cd today-app
```

3. Instalar dependencias:
Descargá e instalá todos los paquetes y librerías necesarias especificadas en el archivo de configuración

```sh
npm install
```

4. Iniciar el servidor de desarrollo
Levantá el servidor local para visualizar y probar la aplicación en tiempo real en tu navegador

```sh
npm run dev
```   


**Suite de Pruebas (Testing):**

El proyecto cuenta con una cobertura de pruebas automatizadas para validar la consistencia de la lógica de negocio y las transiciones del estado global.

Ejecutar tests en modo interactivo (Watch Mode):
Ideal para el flujo de trabajo diario mientras modificás el código fuente

```sh
npm run test
```

Ejecutar tests en modo de producción (CI Run)
Realiza una pasada única y completa de toda la suite de pruebas, ideal para entornos de integración continua

```sh
npm run test:run
```