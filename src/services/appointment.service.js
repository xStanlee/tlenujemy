
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";

// Need to be hidden
const firebaseConfig = {
    apiKey: "AIzaSyBjCo9o1CSXzyoVhUYuvmItyFL4mxlmAu8",
    authDomain: "tlenovo-424e1.firebaseapp.com",
    projectId: "tlenovo-424e1",
    storageBucket: "tlenovo-424e1.firebasestorage.app",
    messagingSenderId: "650352288871",
    appId: "1:650352288871:web:9ae575e918a0805a9d20c2"
};

class AppointmentService {
    #appointmentBase;
    #dataStore;
    isProcessing = false;
    isInitialized = false;
   

    constructor() {
        try {
            this.#appointmentBase = initializeApp(firebaseConfig);   
            this.#dataStore = getFirestore(this.#appointmentBase);

            this.isInitialized = true;
        } catch (err) {
            this.isInitialized = false;
            console.error("Błąd podczas inicjalizacji AppointmentService:", err);
        }
    }

    async addAppointment(appointment) {
        this.isProcessing = true;

        try {
            if (!this.isInitialized) {
                throw new Error("AppointmentService is not initialized.");
            }

            await addDoc(collection(this.#dataStore, "appointments"), {
                name: appointment.name,
                phone: appointment.phone,
                date: appointment.date,
                time: appointment.time,                
            });
        } catch (err) {
            console.error("Błąd podczas dodawania wizyty:", err);
        } finally {
            this.isProcessing = false;
        }
    }
}

export const appointmentService = new AppointmentService();
