import { pdfGeneratorService } from "src/services/pdf-generator.service";
import { ref } from "vue";

/**
 * Composable do generowania dokumentów PDF
 * @returns {Object} API do generowania PDF
 */
export function usePdfGenerator() {
    const isGenerating = ref(false);
    const error = ref(null);

    /**
     * Generuje i pobiera regulamin jako PDF
     * @param {string} filename - Nazwa pliku
     * @returns {Promise<void>}
     */
    async function downloadRegulamin(filename = "regulamin.pdf") {
        isGenerating.value = true;
        error.value = null;

        try {
            await pdfGeneratorService.generateRegulamin({ 
                filename, 
                download: true 
            });
        } catch (err) {
            error.value = err.message;
            console.error("Błąd podczas generowania PDF:", err);
        } finally {
            isGenerating.value = false;
        }
    }

    /**
     * Pobiera PDF jako Blob
     * @returns {Promise<Blob|null>}
     */
    async function getRegulaminBlob() {
        isGenerating.value = true;
        error.value = null;

        try {
            return await pdfGeneratorService.getAsBlob();
        } catch (err) {
            error.value = err.message;
            console.error("Błąd podczas generowania PDF:", err);
            return null;
        } finally {
            isGenerating.value = false;
        }
    }

    /**
     * Otwiera PDF w nowej karcie
     * @returns {Promise<void>}
     */
    async function openRegulaminInNewTab() {
        isGenerating.value = true;
        error.value = null;

        try {
            await pdfGeneratorService.openInNewTab();
        } catch (err) {
            error.value = err.message;
            console.error("Błąd podczas otwierania PDF:", err);
        } finally {
            isGenerating.value = false;
        }
    }

    return {
        isGenerating,
        error,
        downloadRegulamin,
        getRegulaminBlob,
        openRegulaminInNewTab,
    };
}

