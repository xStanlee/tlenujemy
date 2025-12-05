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
    
    /** @type {Object} - Konfiguracja logo */
    #logoConfig = {
        width: 40,
        height: 15,
        x: 20,
        y: 15,
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
        
        return `${day}/${month}/${year}`;
    }

    /**
     * Generuje zawartość Lorem Ipsum dla listy
     * @private
     * @returns {string[]}
     */
    #generateLoremIpsumList() {
        return [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
            "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa.",
            "Nulla facilisi morbi tempus iaculis urna id volutpat lacus.",
            "Pellentesque habitant morbi tristique senectus et netus et malesuada.",
            "Fames ac turpis egestas sed tempus urna et pharetra pharetra.",
            "Massa tincidunt dui ut ornare lectus sit amet est placerat.",
            "Viverra accumsan in nisl nisi scelerisque eu ultrices vitae auctor.",
            "Amet consectetur adipiscing elit pellentesque habitant morbi tristique.",
        ];
    }

    /**
     * Dodaje logo do dokumentu PDF
     * @private
     * @param {jsPDF} doc
     */
    #addLogo(doc) {
        if (this.#isLogoLoaded && this.#logoBase64) {
            doc.addImage(
                this.#logoBase64,
                "PNG",
                this.#logoConfig.x,
                this.#logoConfig.y,
                this.#logoConfig.width,
                this.#logoConfig.height
            );
        }
    }

    /**
     * Dodaje nagłówek z tytułem i datą
     * @private
     * @param {jsPDF} doc
     */
    #addHeader(doc) {
        const headerY = 20;
        const currentDate = this.#formatDate(new Date());
        
        // Tytuł "Regulamin" - wyśrodkowany
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        
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
        const startY = 50;
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
        this.#addLogo(doc);
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
        
        this.#addLogo(doc);
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

