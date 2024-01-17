const { createApp, ref } = Vue;
const apiUrl = 'https://ec-course-api.hexschool.io/v2/admin/signin';

createApp({
    setup() {
        const loginData = ref({
            username: '',
            password: '',
        });
        const loginSubmit = async () => {
            try{
                const res = await axios.post(apiUrl,loginData.value);
                alert('登入成功!');
                const token = res.data.token;
                document.cookie = `listToken=${token};  max-age=1200`;
                setTimeout(() => {
                    window.location.href= '../products.html';
                }, 2000);
            }catch(error){
                alert('登入失敗');
            }
            loginData.value={
                username: '',
                password: '',
            }
        }
        return {
            loginData,
            loginSubmit
        }
    }
}).mount('#app');