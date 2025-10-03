export const getChartTheme = (darkMode) => ({
    textColor: darkMode ? 'var(--color-dark-primary)' : 'var(--color-light-primary)',
    background: darkMode ? 'var(--color-dark-background)' : 'var(--color-light-background)',
    surfacePrimary: darkMode ? 'var(--color-dark-surface-primary)' : 'var(--color-light-surface-primary)',
    chartColors: [
        darkMode ? 'var(--color-dark-primary-color)' : 'var(--color-light-primary-color)',
        darkMode ? 'var(--color-dark-secondary-color)' : 'var(--color-light-secondary-color)',
        darkMode ? 'var(--color-dark-accent-color)' : 'var(--color-light-accent-color)',
    ],
    gridColor: darkMode ? 'var(--border-color-dark)' : 'var(--border-color-light)',
    tooltip: {
        background: darkMode ? 'var(--color-dark-surface-secondary)' : 'var(--color-light-surface-secondary)',
        border: darkMode ? 'var(--border-color-dark)' : 'var(--border-color-light)',
    }
});