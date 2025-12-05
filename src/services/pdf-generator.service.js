import { jsPDF } from "jspdf";

/**
 * Serwis do generowania dokumentów PDF
 * @class PdfGeneratorService
 */
class PdfGeneratorService {
    /** @type {string} */
    #logoBase64 = null;
    
    /** @type {boolean} */
    #isLogoLoaded = false;
    
    /** @type {Object} - Konfiguracja dokumentu PDF */
    #pdfConfig = {
        orientation: "portrait",
        unit: "mm",
        format: "a4",
    };
    
    /** @type {Object} - Wymiary strony A4 */
    #pageSize = {
        width: 210,
        height: 297,
    };
    
    /** @type {Object} - Marginesy dokumentu */
    #margins = {
        top: 20,
        left: 20,
        right: 20,
        bottom: 20,
    };
    
    /** @type {Object} - Kolory z projektu */
    #colors = {
        primary: "#003e5a",
        secondary: "#A1C6EA",
        accent: "#F2F4F6",
        white: "#FFFFFF",
    };
    
    /** @type {Object} - Konfiguracja bannera z logo */
    #bannerConfig = {
        /** Wysokość bannera jako % wysokości strony */
        heightPercent: 0.15,
        /** Padding lewy/prawy jako % szerokości strony */
        horizontalPaddingPercent: 0.25,
        /** Padding dolny jako % wysokości strony */
        bottomPaddingPercent: 0.025,
    };

    constructor() {
        this.#loadLogo();
    }

    /**
     * Ładuje logo i konwertuje na base64
     * @private
     */
    async #loadLogo() {
        try {
            const logoPath = new URL(
                "../components/TlenovoLogo/logo.png",
                import.meta.url
            ).href;

            const response = await fetch(logoPath);
            const blob = await response.blob();
            
            this.#logoBase64 = await this.#blobToBase64(blob);
            this.#isLogoLoaded = true;
        } catch (error) {
            console.error("Błąd podczas ładowania logo:", error);
            this.#isLogoLoaded = false;
        }
    }

    /**
     * Konwertuje Blob na base64
     * @private
     * @param {Blob} blob
     * @returns {Promise<string>}
     */
    #blobToBase64(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }

    /**
     * Formatuje datę do formatu DD/MM/YYYY
     * @private
     * @param {Date} date
     * @returns {string}
     */
    #formatDate(date) {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        
        return `${day}/${month}/${year} r.`;
    }

    /**
     * Generuje zawartość Lorem Ipsum dla listy
     * @private
     * @returns {string[]}
     */
    #generateLoremIpsumList() {
        return [
            /* 1 linia */"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            /* 2 linia */"Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            /* 3 linia */"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
            /* 4 linia */"Duis aute irure dolor in reprehenderit in voluptate velit esse.",
            /* 5 linia */"Excepteur sint occaecat cupidatat non proident, sunt in culpa.",
            /* 6 linia */"Nulla facilisi morbi tempus iaculis urna id volutpat lacus.",
            /* 7 linia */"Pellentesque habitant morbi tristique senectus et netus et malesuada.",
            /* 8 linia */"Fames ac turpis egestas sed tempus urna et pharetra pharetra.",
            /* 9 linia */"Massa tincidunt dui ut ornare lectus sit amet est placerat.",
            /* 10 linia */"Viverra accumsan in nisl nisi scelerisque eu ultrices vitae auctor.",
            /* 11 linia */"Amet consectetur adipiscing elit pellentesque habitant morbi tristique.",
        ];
    }

    /**
     * Konwertuje kolor HEX na RGB
     * @private
     * @param {string} hex
     * @returns {{r: number, g: number, b: number}}
     */
    #hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        } : { r: 0, g: 0, b: 0 };
    }

    /**
     * Oblicza wymiary bannera
     * @private
     * @returns {Object}
     */
    #getBannerDimensions() {
        const bannerHeight = this.#pageSize.height * this.#bannerConfig.heightPercent;
        const horizontalPadding = this.#pageSize.width * this.#bannerConfig.horizontalPaddingPercent;
        const bottomPadding = this.#pageSize.height * this.#bannerConfig.bottomPaddingPercent;
        
        return {
            x: 0,
            y: 0,
            width: this.#pageSize.width,
            height: bannerHeight,
            logoAreaX: horizontalPadding,
            logoAreaWidth: this.#pageSize.width - (horizontalPadding * 2),
            bottomPadding: bottomPadding,
            contentStartY: bannerHeight + bottomPadding,
        };
    }

    /**
     * Dodaje banner z logo na górze strony
     * @private
     * @param {jsPDF} doc
     */
    #addLogoBanner(doc) {
        const banner = this.#getBannerDimensions();
        const primaryColor = this.#hexToRgb(this.#colors.primary);
        
        // Rysuj tło bannera
        doc.setFillColor(primaryColor.r, primaryColor.g, primaryColor.b);
        doc.rect(banner.x, banner.y, banner.width, banner.height, "F");
        
        // Dodaj logo wyśrodkowane w bannerze
        if (this.#isLogoLoaded && this.#logoBase64) {
            // Oblicz wymiary logo zachowując proporcje
            const logoMaxHeight = banner.height;
            const logoMaxWidth = banner.logoAreaWidth * 0.5; // 50% szerokości dostępnej
            
            // Proporcje oryginalnego logo
            const logoAspectRatio = 1;
            
            let logoWidth = logoMaxWidth;
            let logoHeight = logoWidth / logoAspectRatio;
            
            // Jeśli wysokość przekracza max, skaluj
            if (logoHeight > logoMaxHeight) {
                logoHeight = logoMaxHeight;
                logoWidth = logoHeight * logoAspectRatio;
            }
            
            // Wyśrodkuj logo
            const logoX = (this.#pageSize.width - logoWidth) / 2;
            const logoY = (banner.height - logoHeight) / 2;
            
            doc.addImage(
                this.#logoBase64,
                "PNG",
                logoX,
                logoY,
                logoWidth,
                logoHeight
            );
        }
    }

    /**
     * Dodaje nagłówek z tytułem i datą
     * @private
     * @param {jsPDF} doc
     */
    #addHeader(doc) {
        const banner = this.#getBannerDimensions();
        const headerY = banner.contentStartY + 10;
        const currentDate = this.#formatDate(new Date());
        
        // Tytuł "Regulamin" - wyśrodkowany
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.setTextColor(0, 0, 0);
        
        const title = "Regulamin";
        const titleWidth = doc.getTextWidth(title);
        const centerX = this.#pageSize.width / 2 - titleWidth / 2;
        
        doc.text(title, centerX, headerY);
        
        // Data - po prawej stronie
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        
        const dateWidth = doc.getTextWidth(currentDate);
        const dateX = this.#pageSize.width - this.#margins.right - dateWidth;
        
        doc.text(currentDate, dateX, headerY);
        
        // Linia pod nagłówkiem
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.5);
        doc.line(
            this.#margins.left,
            headerY + 10,
            this.#pageSize.width - this.#margins.right,
            headerY + 10
        );
    }

    /**
     * Dodaje listę numerowaną z treścią
     * @private
     * @param {jsPDF} doc
     */
    #addNumberedList(doc) {
        const listItems = this.#generateLoremIpsumList();
        const banner = this.#getBannerDimensions();
        const startY = banner.contentStartY + 30; // Po headerze
        const lineHeight = 10;
        const maxWidth = this.#pageSize.width - this.#margins.left - this.#margins.right - 15;
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        
        let currentY = startY;
        
        listItems.forEach((item, index) => {
            // Numer punktu
            doc.setFont("helvetica", "bold");
            doc.text(`${index}.`, this.#margins.left, currentY);
            
            // Treść punktu
            doc.setFont("helvetica", "normal");
            
            // Dzielenie tekstu na linie jeśli jest za długi
            const lines = doc.splitTextToSize(item, maxWidth);
            
            lines.forEach((line, lineIndex) => {
                doc.text(line, this.#margins.left + 15, currentY + lineIndex * 5);
            });
            
            currentY += lineHeight + (lines.length - 1) * 5;
            
            // Sprawdzenie czy nie przekroczono strony
            if (currentY > this.#pageSize.height - this.#margins.bottom) {
                doc.addPage();
                currentY = this.#margins.top;
            }
        });
    }

    /**
     * Generuje dokument PDF z regulaminem
     * @public
     * @param {Object} options - Opcje generowania
     * @param {string} options.filename - Nazwa pliku (domyślnie: "regulamin.pdf")
     * @param {boolean} options.download - Czy pobrać plik (domyślnie: true)
     * @returns {Promise<jsPDF|Blob>} - Zwraca dokument PDF lub Blob
     */
    async generateRegulamin(options = {}) {
        const { filename = "regulamin.pdf", download = true } = options;
        
        // Upewnij się, że logo jest załadowane
        if (!this.#isLogoLoaded) {
            await this.#loadLogo();
        }
        
        const doc = new jsPDF(this.#pdfConfig);
        
        // Dodaj elementy dokumentu
        this.#addLogoBanner(doc);
        this.#addHeader(doc);
        this.#addNumberedList(doc);
        
        if (download) {
            doc.save(filename);
            return doc;
        }
        
        return doc.output("blob");
    }

    /**
     * Zwraca dokument PDF jako Blob
     * @public
     * @returns {Promise<Blob>}
     */
    async getAsBlob() {
        return this.generateRegulamin({ download: false });
    }

    /**
     * Zwraca dokument PDF jako base64
     * @public
     * @returns {Promise<string>}
     */
    async getAsBase64() {
        if (!this.#isLogoLoaded) {
            await this.#loadLogo();
        }
        
        const doc = new jsPDF(this.#pdfConfig);
        
        this.#addLogoBanner(doc);
        this.#addHeader(doc);
        this.#addNumberedList(doc);
        
        return doc.output("datauristring");
    }

    /**
     * Otwiera PDF w nowej karcie używając natywnego czytnika PDF przeglądarki
     * @public
     * @returns {Promise<void>}
     */
    async openInNewTab() {
        const blob = await this.getAsBlob();
        const blobUrl = URL.createObjectURL(blob);
        
        window.open(blobUrl, "_blank");
        
        // Zwolnij pamięć po otwarciu (z opóźnieniem aby przeglądarka zdążyła załadować)
        setTimeout(() => {
            URL.revokeObjectURL(blobUrl);
        }, 1000);
    }
}

// Eksport singletona
export const pdfGeneratorService = new PdfGeneratorService();

// Eksport klasy dla ewentualnego tworzenia nowych instancji
export { PdfGeneratorService };

