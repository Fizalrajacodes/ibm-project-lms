# LMS Frontend

## Setup instruction



```bash
    cd client
```
 Install dependencies

```bash
    npm install
```
run the server

```bash
    npm run dev
```

### Setup instruction for Tailwind Css

[Tailwind css docs](https://tailwindcss.com/docs/installation)

1. Install Tailwind Css

```bash
    npm install -D tailwindcss postcss autoprefixer
```

2. Create `tailwind.config.js` file

```bash
    npx tailwindcss init -p
```

3. Configure your template paths in `tailwind.config.js`

```bash
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
```

4. Add the Tailwind directives to your CSS

```bash
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
```

5. install plugins and dependencies

```bash
    npm install react-router-dom  react-icons axios react-redux @reduxjs/toolkit react-chartjs-2 chart.js daisyui react-toastify @tailwindcss/line-clamp @emailjs/browser
```

6.  Add plugin in `tailwind.config.js`

```bash
    plugins: [require('daisyui')]
```
