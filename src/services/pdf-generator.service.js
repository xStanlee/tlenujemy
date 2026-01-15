import { jsPDF } from "jspdf";
import './../assets/Lato-Regular-normal.js';

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
        horizontalPaddingPercent: 0.1,
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
                        text: "1.1. Niniejszy regulamin określa zasady korzystania z usług tlenoterapii hiperbarycznej oferowanych przez [NAZWA FIRMY, NIP, REGON], zwaną dalej 'Usługodawcą', oraz obowiązki i odpowiedzialność pacjentów, zwanych dalej 'Pacjentami' lub 'Klientami'."
                    },
                    {
                        type: "paragraph",
                        text: "1.2. Pełna treść regulaminu musi być dostępna do zapoznania się co najmniej 14 dni przed podpisaniem umowy. Pacjent oświadcza, że miał dostęp do regulaminu, zapoznał się z nim w całości i wyraźnie go akceptuje podpisem."
                    },
                    {
                        type: "paragraph",
                        text: "1.3. Usługodawca prowadzi działalność pod nadzorem zgodnie z obowiązującym prawem polskim, ustawą z dnia 30 maja 2014 r. o prawach pacjenta i Rzeczniku Praw Pacjenta, a także ustawą o działalności leczniczej."
                    },
                    {
                        type: "paragraph",
                        text: "1.4. Usługodawca posiada obowiązkowe ubezpieczenie odpowiedzialności cywilnej (OC) o minimalnym zakresie zgodnym z Rozporządzeniem Ministra Finansów z 29 kwietnia 2019 r. Kopię polisy ubezpieczeniowej Pacjent może obejrzeć na życzenie w siedzibie Usługodawcy."
                    }
                ]
            },
            {
                type: "section",
                number: "2",
                title: "WYMAGANIA I WARUNKI DOSTĘPU (Z ZAOSTRZENIAMI OCHRONNYMI)",
                content: [
                    {
                        type: "paragraph",
                        text: "2.1. Korzystanie z komory hiperbarycznej dopuszczone jest wyłącznie dla osób, które spełniają wszystkie poniższe kryteria kumulatywnie:"
                    },
                    {
                        type: "list",
                        items: [
                            "Ukończyły 18 lat i posiadają pełną zdolność do czynności prawnych (osoby niepełnoletnie mogą korzystać wyłącznie pod pełną opieką rodzica/opiekuna prawnego, który co-podpisuje wszystkie dokumenty)",
                            "Nie posiadają jakichkolwiek zakaźnych chorób, w tym przewlekłych infekcji wirusowych (w tym COVID-19), bakteryjnych czy grzybiczych",
                            "Przeszły pisemną przesiewową konsultację medyczną z personelem Usługodawcy i zaznajomiły się z dokumentacją zdrowotną",
                            "Nie przyjmują leków, które mogą wchodzić w konflikt z terapią hiperbaryczną (Pacjent zobowiązany jest do dostarczenia pełnej listy przyjmowanych leków najpóźniej 7 dni przed zabiegiem)",
                            "Wyraziły świadomą, pisemną, niewymuszaną zgodę na przeprowadzenie zabiegu, podpisaną osobiście przez Pacjenta"
                        ]
                    },
                    {
                        type: "paragraph",
                        text: "2.2. Osoby, które wcześniej miały jakiekolwiek powikłania podczas tlenoterapii hiperbarycznej, mogą uczestniczyć wyłącznie na podstawie potwierdzenia pisemnego od lekarza specjalisty, z wyraźnym zezwoleniem na kontynuację leczenia."
                    },
                    {
                        type: "paragraph",
                        text: "2.3. Usługodawca zastrzega sobie prawo do ostatecznej weryfikacji dostępu Pacjenta do usług na podstawie przeprowadzonych badań przesiewowych. W razie wątpliwości dotyczących bezpieczeństwa, Usługodawca ma prawo odmówić przeprowadzenia zabiegu bez obowiązku uzasadnienia i zwrócić całość wpłaconej zaliczki, jeśli zabieg nie został jeszcze wykonany."
                    }
                ]
            },
            {
                type: "section",
                number: "3",
                title: "PRZYGOTOWANIE DO ZABIEGU – OBOWIĄZKI PACJENTA",
                content: [
                    {
                        type: "paragraph",
                        text: "3.1. Pacjent zobowiązany jest do:"
                    },
                    {
                        type: "list",
                        items: [
                            "Przybycia co najmniej 10 minut przed zaplanowaną godziną zabiegu (nieobecność w tym czasie uznawana jest za rezygnację)",
                            "Zdjęcia wszystkich metali i urządzeń elektronicznych (zegarki, biżuteria, aparaty słuchowe, implanty, porty venous, protezy metalowe)",
                            "Zastosowania się do instrukcji dotyczącej odzieży i materiałów – dozwolone tylko naturalne tkaniny (bawełna, len), spodnie z elastanu nie są dozwolone",
                            "Zapoznania się z instrukcją obsługi i sygnalizacji zagrożeń oraz podpisania potwierdzenia zrozumienia procedur",
                            "Poinformowania personelu o wszelkich zmianach stanu zdrowia, pojawiających się objawach czy stanach lękowych co najmniej 3 dni przed zabiegiem",
                            "Unikania spożycia alkoholu na 24 godzin przed zabiegiem",
                            "Nieprzyjmowania leków na bazie kortykosteroidów bez pisemnego zezwolenia lekarza (minimum 7 dni przed zabiegiem)"
                        ]
                    },
                    {
                        type: "paragraph",
                        text: "3.2. Pacjent oświadcza, że pochodzi z domu wolnego od wszelkich zakaźnych chorób oraz że żaden członek jego gospodarstwa domowego nie przebywa w izolacji czy kwarantannie."
                    },
                    {
                        type: "paragraph",
                        text: "3.3. Pacjent potwierdza pisemnie, że udzielił wszystkich prawdziwych informacji dotyczących swojego stanu zdrowia. Wszelkie ukrywanie informacji lub podawanie fałszywych danych skutkuje natychmiastową rezygnacją z usług bez zwrotu środków i potencjalnie dochodzeniem roszczeń karnych."
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
                        text: "4.1. Zabieg jest bezwzględnie przeciwwskazany dla osób z:"
                    },
                    {
                        type: "list",
                        items: [
                            "Aktywną chorobą psychiczną, zaburzeniami lękowymi klinicznymi, atakami paniki i klaustrofobią (pacjent zawsze wypełnia kwestionariusz przesiewowy oceniający stabilność psychiczną)",
                            "Nieskontrolowaną cukrzycą (poziom glukozy powyżej 300 mg/dL w dniu zabiegu)",
                            "Wcześniej zdiagnozowanym lub aktualnie leczonym rakiem płuc (niezależnie od stopnia zaawansowania)",
                            "Gorączką powyżej 38,5°C w dniu zabiegu",
                            "Ostrymi lub przewlekłymi infekcjami górnych i dolnych dróg oddechowych, w tym zapaleniem pęcherza moczowego",
                            "Obstrukcją górnych dróg oddechowych (problemy z przełykaniem, zapalenie gardła)",
                            "Stosowaniem leków niedopuszczonych (lista aktualizowana na bieżąco dostępna w siedzibie)",
                            "Podczas menstruacji – ze względu na zwiększoną podatność organizmu na zaburzenia",
                            "Zapaleniem ucha wewnętrznego lub zaburzeniami równowagi",
                            "Grzybicą skóry lub infekcjami grzybiczymi w obszarze głowy",
                            "Ciążą – jakiekolwiek podejrzenie ciąży dyskwalifikuje pacjenta"
                        ]
                    },
                    {
                        type: "paragraph",
                        text: "4.2. Usługodawca zatwierdza przed każdym zabiegiem stan zdrowia na podstawie wypełnionego kwestionariusza zdrowotnego i ma prawo zastosować testy laboratoryjne (badanie poziomu glukozy, saturacji tlenu) za dodatkową opłatą, jeśli uzna to za konieczne."
                    },
                    {
                        type: "paragraph",
                        text: "4.3. Pacjent zobowiązany jest do udzielenia pisemnej zgody na potencjalne testy bezpieczeństwa, w tym możliwość odwołania zabiegu w ostatniej chwili, jeśli wyniki wskazują na zagrożenie."
                    }
                ]
            },
            {
                type: "section",
                number: "5",
                title: "ZASADY BEZPIECZEŃSTWA PODCZAS ZABIEGU",
                content: [
                    {
                        type: "paragraph",
                        text: "5.1. Pacjent zobowiązany jest do:"
                    },
                    {
                        type: "list",
                        items: [
                            "Pełnego posłuszeństwa wszelkim poleceniom personelu medycznego – każde naruszenie tego warunku skutkuje natychmiastowym przerwaniem zabiegu i brakiem zwrotu środków",
                            "Nieporuszania się w komorze oraz nieodpychania się od ścian i urządzeń",
                            "Niepróbowania samodzielnego otwarcia komory, nawet w wypadku paniki – każda taka próba jest zarejestrowana na kamerach nadzoru",
                            "Regularnego wyrównywania ciśnienia w uszach co 3-5 minut",
                            "Mówienia wyłącznie, gdy system komunikacji jest aktywny – brak komunikacji przez 10 minut powoduje alarm i natychmiastowy koniec sesji",
                            "Natychmiastowego wykorzystania systemu alarmowania przy jakichkolwiek objawach dyskomfortu, zawrotu głowy, uczucia zadławienia się czy paniki",
                            "Bezwzględnego zakazu palenia, otwartego ognia, materiałów łatwopalnych w promieniu 10 metrów od komory",
                            "Bezwzględnego zakazu przynoszenia alkoholu, narkotyków lub substancji psychoaktywnych na teren Usługodawcy",
                            "Całkowitego zakazu fotografowania, nagrywania video lub audio bez pisemnej zgody Usługodawcy"
                        ]
                    },
                    {
                        type: "paragraph",
                        text: "5.2. Wszystkie sesje są rejestrowane na kamerach nadzoru (audio i wideo) w celach bezpieczeństwa."
                    },
                    {
                        type: "paragraph",
                        text: "5.3. Pacjent wyraża zgodę na przechowywanie nagrań przez okres 6 miesięcy i ich wykorzystanie w przypadku sporów prawnych."
                    },
                    {
                        type: "paragraph",
                        text: "5.4. Personel ma prawo przerwać zabieg w dowolnym momencie, jeśli uzna, że zagrożone jest bezpieczeństwo Pacjenta, bez żadnych konsekwencji finansowych dla Usługodawcy."
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
                        text: "6.1. Pacjent zobowiązany jest do:"
                    },
                    {
                        type: "list",
                        items: [
                            "Składania przed każdym zabiegiem aktualnych, prawdziwych informacji o stanie zdrowia, w tym wszelkich zmian od ostatniego zabiegu, pojawiających się objawów czy nowych leków",
                            "Przestrzegania wszelkich instrukcji personelu zarówno przed, podczas, jak i po zabiegu",
                            "Utrzymania czystości w komorze i niezabrudzenia sprzętu",
                            "Niezapraszania osób nieuprawnionych do pomieszczenia zabiegu",
                            "Niepróbowania manipulacji sprzętem, kamer, systemów alarmowych czy urządzeń",
                            "Nienoszenia ukrytych urządzeń elektronicznych (liczniki, słuchawki, karty pamięci)",
                            "Zgłaszania wszelkich alergii, fobii lub specjalnych wymagań nie później niż 3 dni przed zabiegiem"
                        ]
                    },
                    {
                        type: "paragraph",
                        text: "6.2. Pacjent ponosi pełną odpowiedzialność za wypadek, który sam na siebie sprowadzi poprzez niespełnienie któregokolwiek z wymagań."
                    }
                ]
            },
            {
                type: "section",
                number: "7",
                title: "ODPOWIEDZIALNOŚĆ I ZRZECZENIE SIĘ ODPOWIEDZIALNOŚCI – ZAOSTRZENIA",
                content: [
                    {
                        type: "paragraph",
                        text: "7.1. Firma nie ponosi odpowiedzialności za:"
                    },
                    {
                        type: "list",
                        items: [
                            "Skutki niezastosowania się do zaleceń personelu medycznego – Pacjent podpisuje potwierdzenie zrozumienia każdej instrukcji",
                            "Powikłania wynikające z ukrytych, niezgłoszonych lub świadomie ukrywanych przeciwwskazań medycznych – wymóg: Pacjent podpisuje oświadczenie o szczerości informacji",
                            "Szkody powstałe na skutek nieprawidłowego stosowania zabiegu przez samego Pacjenta, w szczególności niewykonywania wyrównywania ciśnienia w uszach",
                            "Zagubienie, uszkodzenie, wypadek lub kradzież przedmiotów wartościowych pozostawionych w komorze – Usługodawca zobowiązany jest jedynie do udostępnienia szafy/sejfu, użycie szafy jest dobrowolne, Usługodawca nie odpowiada za przedmioty pozostawione poza nią",
                            "Działania siły wyższej (awaria sprzętu, brak prądu, trzęsienie ziemi, powódź)",
                            "Jakiekolwiek działania personelu będące w zgodzie z procedurami bezpieczeństwa",
                            "Wszelkie roszczenia związane z domniemanym 'wyłudzeniem' czy 'sfałszowaniem' stanu zdrowia przez Pacjenta będą rozpatrywane w postępowaniu sądowym, zgodnie z art. 23 i art. 24 Kodeksu Cywilnego. Pacjent zobowiązany jest do zwrotu pełnej wartości strat poniesionych przez Usługodawcę, w tym kosztów procesowych, honorarium prawnika i ewentualnych kar za omyłkowe leczenie oparte na fałszywych informacjach. Brak uiszczenia odszkodowania w terminie 30 dni od prawomocnego wyroku skutkuje wszczęciem postępowania egzekucyjnego",
                            "Opóźnienia czy anulacje sesji spowodowane potrzebami zdrowotnymi innych Pacjentów – bezpieczeństwo pacjentów ma priorytet"
                        ]
                    },
                    {
                        type: "paragraph",
                        text: "7.2. Oświadczenie Pacjenta i przyjęcie na siebie ryzyka: 'Oświadczam, że zabiegi wykonuję dobrowolnie, świadomie i na własne ryzyko. Zostałem/łam wyczerpująco poinformowany/a o potencjalnych skutkach ubocznych, w tym: możliwości czasowego zaburzenia widzenia, możliwości czasowych zawrotów głowy, możliwości zapalenia ucha wewnętrznego, możliwości utraty przytomności. Akceptuję te ryzyka w pełni świadom i niniejszym zrzekam się prawa do dochodzenia roszczeń w przypadku zaistnienia któregokolwiek z tych powikłań, jeśli będą wynikiem mojego niezastosowania się do instrukcji personelu.'"
                    },
                    {
                        type: "paragraph",
                        text: "7.3. Zawarte w tym oświadczeniu zrzeczenie się prawa do roszczeń jest wiążące i stanowi warunek sine qua non udzielenia usługi."
                    }
                ]
            },
            {
                type: "section",
                number: "8",
                title: "OPŁATY I WARUNKI FINANSOWE – ZAOSTRZENIA",
                content: [
                    {
                        type: "paragraph",
                        text: "8.1. Zasady opłat:"
                    },
                    {
                        type: "list",
                        items: [
                            "Opłata za jeden zabieg wynosi 110 PLN, zgodnie z aktualnym cennikiem dostępnym na stronie Usługodawcy",
                            "Cena może ulegać zmianom na 30 dni przed zmianą – informacja będzie dostępna na stronie",
                            "Wszystkie opłaty muszą być uregulowane w pełnej wysokości przed zabiegiem",
                            "Faktura VAT wystawiana jest wyłącznie dla pacjentów, którzy ją wyraźnie zażądają – domyślnie wystawiany jest paragon fiskalny",
                            "Firma oferuje pakiety rabatowe przy zakupie minimum 5 zabiegów (rabat 10%) lub 10 zabiegów (rabat 15%)",
                            "Osoby korzystające regularnie (minimum 1 zabieg miesięcznie przez minimum 3 miesiące) mogą otrzymać rabat lojalnościowy w wysokości 5%, ale może być on odebrany w przypadku naruszenia regulaminu",
                            "Pacjent, który wielokrotnie narusza regulamin, może być trwale przeniesiony na listę zakazanych pacjentów bez możliwości zwrotu wcześniej wpłaconych pieniędzy"
                        ]
                    },
                    {
                        type: "paragraph",
                        text: "8.2. Karty przedpłacone:"
                    },
                    {
                        type: "list",
                        items: [
                            "Karty przedpłacone są ważne przez 12 miesięcy od daty zakupu",
                            "Po upływie 12 miesięcy środki wygasają automatycznie bez możliwości zwrotu",
                            "Karty są niedopuszczalne do przenoszenia na inne osoby – każda karta jest przypisana do jednego pacjenta na podstawie numeru PESEL",
                            "Duplikaty kart wydawane są wyłącznie na zasadzie opłaty w wysokości 50 PLN"
                        ]
                    }
                ]
            },
            {
                type: "section",
                number: "9",
                title: "ANULOWANIE I REZYGNACJA Z ZABIEGU – ZAOSTRZENIA CZASOWE",
                content: [
                    {
                        type: "paragraph",
                        text: "9.1. Zasady anulowania:"
                    },
                    {
                        type: "list",
                        items: [
                            "Anulowanie zabiegu powinno nastąpić nie później niż 24 godziny przed planowaną datą",
                            "Nieobecność na zabiegu traktowana jest jako dobrowolna rezygnacja",
                            "Pacjent, który nie pojawi się na zabiegu bez powiadomienia 2 razy, może być dodany do listy potencjalnie niespłacalnych klientów",
                            "Rezygnacja z zabiegu z przyczyn medycznych wymaga oświadczenia lekarza (lista lekarzy zatwierdzanych przez Usługodawcę) lub recepty lekarskiej potwierdzającej nieobecność"
                        ]
                    }
                ]
            },
            {
                type: "section",
                number: "10",
                title: "PRAWA PACJENTA I ICH OGRANICZENIA",
                content: [
                    {
                        type: "paragraph",
                        text: "10.1. Pacjent ma prawo do:"
                    },
                    {
                        type: "list",
                        items: [
                            "Bezpiecznych warunków leczenia",
                            "Udzielania informacji na temat swojego stanu zdrowia",
                            "Rezygnacji z zabiegu (z zastosowaniem postanowień § 9)"
                        ]
                    },
                    {
                        type: "paragraph",
                        text: "10.2. Pacjent nie ma prawa do:"
                    },
                    {
                        type: "list",
                        items: [
                            "Dochodzenia zwrotu pieniędzy po zabiegu z powodu niezadowolenia z efektów – efekty mogą być indywidualne i zależą od stanu zdrowia pacjenta i sposobu życia",
                            "Dochodzenia odszkodowania za następstwa naturalne terapii (czasowe zaburzenia widzenia, zawroty głowy, zawał naczyń włosowatych) – Pacjent zawiera umowę z pełną świadomością ryzyk",
                            "Pobierania fotografii, nagrań czy ujawniania danych o Usługodawcy bez pisemnej zgody",
                            "Przebywania w komorze pod wpływem alkoholu czy narkotyków",
                            "Prawomocnego zmieniania umowy jednostronnie – wszelkie zmiany mogą nastąpić wyłącznie za pisemną zgodą obu stron"
                        ]
                    }
                ]
            },
            {
                type: "section",
                number: "11",
                title: "OCHRONA DANYCH OSOBOWYCH",
                content: [
                    {
                        type: "paragraph",
                        text: "11.1. Usługodawca przetwarza dane osobowe Pacjenta wyłącznie w celu świadczenia usług i zgodnie z RODO."
                    },
                    {
                        type: "paragraph",
                        text: "11.2. Dane pacjenta, w tym informacje zdrowotne, przechowywane są przez okres 10 lat i mogą być udostępniane organom ścigania, sądom i instytucjom publicznym na życzenie."
                    },
                    {
                        type: "paragraph",
                        text: "11.3. Pacjent wyraża pisemnie zgodę na przetwarzanie jego danych zdrowotnych i biometrycznych (w tym zdjęć z kamer nadzoru) w celach bezpieczeństwa i dokumentacji medycznej."
                    }
                ]
            },
            {
                type: "section",
                number: "12",
                title: "DOCHODZENIE ROSZCZEŃ I PROCEDURY PRAWNE",
                content: [
                    {
                        type: "paragraph",
                        text: "12.1. Wszelkie roszczenia wobec Usługodawcy muszą być zgłoszone na piśmie w ciągu 30 dni od zdarzenia, na które roszczenie się powołuje – roszczenia zgłoszone po tym terminie ulegają przedawnieniu."
                    },
                    {
                        type: "paragraph",
                        text: "12.2. Pacjent zobowiązany jest najpierw do poddania się mediacji w siedzibie Usługodawcy, zanim wytoczy sprawę sądową."
                    },
                    {
                        type: "paragraph",
                        text: "12.3. W przypadku procesu sądowego wygranego przez Usługodawcę, Pacjent zobowiązany jest do pokrycia kosztów procesu, w tym honorarium prawnika Usługodawcy."
                    },
                    {
                        type: "paragraph",
                        text: "12.4. Umowa podlega prawu polskiemu. Wszelkie spory rozstrzygane są przez sądy polskie, w szczególności przez sąd właściwy ze względu na miejsce siedziby Usługodawcy."
                    }
                ]
            },
            {
                type: "section",
                number: "13",
                title: "UBEZPIECZENIE I BEZPIECZEŃSTWO",
                content: [
                    {
                        type: "paragraph",
                        text: "13.1. Usługodawca posiada obowiązkowe ubezpieczenie OC i dobrowolne ubezpieczenie od wypadków medycznych."
                    },
                    {
                        type: "paragraph",
                        text: "13.2. Kopię polisy ubezpieczeniowej Pacjent może uzyskać na życzenie."
                    }
                ]
            },
            {
                type: "section",
                number: "14",
                title: "POSTANOWIENIA KOŃCOWE",
                content: [
                    {
                        type: "paragraph",
                        text: "14.1. Każdy pacjent otrzymuje kopię niniejszego regulaminu oraz karty pacjenta do wypełnienia."
                    },
                    {
                        type: "paragraph",
                        text: "14.2. Wszelkie zmiany w regulaminie będą komunikowane z co najmniej 30-dniowym wyprzedzeniem i publikowane na stronie Usługodawcy."
                    },
                    {
                        type: "paragraph",
                        text: "14.3. Kontynuacja korzystania z usług po zmianach regulaminu stanowi AKTYWNĄ akceptację nowych warunków – Pacjent zobowiązany jest do podpisania potwierdzenia akceptacji nowych warunków."
                    },
                    {
                        type: "paragraph",
                        text: "14.4. W sprawach nieuregulowanych w niniejszym regulaminie obowiązuje prawo polskie, przepisy GDPR, ustawa o prawach pacjenta, ustawa o działalności leczniczej oraz kodeks cywilny."
                    },
                    {
                        type: "paragraph",
                        text: "14.5. Jeśli jakiekolwiek postanowienie regulaminu zostanie uznane za nieskuteczne przez sąd, pozostałe postanowienia pozostają w pełni obowiązujące."
                    },
                    {
                        type: "paragraph",
                        text: "14.6. Pacjent wyraża pisemnie zgodę na to, że regulamin stanowi integralną część umowy o świadczenie usług, a jego przyjęcie jest warunkiem bezwzględnym korzystania z usług Usługodawcy."
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
        doc.setFont("Lato-Regular", "normal");
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.setCharSpace(0); // Reset letter-spacing dla spójności
        
        const centerX = this.#pageSize.width / 2;
        const lineSpacing = 6;
        
        // Linia 1: REGULAMIN KORZYSTANIA
        doc.text("REGULAMIN KORZYSTANIA", centerX, headerY, { align: 'center' });
        doc.text("Z", centerX, headerY + lineSpacing, { align: 'center' });
        doc.text("KOMORY HIPERBARYCZNEJ", centerX, headerY + (lineSpacing * 2), { align: 'center' });
        
        // Data - po prawej stronie
        const dateY = headerY + (lineSpacing * 2);
        doc.setFont("Lato-Regular", "normal");
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        
        const dateWidth = doc.getTextWidth(currentDate);
        const dateX = this.#pageSize.width - this.#margins.right - dateWidth;
        
        doc.text(currentDate, dateX, dateY);
        
        // Linia pod nagłówkiem
        const lineY = dateY + 7;
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
            fontFamily: "Lato-Regular",
            fontWeight: "normal",
            fontSize: 10,
            textColor: { r: 50, g: 50, b: 50 },
            lineHeightMultiplier: 0.4, // Wspólny mnożnik dla paragraph i list
            charSpace: 0,
        };
        
        // Konfiguracja layoutu
        const layout = {
            headerLineY: banner.contentStartY + 25,
            paddingAboveLine: 10,
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
            if (currentY + neededSpace > this.#pageSize.height - this.#margins.bottom) {
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
            
            // Header zajmuje 80% szerokości strony, wyśrodkowany z 10% marginesem po obu stronach
            const headerWidthPercent = 0.8;
            const headerWidth = this.#pageSize.width * headerWidthPercent;
            const headerLeftMargin = this.#pageSize.width * 0.1; // 10% margines z lewej
            
            const headerText = `${number}. ${title}`;
            const headerLines = doc.splitTextToSize(headerText, headerWidth);
            
            headerLines.forEach((line) => {
                doc.text(line, headerLeftMargin, currentY);
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
            
            // Paragraph zajmuje 80% szerokości strony, wyśrodkowany z 10% marginesem po obu stronach
            const paragraphWidthPercent = 0.8;
            const paragraphWidth = this.#pageSize.width * paragraphWidthPercent;
            const paragraphLeftMargin = this.#pageSize.width * 0.1; // 10% margines z lewej
            
            const lines = doc.splitTextToSize(text, paragraphWidth);
            const lineHeight = getLineHeight();
            
            lines.forEach((line) => {
                checkPageBreak(lineHeight);
                doc.text(line, paragraphLeftMargin, currentY);
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
        doc.setFont("Lato-Regular", "normal");
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

