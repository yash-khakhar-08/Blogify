export const isEmptyContent = (html: string) => {
    const text = html
        .replace(/<[^>]*>/g, '')  
        .replace(/&nbsp;/g, '')   
        .trim()

    return text.length === 0
}

export const normalizeContent = (html: string): string => {
    
    if (!html) return ''

    const container = document.createElement('div');
    container.innerHTML = html

    container.querySelectorAll('*').forEach(node => {
        node.childNodes.forEach(child => {
            if (child.nodeType === Node.TEXT_NODE) {
                child.textContent = child.textContent!
                    .replace(/\s+/g, ' ')
                    .trim()
            }
        })
    })

    const paragraphs = Array.from(container.querySelectorAll('p'))

    let previousWasEmpty = false

    paragraphs.forEach(p => {
        const hasText = p.textContent?.trim().length !== 0

        const hasMedia = p.querySelector(
            'img, video, iframe, embed, object, svg'
        ) !== null

        const isEmpty = !hasText && !hasMedia

        if (isEmpty && previousWasEmpty) {
            p.remove()
        }

        previousWasEmpty = isEmpty
    })

    while (container.firstElementChild?.tagName === 'P') {
        const p = container.firstElementChild as HTMLParagraphElement
        const hasText = p.textContent?.trim().length !== 0
        const hasMedia = p.querySelector(
            'img, video, iframe, embed, object, svg'
        )

        if (hasText || hasMedia) break
        p.remove()
    }

    while (container.lastElementChild?.tagName === 'P') {
        const p = container.lastElementChild as HTMLParagraphElement
        const hasText = p.textContent?.trim().length !== 0
        const hasMedia = p.querySelector(
            'img, video, iframe, embed, object, svg'
        )

        if (hasText || hasMedia) break
        p.remove()
    }

    return container.innerHTML.trim()
}


