// Smooth scroll utility with offset for fixed header
export function smoothScrollToAnchor(href: string, offset: number = 100) {
    // Check if it's an anchor link
    if (!href.startsWith('#')) return;

    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = targetPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}
