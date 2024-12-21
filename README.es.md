**🌍 Disponible en Español | [Available in English](README.md)**

# <img src="./packages/nextjs/public/logo2.png" alt="Logo" height="30">SimpleDEX: Un AMM Básico Basado en la Fórmula de Producto Constante

<h4 align="center">
   <a href="https://marioparodi.vercel.app/">Sitio Web</a>
</h4>

### 🗂️ Contenido

1. [Descripción](#-qué-es-simpledex)
2. [Características Clave](#-características-clave)
3. [Capturas de Pantalla](#-capturas-de-pantalla)
4. [Herramientas y Tecnologías](#️-herramientas-y-tecnologías)
5. [Requisitos](#-requisitos)
6. [Inicio Rápido](#-inicio-rápido)
7. [Cómo Funciona](#️-cómo-funciona)
8. [Agradecimientos](#-agradecimientos)
9. [Licencia](#-licencia)

### 📖 #¿Qué es SimpleDEX? 

**SimpleDEX** es un intercambio descentralizado (DEX) basado en un modelo *Automated Market Maker (AMM)* utilizando la fórmula de producto constante: 

\[ 
x * y = k 
\]

Donde:
- \( x \): La cantidad de Token A.
- \( y \): La cantidad de Token B.
- \( k \): Una constante que asegura que los precios se ajusten dinámicamente según la oferta y la demanda.

Este mecanismo permite a los usuarios intercambiar tokens sin necesidad de un libro de órdenes, utilizando un contrato inteligente para gestionar las transacciones y mantener la liquidez.

### Fórmula Completa del Producto Constante

La relación entre los cambios en el Token A (\(dx\)) y el Token B (\(dy\)) se define como:

$$
(x + dx) \cdot (y - dy) = k
$$

Donde:
- \(x\): Cantidad inicial de Token A en el pool.
- \(y\): Cantidad inicial de Token B en el pool.
- \(dx\): Incremento de Token A añadido al pool (entrada de intercambio).
- \(dy\): Decremento de Token B retirado del pool (salida de intercambio).
- \(k\): Valor constante que asegura que el producto de las cantidades permanezca sin cambios.

Reorganizando para resolver por \(dy\):

$$
dy = \frac{y \cdot dx}{x + dx}
$$

Esta fórmula asegura que el pool mantenga su producto constante mientras ajusta dinámicamente los precios durante los intercambios.

### Fórmula de Precios

El precio del Token A en términos de Token B se puede calcular utilizando:

$$
\text{Precio de Token A} = \frac{\Delta y}{\Delta x}
$$

Donde:
- $\Delta x$: Cambio en la cantidad de Token A.
- $\Delta y$: Cambio en la cantidad de Token B.

### 📈 Curva de Precios y Liquidez

La curva de producto constante describe cómo cambian los precios de los tokens según sus cantidades en el pool de liquidez. A continuación se muestra una representación gráfica de cómo funciona esta curva:

![Curva de Producto Constante](./packages/nextjs/public/images/Curve%20amm-es.png)

### 📌 Características Clave 

- **Proveer Liquidez**: Los usuarios pueden agregar tokens al pool.
- **Intercambio de Tokens**: Permite intercambios directos entre dos tokens.
- **Retirar Liquidez**: Recupera los tokens proporcionados.

### 📸 Capturas de Pantalla 

Aquí tienes algunas capturas de pantalla de la DApp en funcionamiento:

1. **Interfaz Principal de Intercambio**  
   ![Captura de Pantalla 1](./packages/nextjs/public/images/Main%20Interface%20Swap.jpg)

2. **Agregar y Retirar Liquidez**  
   ![Captura de Pantalla 2](./packages/nextjs/public/images/Add%20and%20remove%20Liquidity.jpg)

3. **Generar Tokens**  
   ![Captura de Pantalla 3](./packages/nextjs/public/images/Mint%20Tokens.jpg)

### 🛠️ Herramientas y Tecnologías 

![Scaffold-ETH](https://img.shields.io/badge/Scaffold--ETH-gray?style=plastic&logo=ethereum) ![Next.js](https://img.shields.io/badge/Next.js-black?style=plastic&logo=next.js) ![React](https://img.shields.io/badge/React-blue?style=plastic&logo=react) ![Solidity](https://img.shields.io/badge/Solidity-darkblue?style=plastic&logo=solidity) ![Hardhat](https://img.shields.io/badge/Hardhat-lightgray?style=plastic&logo=ethereum) ![Wagmi](https://img.shields.io/badge/Wagmi-orange?style=plastic&logo=react) ![Viem](https://img.shields.io/badge/Viem-purple?style=plastic&logo=ethereum) ![DaisyUI](https://img.shields.io/badge/DaisyUI-green?style=plastic&logo=tailwindcss) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-cyan?style=plastic&logo=tailwindcss) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=plastic&logo=vercel&logoColor=white)



### 📝 Requisitos

Antes de comenzar, asegúrate de tener instaladas las siguientes herramientas:

- [Node (>= v18.18)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) o [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

### 🚀 Inicio Rápido 

Para comenzar con **SimpleDEX**, sigue estos pasos:

1. Instala las dependencias si no se han instalado aún:

```
cd my-dapp-example
yarn install
```

2. Ejecuta una red local en el primer terminal:

```
yarn chain
```

Este comando inicia una red local de Ethereum utilizando Hardhat. La red se ejecuta en tu máquina local y se puede usar para pruebas y desarrollo. Puedes personalizar la configuración de la red en `packages/hardhat/hardhat.config.ts`.

3. En el segundo terminal, despliega los contratos de prueba:

```
yarn deploy
```

Este comando despliega los contratos inteligentes en la red local. Los contratos se encuentran en `packages/hardhat/contracts` y pueden ser modificados según tus necesidades. El comando `yarn deploy` usa los scripts de despliegue ubicados en `packages/hardhat/deploy` para desplegar los contratos en la red. También puedes personalizar los scripts de despliegue.

4. En el tercer terminal, inicia tu aplicación NextJS:


```
yarn start
```

Visita tu aplicación en: `http://localhost:3000`. ya Puedes interactuar con tu Dapp SimpleDEX`.

### ⚙️ Cómo Funciona 

Sigue estos pasos para usar la DApp:

1. **Conecta tu billetera**:  
   Abre la DApp y conecta tu billetera usando MetaMask u otra billetera Web3.

2. **Genera Token A y Token B**:  
   Usa la funcionalidad de "Mint" para generar ambos tokens necesarios para proporcionar liquidez.

3. **Proveer Liquidez**:  
   Agrega tanto Token A como Token B al pool de liquidez.

4. **Realizar Intercambios**:  
   Intercambia entre Token A y Token B directamente usando la interfaz de intercambio.

5. **Retirar Liquidez**:  
   Recupera tu liquidez.

---
### 🙏 Agradecimientos 

Este proyecto fue desarrollado como parte del **[Ethereum Developer Pack](https://www.ethkipu.org/es#edp)** ofrecido por **[ETH-Kipu](https://www.ethkipu.org/es)**. 

Un agradecimiento especial a mis instructores:
- [Cristian Marchese](https://www.linkedin.com/in/cristian-marchese-576034148/?originalSubdomain=ar)
- [Juan David Reyes](https://www.linkedin.com/in/jdreyespaez/)

Su mentoría ha sido fundamental en mi camino hacia el desarrollo de blockchain y programación en Solidity.

### 📝 Licencia 

Este proyecto está licenciado bajo la **Licencia MIT**. 

Puedes usar, modificar y distribuir este software siempre que se incluya la licencia original y el aviso de copyright en todas las copias o partes sustanciales del software.

Consulta el archivo [LICENSE](./LICENCE) para más detalles.