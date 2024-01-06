const { createApp, ref} = Vue;

createApp({
    setup() {
        const message = ref('登出');
        return {
            message
        }
    }
}).mount('#app');