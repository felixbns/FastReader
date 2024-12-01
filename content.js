const applyBold = () => {
    const paragraphs = document.querySelectorAll("p");
    paragraphs.forEach(p => {
        const textNodes = Array.from(p.childNodes).filter(node => node.nodeType === Node.TEXT_NODE);
        textNodes.forEach(textNode => {
            const modifiedText = textNode.textContent.split(" ").map(word => {
                const length = word.length;
                if (word.includes("'")) {
                    const parts = word.split("'");
                    if (parts[1]) {
                        const n = Math.ceil(length / 2.5);
                        const prefix = `<strong>${parts[0].slice(0, n+1)}` + "'" + `</strong>`;
                        const boldPart = `<strong>${parts[1].slice(0, n)}</strong>`;
                        const rest = parts[1].slice(n);
                        return `${prefix}${boldPart}${rest}`;
                    }
                }
                if (length <= 3) {
                    const n = Math.ceil(length / 1);
                    return `<strong>${word.slice(0, n)}</strong>${word.slice(n)}`;
                } else {
                    const n = Math.ceil(length / 2.5);
                    return `<strong>${word.slice(0, n)}</strong>${word.slice(n)}`;
                }
            }).join(" ");
            // Remplace uniquement le nœud texte par du HTML
            const span = document.createElement("span");
            span.innerHTML = modifiedText;
            textNode.parentNode.replaceChild(span, textNode);
        });
    });
};



const removeBold = () => {
    const paragraphs = document.querySelectorAll("p");
    paragraphs.forEach(p => {
        const strongTags = p.querySelectorAll("strong");
        strongTags.forEach(strong => {
            // Remplace la balise <strong> par son contenu texte
            const textNode = document.createTextNode(strong.textContent);
            strong.parentNode.replaceChild(textNode, strong);
        });
    });
};

applyBold();