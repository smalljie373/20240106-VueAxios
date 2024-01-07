import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import Swal from 'sweetalert2';
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
                Swal.fire({
                    title: '登入成功',
                    text: '3秒後將自動轉到產品列表頁面',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 3000
                });
                setTimeout(() => {
                    console.log(res);
                },3000)
            }catch(error){
                console.log(error);
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