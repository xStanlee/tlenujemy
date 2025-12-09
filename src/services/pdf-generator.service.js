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
     * Generuje strukturę regulaminu w formacie sekcji
     * @private
     * @returns {Object[]}
     */
    #generateRegulaminContent() {
        return [
            {
                type: "section",
                number: "1",
                title: "POSTANOWIENIA OGÓLNE",
                content: [
                    {
                        type: "paragraph",
                        text: " Korzystanie Niniejszy regulamin określa zasady korzystania z usług tlenoterapii"
                    }
                ]
            },
            {
                type: "section",
                number: "2",
                title: "WYMAGANIA I WARUNKI DOSTĘPU",
                content: [
                    {
                        type: "paragraph",
                        text: "Korzystanie z komory hiperbarycznej dopuszczone jest dla osób, które:"
                    },
                    {
                        type: "list",
                        items: [
                            "Ukończyły 18 lat (osoby niepełnoletnie pod opieką rodzica/opiekuna)",
                            "Przeszły przesiewową konsultację medyczną",
                            "Nie posiadają przeciwwskazań medycznych",
                            "Wyraziły świadomą zgodę na przeprowadzenie zabiegu"
                        ]
                    }
                ]
            },
            {
                type: "section",
                number: "3",
                title: "PRZYGOTOWANIE DO ZABIEGU",
                content: [
                    {
                        type: "paragraph",
                        text: "Klient zobowiązany jest do:"
                    },
                    {
                        type: "list",
                        items: [
                            "Przybycia 15 minut przed zaplanowaną godziną zabiegu",
                            "Zdjęcia metali i urządzeń elektronicznych (zegarki, biżuteria, aparaty słuchowe, implanty)",
                            "Zapoznania się z instrukcją obsługi i sygnalizacji zagrożeń",
                            "Poinformowania kadry o wszelkich zmianach stanu zdrowia od ostatniego zabiegu",
                            "Unikania spożycia alkoholu na 24 godziny przed zabiegiem"
                        ]
                    }
                ]
            },
            {
                type: "section",
                number: "4",
                title: "PRZECIWWSKAZANIA I OGRANICZENIA",
                content: [
                    {
                        type: "paragraph",
                        text: "Zabieg jest przeciwwskazany dla osób z:"
                    },
                    {
                        type: "list",
                        items: [
                            "Atakami paniki i klaustrofobią",
                            "Nieskontrolowaną cukrzycą",
                            "Nieuleczonym rakiem płuc",
                            "Gorączką powyżej 38,5°C",
                            "Infekcjami górnych dróg oddechowych",
                            "Stosowaniem leków niedopuszczonych do użytku podczas zabiegu"
                        ]
                    }
                ]
            },
            {
                type: "section",
                number: "5",
                title: "ZASADY BEZPIECZEŃSTWA PODCZAS ZABIEGU",
                content: [
                    {
                        type: "list",
                        items: [
                            "Pacjent zobowiązany jest do pełnego stosowania się do poleceń personelu medycznego",
                            "Zabronione jest opuszczanie komory bez zgody obsługującego personelu",
                            "Klient powinien regularnie wyrównywać ciśnienie w uszach oraz powiadamiać o wszelkich objawach dyskomfortu",
                            "W przypadku złego samopoczucia należy natychmiast wykorzystać system alarmowania",
                            "Całkowity zakaz palenia, otwartego ognia oraz materiałów łatwopalnych w promieniu 10 metrów od komory"
                        ]
                    }
                ]
            },
            {
                type: "section",
                number: "6",
                title: "OBOWIĄZKI PACJENTA",
                content: [
                    {
                        type: "paragraph",
                        text: "Pacjent zobowiązany jest do:"
                    },
                    {
                        type: "list",
                        items: [
                            "Składania przed każdym zabiegiem aktualnych informacji o stanie zdrowia",
                            "Przestrzegania instrukcji personelu",
                            "Niezajmowania się w komorze żadnymi pracami (praca na laptopie, czytanie, długie rozmowy)",
                            "Utrzymania czystości w komorze",
                            "Niezapraszania osób nieuprawnionych do wejścia do pomieszczenia zabiegu"
                        ]
                    }
                ]
            },
            {
                type: "section",
                number: "7",
                title: "ODPOWIEDZIALNOŚĆ I ZRZECZENIE SIĘ ODPOWIEDZIALNOŚCI",
                content: [
                    {
                        type: "paragraph",
                        text: "Firma nie ponosi odpowiedzialności za:"
                    },
                    {
                        type: "list",
                        items: [
                            "Skutki niezastosowania się do zaleceń personelu",
                            "Powikłania wynikające z ukrytych przeciwwskazań medycznych",
                            "Szkody powstałe na skutek nieprawidłowego stosowania zabiegu bez upoważnienia firmy",
                            "Zagubienie lub uszkodzenie przedmiotów wartościowych pozostawionych w komorze"
                        ]
                    },
                    {
                        type: "paragraph",
                        text: "Pacjent oświadcza, że zabiegi wykonuje dobrowolnie i na własne ryzyko, będąc świadom potencjalnych skutków ubocznych."
                    }
                ]
            },
            {
                type: "section",
                number: "8",
                title: "OPŁATY I WARUNKI FINANSOWE",
                content: [
                    {
                        type: "list",
                        items: [
                            "Opłata za jeden zabieg wynosi zgodnie z aktualnym cennikiem",
                            "Wszystkie opłaty muszą być uregulowane przed lub w dniu zabiegu",
                            "Firma oferuje pakiety rabatowe przy zakupie minimum 5 zabiegów",
                            "Rezerwacja zabiegu wymaga uiszczenia zaliczki w wysokości 50% ceny",
                            "Osoby korzystające regularnie mogą otrzymać rabat lojalnościowy"
                        ]
                    }
                ]
            },
            {
                type: "section",
                number: "9",
                title: "ANULOWANIE I REZYGNACJA Z ZABIEGU",
                content: [
                    {
                        type: "list",
                        items: [
                            "Anulowanie zabiegu powinno nastąpić najpóźniej 24 godziny przed planowaną datą",
                            "Anulowanie bez zawiadomienia powoduje utratę zaliczki",
                            "Rezygnacja z zabiegu z przyczyn medycznych wymaga oświadczenia lekarza",
                            "W przypadku choroby zakaźnej, klient zobowiązany jest do poinformowania firmy przed przyjściem"
                        ]
                    }
                ]
            },
            {
                type: "section",
                number: "10",
                title: "POSTANOWIENIA KOŃCOWE",
                content: [
                    {
                        type: "paragraph",
                        text: "Każdy pacjent otrzymuje kopię niniejszego regulaminu oraz karty pacjenta do wypełnienia. Wszelkie zmiany w regulaminie będą komunikowane z co najmniej 7-dniowym wyprzedzeniem. Kontynuacja korzystania z usług po zmianach regulaminu stanowi akceptację nowych warunków. W sprawach nieuregulowanych w niniejszym regulaminie obowiązuje prawo polskie i przepisy GDPR."
                    }
                ]
            }
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
        
        // Tytuł "Regulamin" - wyśrodkowany w trzech liniach
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.setCharSpace(0); // Reset letter-spacing dla spójności
        
        const centerX = this.#pageSize.width / 2;
        const lineSpacing = 6;
        
        // Linia 1: REGULAMIN KORZYSTANIA
        doc.text("REGULAMIN KORZYSTANIA", centerX, headerY, { align: 'center' });
        
        // Linia 2: Z
        doc.text("Z", centerX, headerY + lineSpacing, { align: 'center' });
        
        // Linia 3: KOMORY HIPERBARYCZNEJ
        doc.text("KOMORY HIPERBARYCZNEJ", centerX, headerY + (lineSpacing * 2), { align: 'center' });
        
        // Data - po prawej stronie
        const dateY = headerY + (lineSpacing * 2);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.setCharSpace(0); // Reset letter-spacing
        
        const dateWidth = doc.getTextWidth(currentDate);
        const dateX = this.#pageSize.width - this.#margins.right - dateWidth;
        
        doc.text(currentDate, dateX, dateY);
        
        // Linia pod nagłówkiem
        const lineY = dateY + 5;
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.5);
        doc.line(
            this.#margins.left,
            lineY,
            this.#pageSize.width - this.#margins.right,
            lineY
        );
    }

    /**
     * Dodaje sformatowaną treść regulaminu
     * @private
     * @param {jsPDF} doc
     */
    #addRegulaminContent(doc) {
        const content = this.#generateRegulaminContent();
        const banner = this.#getBannerDimensions();
        
        // Reset letter-spacing na początku dla spójności
        doc.setCharSpace(0);
        
        // Wspólna konfiguracja stylu tekstu (paragraph i list)
        const textStyle = {
            fontFamily: "helvetica",
            fontWeight: "normal",
            fontSize: 10,
            textColor: { r: 50, g: 50, b: 50 },
            lineHeightMultiplier: 0.4, // Wspólny mnożnik dla paragraph i list
            charSpace: 0,
        };
        
        // Konfiguracja layoutu
        const layout = {
            headerLineY: banner.contentStartY + 25,
            paddingBelowLine: banner.bottomPadding + 12,
            sectionTitleSize: 12,
            sectionSpacing: 10,
            paragraphSpacing: 3,
            listItemSpacing: 2,
            listIndent: 5,
            bulletIndent: 2,
        };
        
        // Poprawne obliczenie szerokości z uwzględnieniem marginesów
        const _fixedSpacing = 100; 
        const maxWidth = this.#pageSize.width - _fixedSpacing;
        let currentY = layout.headerLineY + layout.paddingBelowLine;
        
        const primaryColor = this.#hexToRgb(this.#colors.primary);
        
        /**
         * Ustawia wspólny styl tekstu dla paragraph i list
         */
        const applyTextStyle = () => {
            doc.setFont(textStyle.fontFamily, textStyle.fontWeight);
            doc.setFontSize(textStyle.fontSize);
            doc.setTextColor(textStyle.textColor.r, textStyle.textColor.g, textStyle.textColor.b);
            doc.setCharSpace(textStyle.charSpace);
        };
        
        /**
         * Oblicza wysokość linii na podstawie wspólnego stylu
         * @returns {number}
         */
        const getLineHeight = () => {
            return textStyle.fontSize * textStyle.lineHeightMultiplier;
        };
        
        /**
         * Sprawdza i dodaje nową stronę jeśli potrzeba
         * @param {number} neededSpace
         */
        const checkPageBreak = (neededSpace) => {
            if (currentY + neededSpace > this.#pageSize.height - this.#margins.bottom - 15) {
                doc.addPage();
                currentY = this.#margins.top;
                return true;
            }
            return false;
        };
        
        /**
         * Renderuje nagłówek sekcji
         * @param {string} number
         * @param {string} title
         */
        const renderSectionHeader = (number, title) => {
            checkPageBreak(10);
            
            // Spójne ustawienia stylu dla nagłówków
            doc.setFont(textStyle.fontFamily, "bold");
            doc.setFontSize(layout.sectionTitleSize);
            doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b);
            doc.setCharSpace(textStyle.charSpace);
            
            const headerText = `${number}. ${title}`;
            const headerLines = doc.splitTextToSize(headerText, maxWidth);
            
            headerLines.forEach((line) => {
                doc.text(line, this.#margins.left, currentY);
                currentY += layout.sectionTitleSize * 0.4;
            });
            
            currentY += layout.paragraphSpacing;
        };
        
        /**
         * Renderuje paragraf tekstu
         * @param {string} text
         */
        const renderParagraph = (text) => {
            // Zastosuj wspólny styl tekstu
            applyTextStyle();
            
            const lines = doc.splitTextToSize(text, maxWidth);
            const lineHeight = getLineHeight();
            
            lines.forEach((line) => {
                checkPageBreak(lineHeight);
                doc.text(line, this.#margins.left, currentY);
                currentY += lineHeight;
            });
            
            currentY += layout.paragraphSpacing;
        };
        
        /**
         * Renderuje listę punktowaną
         * @param {string[]} items
         */
        const renderList = (items) => {
            // Zastosuj wspólny styl tekstu (identyczny jak paragraph)
            applyTextStyle();
            
            const lineHeight = getLineHeight();
            const bulletX = this.#margins.left + layout.bulletIndent;
            const textX = this.#margins.left + layout.listIndent;
            // Szerokość tekstu listy = całkowita szerokość - wcięcie listy
            const textMaxWidth = maxWidth - layout.listIndent;
            
            items.forEach((item) => {
                // Ponownie zastosuj styl (może być zmieniony przez bullet)
                applyTextStyle();
                
                const lines = doc.splitTextToSize(item, textMaxWidth);
                
                // Sprawdź czy cały element zmieści się na stronie
                const itemHeight = lines.length * lineHeight + layout.listItemSpacing;
                checkPageBreak(itemHeight);
                
                // Bullet point (okrągły punkt)
                doc.setFillColor(primaryColor.r, primaryColor.g, primaryColor.b);
                doc.circle(bulletX, currentY - 1.2, 0.6, "F");
                
                // Przywróć styl tekstu po rysowaniu bullet
                applyTextStyle();
                
                lines.forEach((line, lineIndex) => {
                    doc.text(line, textX, currentY + lineIndex * lineHeight);
                });
                
                currentY += lines.length * lineHeight + layout.listItemSpacing;
            });
            
            currentY += layout.paragraphSpacing;
        };
        
        // Renderuj wszystkie sekcje
        content.forEach((section, sectionIndex) => {
            // Dodaj odstęp między sekcjami (oprócz pierwszej)
            if (sectionIndex > 0) {
                currentY += layout.sectionSpacing;
            }
            
            // Nagłówek sekcji
            renderSectionHeader(section.number, section.title);
            
            // Zawartość sekcji
            section.content.forEach((block) => {
                if (block.type === "paragraph") {
                    renderParagraph(block.text);
                } else if (block.type === "list") {
                    renderList(block.items);
                }
            });
        });
    }

    /**
     * Dodaje stopkę z informacją copyright na dole strony
     * @private
     * @param {jsPDF} doc
     */
    #addCopyright(doc) {
        const currentYear = new Date().getFullYear();
        const copyrightText = `Terapia tlenem hiperbarycznym. Tlenovo © ${currentYear}r.`;
        
        // Pozycja na dole strony
        const footerY = this.#pageSize.height - 10;
        
        // Ustaw styl tekstu - spójne ustawienia
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(128, 128, 128); // Szary kolor
        doc.setCharSpace(0); // Reset letter-spacing
        
        // Wyśrodkuj tekst
        const textWidth = doc.getTextWidth(copyrightText);
        const centerX = (this.#pageSize.width - textWidth) / 2;
        
        doc.text(copyrightText, centerX, footerY);
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
        
        // Ustaw domyślny letter-spacing dla całego dokumentu
        doc.setCharSpace(0);
        
        // Dodaj elementy dokumentu
        this.#addLogoBanner(doc);
        this.#addHeader(doc);
        this.#addRegulaminContent(doc);
        this.#addCopyright(doc);
        
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
        
        // Ustaw domyślny letter-spacing
        doc.setCharSpace(0);
        
        this.#addLogoBanner(doc);
        this.#addHeader(doc);
        this.#addRegulaminContent(doc);
        this.#addCopyright(doc);
        
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

