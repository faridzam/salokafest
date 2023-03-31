import { createTheme } from "@mui/material/styles";

export const theme = createTheme({

    palette: {
        primary: {
            lightest: '#73c1a9',
            light: '#45ad8d',
            main: '#169870',
            dark: '#107254',
            darkest: '#0b4c38',
            text: '#fff',
            contrasText: '#fff',
        },
        secondary: {
            lightest: '#f8c575',
            light: '#f5b247',
            main: '#F39F19',
            dark: '#b67713',
            darkest: '#7a500d',
            text: '#fff',
            contrasText: '#fff',
        },
        brown: {
            lightest: '#d9c1a0',
            light: '#ccad80',
            main: '#bf9860',
            dark: '#8f7248',
            darkest: '#604c30',
            text: '#fff',
            contrasText: '#fff',
        },
        red: {
            lightest: '#f77c76',
            light: '#f45049',
            main: '#f1241b',
            dark: '#b51b14',
            darkest: '#79120e',
            text: '#fff',
            contrasText: '#fff',
        },
        blue: {
            lightest: '#789acf',
            light: '#4b78bf',
            main: '#1e56af',
            dark: '#164183',
            darkest: '#0f2b58',
            text: '#fff',
            contrasText: '#fff',
        },
        white: {
            lightest: '#ffffff',
            light: '#eeeeee',
            main: '#dddddd',
            dark: '#cccccc',
            darkest: '#bbbbbb',
            text: '#fff',
            contrasText: '#fff',
        },
        black: {
            lightest: '#000000',
            light: '#111111',
            main: '#222222',
            dark: '#333333',
            darkest: '#444444',
            text: '#fff',
            contrasText: '#fff',
        },
    },
    rainbow: {
        palette:{
            primary: {
                lightest: '#73c1a9',
                light: '#45ad8d',
                main: '#169870',
                dark: '#107254',
                darkest: '#0b4c38',
                text: '#fff',
                contrasText: '#fff',
            },
            secondary: {
                lightest: '#f8c575',
                light: '#f5b247',
                main: '#F39F19',
                dark: '#b67713',
                darkest: '#7a500d',
                text: '#fff',
                contrasText: '#fff',
            },
            brown: {
                lightest: '#d9c1a0',
                light: '#ccad80',
                main: '#bf9860',
                dark: '#8f7248',
                darkest: '#604c30',
                text: '#fff',
                contrasText: '#fff',
            },
            red: {
                lightest: '#f77c76',
                light: '#f45049',
                main: '#f1241b',
                dark: '#b51b14',
                darkest: '#79120e',
                text: '#fff',
                contrasText: '#fff',
            },
            blue: {
                lightest: '#789acf',
                light: '#4b78bf',
                main: '#1e56af',
                dark: '#164183',
                darkest: '#0f2b58',
                text: '#fff',
                contrasText: '#fff',
            },
        }
    },
    breakpoints: {
        values: {
            mobile: 0,
            tablet: 640,
            laptop: 1024,
            desktop: 1200,
        },
    },

});