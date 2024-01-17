const { createApp, onMounted, ref} = Vue;
const apiUrl = 'https://ec-course-api.hexschool.io/';
const apiPath = 'smalljie-hexschool';
createApp({
    setup() {
        const token = ref('');
        const products = ref([]);
        const product = ref([]);
        const getProducts = async () => {
            try{
                const res = await axios.get(`${apiUrl}v2/api/${apiPath}/admin/products/all`);
                products.value = Object.values(res.data.products);
            }catch(error){
                console.log(error);
            }
        }
        const checkToken = async () => {
            try{
                const res = await axios.post(`${apiUrl}v2/api/user/check`);
                if(res.data.success){
                    getProducts();
                }else{
                    alert('驗證錯誤');
                    setTimeout(() => {
                        window.location.href= './index.html';
                    }, 2000);
                }
            }catch(error){
                alert('驗證錯誤');
                setTimeout(() => {
                    window.location.href= './index.html';
                }, 2000);
            }
        }
        const renderProduct = (item) => {
            product.value = {...item};
        };
        const logout = async () => {
            try{
                const res = await axios.post(`${apiUrl}/v2/logout`);
                alert(res.data.message);
                setTimeout(() => {
                    document.cookie = 'listToken=;  max-age=0';
                    window.location.href= './index.html';
                },500);
            }catch(error){
                console.log(error);
            }
        }
        
        onMounted(() => {
            token.value= document.cookie.replace(/(?:(?:^|.*;\s*)listToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
            axios.defaults.headers.common.Authorization = token.value;
            checkToken();
        })
        return{
            products,
            product,
            renderProduct,
            logout
        }
    }
}).mount('#app');