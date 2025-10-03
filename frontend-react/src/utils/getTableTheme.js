const getTableTheme = (darkMode) => ({
    components: {
        Table: {
            colorText: darkMode ? 'var(--dark-text-primary)' : 'var(--light-text-primary)',
            colorTextHeading: darkMode ? 'var(--dark-text-primary)' : 'var(--light-text-primary)',
            headerBorderRadius: 8,
            headerFilterHoverBg: darkMode ? 'var(--dark-surface-secondary)' : 'var(--light-surface-secondary)',
            headerSortHoverBg: darkMode ? 'var(--dark-surface-secondary)' : 'var(--light-surface-secondary)',
            expandIconBg: darkMode ? 'var(--dark-surface-primary)' : 'var(--light-surface-primary)',
            filterDropdownBg: darkMode ? 'var(--dark-surface-primary)' : 'var(--light-surface-primary)',
            filterDropdownMenuBg: darkMode ? 'var(--dark-surface-primary)' : 'var(--light-surface-primary)',
            rowHoverBg: darkMode ?
                'rgba(var(--dark-primary-rgb), 0.15)' :
                'rgba(var(--light-primary-rgb), 0.08)',
            headerBg: darkMode ? 'var(--dark-surface-primary)' : 'var(--light-surface-primary)',
            headerColor: darkMode ? 'var(--dark-text-primary)' : 'var(--light-text-primary)',
            colorBgContainer: darkMode ? 'var(--dark-background)' : 'var(--light-background)',
            borderColor: darkMode ? 'var(--dark-border-default)' : 'var(--light-border-default)',
            bodySortBg: darkMode ? 'var(--dark-surface-primary)' : 'var(--light-surface-primary)',
            headerSortActiveBg: darkMode ? 'var(--dark-surface-secondary)' : 'var(--light-surface-secondary)',
            cellFontSize: 14,
            cellPaddingBlock: 16,
            cellPaddingInline: 16,
            footerBg: darkMode ? 'var(--dark-surface-primary)' : 'var(--light-surface-primary)',
            footerColor: darkMode ? 'var(--dark-text-secondary, var(--dark-text-primary))' : 'var(--light-text-secondary, var(--light-text-primary))',
            headerSplitColor: darkMode ? 'var(--dark-border-default)' : 'var(--light-border-default)',
            rowSelectedBg: darkMode ? 'rgba(var(--dark-primary-rgb), 0.1)' : 'rgba(var(--light-primary-rgb), 0.1)',
            rowSelectedHoverBg: darkMode ? 'rgba(var(--dark-primary-rgb), 0.2)' : 'rgba(var(--light-primary-rgb), 0.2)',
            stickyScrollBarBg: darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)', // Consider adjusting this if you want to avoid black even in hover elements.
        },
        Pagination: {
            colorPrimary: darkMode ? 'var(--dark-primary)' : 'var(--light-primary)',
            colorText: darkMode ? 'var(--dark-text-primary)' : 'var(--light-text-primary)',
            colorBgContainer: darkMode ? 'var(--dark-surface-primary)' : 'var(--light-surface-primary)',
            colorBgTextHover: darkMode ? 'var(--dark-surface-secondary)' : 'var(--light-surface-secondary)',
            colorBorder: darkMode ? 'var(--dark-border-default)' : 'var(--light-border-default)',
            colorTextDisabled: darkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)',
            itemActiveBg: darkMode ? 'var(--dark-surface-primary)' : 'var(--light-surface-primary)',
            itemBg: darkMode ? 'var(--dark-surface-primary)' : 'var(--light-surface-primary)',
            itemLinkBg: darkMode ? 'var(--dark-surface-primary)' : 'var(--light-surface-primary)',
            itemActiveBgDisabled: darkMode ? 'var(--dark-surface-secondary)' : 'var(--light-surface-secondary)',
            itemInputBg: darkMode ? 'var(--dark-surface-primary)' : 'var(--light-surface-primary)',
        },
    },
});

export default getTableTheme;
