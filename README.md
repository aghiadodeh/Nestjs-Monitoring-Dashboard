# Nestjs Monitoring Dashboard
Monitoring Dashboard built for [NestJS-Monitoring](https://www.npmjs.com/package/nestjs-monitoring)

This dashboard built with [xAngular-CMS](https://www.npmjs.com/package/@x-angular/cms)

## Screenshots:
| | |
|:-------------------------:|:-------------------------:|
|<img src="https://github.com/aghiadodeh/Nestjs-Monitoring-Dashboard/blob/main/screenshots/Analyze.png?raw=true">|<img src="https://github.com/aghiadodeh/Nestjs-Monitoring-Dashboard/blob/main/screenshots/Requests.png?raw=true">
|<img src="https://github.com/aghiadodeh/Nestjs-Monitoring-Dashboard/blob/main/screenshots/Request_Exception.png?raw=true">|<img src="https://github.com/aghiadodeh/Nestjs-Monitoring-Dashboard/blob/main/screenshots/DB.png?raw=true">
|<img src="https://github.com/aghiadodeh/Nestjs-Monitoring-Dashboard/blob/main/screenshots/Job.png?raw=true">|<img src="https://github.com/aghiadodeh/Nestjs-Monitoring-Dashboard/blob/main/screenshots/Request_Details.png?raw=true">

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.0.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Setup:
You can inject your environment configurations globally in the `src/app/environments/environment.ts`:
```typescript
const baseUrl = "http://localhost:3000"; // change to your server BASE-URL
export const environment = {
    SERVER_BASE_URL: baseUrl,
    API_URL: `${baseUrl}/api`, // api is the global prefix
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
```