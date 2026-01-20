<template>
    <Transition name="chatDialogTransition">
        <div v-if="modelValue" class="TlenovoChatbot">
            <!-- Header -->
            <div class="TlenovoChatbot__header">
                <div class="TlenovoChatbot__headerTitle">
                    <q-icon name="smart_toy" size="sm" />
                    <span>Asystent Tlenovo</span>
                </div>
                <q-btn flat round dense icon="close" color="white" @click="onCloseHandler" />
            </div>

            <!-- Messages Area -->
            <div ref="messagesContainer" class="TlenovoChatbot__messages">
                <!-- Welcome message -->
                <div v-if="messages.length === 0" class="TlenovoChatbot__welcome">
                    <q-icon name="waving_hand" size="lg" color="white" />
                    <p>Cześć! Jestem asystentem Tlenovo. Jak mogę Ci pomóc?</p>
                </div>

                <!-- Chat messages -->
                <div v-for="(msg, index) in messages" :key="index" :class="{
                    'TlenovoChatbot__message': true,
                    'TlenovoChatbot__message--user': msg.role === 'user',
                    'TlenovoChatbot__message--bot': msg.role === 'bot'
                }">
                    <div class="TlenovoChatbot__messageContent">
                        {{ msg.text }}
                    </div>
                </div>

                <!-- Loading indicator -->
                <div v-if="isLoading" class="TlenovoChatbot__loading">
                    <q-spinner-dots color="white" size="40px" />
                </div>
            </div>

            <!-- Input Area -->
            <div class="TlenovoChatbot__input">
                <q-input v-model="inputMessage" outlined dense dark placeholder="Napisz wiadomość..."
                    class="TlenovoChatbot__inputField" @keyup.enter="onSendMessage" :disable="isLoading">
                    <template v-slot:append>
                        <q-btn flat round dense icon="send" color="white" :disable="!inputMessage.trim() || isLoading"
                            @click="onSendMessage" />
                    </template>
                </q-input>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import { chatbotService } from 'src/services/chatbot.service.js'
import { nextTick, ref, watch } from 'vue'

defineProps({
    modelValue: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:modelValue'])

const inputMessage = ref('')
const messages = ref([])
const isLoading = ref(false)
const messagesContainer = ref(null)

// Scroll to bottom when new message arrives
watch(() => messages.value.length, async () => {
    await nextTick()
    scrollToBottom()
})

function scrollToBottom() {
    if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
}

function onCloseHandler() {
    emit('update:modelValue', false)
}

async function onSendMessage() {
    const message = inputMessage.value.trim()
    if (!message || isLoading.value) return

    // Add user message
    messages.value.push({
        role: 'user',
        text: message
    })

    inputMessage.value = ''
    isLoading.value = true

    // Prepare history for API (convert to API format)
    const history = messages.value.slice(0, -1).map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
    }))

    // Send to API
    const response = await chatbotService.sendMessage(message, history)

    isLoading.value = false

    if (response.success) {
        messages.value.push({
            role: 'bot',
            text: response.answer
        })
    } else {
        messages.value.push({
            role: 'bot',
            text: 'Przepraszam, wystąpił problem z połączeniem. Spróbuj ponownie później lub skontaktuj się z nami telefonicznie.'
        })
    }
}
</script>

<style lang="scss" scoped>
@import 'src/css/quasar.variables.scss';

.TlenovoChatbot {
    position: fixed;
    bottom: 110px;
    right: 30px;
    z-index: 999;

    display: flex;
    flex-direction: column;

    width: 350px;
    height: 450px;
    max-height: calc(100vh - 150px);

    background: linear-gradient(160deg, rgba($primary, 0.98) 0%, rgba(darken($primary, 15%), 0.98) 100%);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba($white, 0.1);
    border: 1px solid rgba($white, 0.1);

    overflow: hidden;

    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        padding: 16px 12px 16px 20px;

        background: rgba($white, 0.05);
        border-bottom: 1px solid rgba($white, 0.1);
    }

    &__headerTitle {
        display: flex;
        align-items: center;
        gap: 10px;

        color: $white;
        font-size: 16px;
        font-weight: 600;
    }

    &__messages {
        flex: 1;

        display: flex;
        flex-direction: column;
        gap: 12px;

        padding: 20px 16px;

        overflow-y: auto;
        overflow-x: hidden;

        &::-webkit-scrollbar {
            width: 6px;
        }

        &::-webkit-scrollbar-track {
            background: transparent;
        }

        &::-webkit-scrollbar-thumb {
            background: rgba($white, 0.2);
            border-radius: 3px;
        }
    }

    &__welcome {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;

        height: 100%;

        text-align: center;
        color: rgba($white, 0.8);

        p {
            margin: 0;
            font-size: 14px;
            line-height: 1.5;
        }
    }

    &__message {
        display: flex;
        max-width: 85%;

        animation: messageSlide 0.3s ease;

        &--user {
            align-self: flex-end;

            .TlenovoChatbot__messageContent {
                background: $secondary;
                color: $primary;
                border-radius: 18px 18px 4px 18px;
            }
        }

        &--bot {
            align-self: flex-start;

            .TlenovoChatbot__messageContent {
                background: rgba($white, 0.1);
                color: $white;
                border-radius: 18px 18px 18px 4px;
            }
        }
    }

    &__messageContent {
        padding: 12px 16px;

        font-size: 14px;
        line-height: 1.4;
        word-wrap: break-word;
    }

    &__loading {
        display: flex;
        align-self: flex-start;
        padding: 8px 16px;
    }

    &__input {
        padding: 12px 16px 16px;

        background: rgba($white, 0.05);
        border-top: 1px solid rgba($white, 0.1);
    }

    &__inputField {
        :deep(.q-field__control) {
            background: rgba($white, 0.1);
            border-radius: 24px;
        }

        :deep(.q-field__native) {
            color: $white;

            &::placeholder {
                color: rgba($white, 0.5);
            }
        }

        :deep(.q-field--outlined .q-field__control:before) {
            border-color: rgba($white, 0.2);
        }

        :deep(.q-field--outlined.q-field--focused .q-field__control:after) {
            border-color: $white;
        }
    }
}

// Animacja wejścia/wyjścia dialogu
.chatDialogTransition {
    z-index: 999;

    &-enter-active,
    &-leave-active {
        transition: all 0.3s ease;
    }

    &-enter-from {
        opacity: 0;
        transform: translateY(20px) scale(0.95);
    }

    &-leave-to {
        opacity: 0;
        transform: translateY(20px) scale(0.95);
    }

    &-enter-to,
    &-leave-from {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

// Animacja wiadomości
@keyframes messageSlide {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

// Responsywność dla mniejszych ekranów
@media (max-width: 400px) {
    .TlenovoChatbot {
        width: calc(100vw - 20px);
        right: 10px;
        bottom: 26px;
        height: calc(100vh - 130px);
        max-height: none;
    }
}
</style>
