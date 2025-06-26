import type { Config } from 'tailwindcss'

const config: Config = {
  future: {
    useClassicEngine: true,
  },
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config
