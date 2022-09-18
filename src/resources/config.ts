export default function config(): {
    app_name: boolean|null,
} {
    return {
        app_name: import.meta.env.VITE_APP_NAME,
    }
}
