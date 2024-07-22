import { defineConfig } from "@pandacss/dev"
import { createPreset } from '@park-ui/panda-preset'

export default defineConfig({
    preflight: true,
    presets: [
        '@pandacss/preset-base',
        createPreset({
            accentColor: 'tomato',
            grayColor: 'slate',
            borderRadius: '2xl',
        }),
    ],
    include: [
        "./app/routes/**/*.{ts,tsx,js,jsx}",
        "./app/components/**/*.{ts,tsx,js,jsx}",
    ],
    exclude: [],
    jsxFramework: 'react',
    outdir: "styled-system",
    theme: {
        extend: {
            tokens: {
                fonts: {
                    dosis: {
                        value: 'var(--font-dosis), sans-serif',
                    },
                },
            },
            breakpoints: {
                '9xl': '1600px',
            }
        },
    },
})
