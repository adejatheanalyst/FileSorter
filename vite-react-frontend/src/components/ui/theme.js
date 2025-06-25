// theme.js
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const customTheme = defineConfig({
    theme:{
        tokens:{
            colors: {
                brand: {
                    50:  "#f5faff",
                    100: "#d6eaff",
                    200: "#a8ccff",
                    300: "#78adff",
                    400: "#4a8fff",
                    500: "#1b71ff", // main color
                    600: "#0056e6",
                    700: "#0042b4",
                    800: "#002e82",
                    900: "#001951",
                },
            },
        }
    }

});

export const system = createSystem(defaultConfig, customTheme);
