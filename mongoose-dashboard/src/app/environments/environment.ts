const baseUrl = window.location.origin == "http://localhost:4200" ? "http://localhost:3000" : window.location.origin;
const orm: "mongoose" | "sequelize" = "mongoose";
export const environment = {
    orm,
    SERVER_BASE_URL: baseUrl,
    API_URL: `${baseUrl}/api`,
    PAGE_SIZE: 15,
    DEFAULT_COLOR: '#2196F3',
    DIALOG_CONFIGURATION: {
        width: '50vw',
        contentStyle: { overflow: 'auto' },
        breakpoints: {
            '960px': '75vw',
            '640px': '90vw'
        },
    },
}